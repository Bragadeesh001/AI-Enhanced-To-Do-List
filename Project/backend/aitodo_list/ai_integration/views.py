from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ViewSet
from rest_framework.decorators import action
from django.conf import settings
import os

from .serializers import (
    DescribeTaskRequestSerializer,
    DescribeTaskResponseSerializer,
    PrioritizeTasksRequestSerializer,
    PrioritizeTasksResponseSerializer,
)


def _get_openai_client():
    try:
        from openai import OpenAI  # type: ignore
    except Exception as exc:  # pragma: no cover
        raise RuntimeError("OpenAI SDK not installed. Run 'pip install openai'.") from exc

    api_key = os.getenv("OPENAI_API_KEY") or getattr(settings, "OPENAI_API_KEY", None)
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY not configured in environment.")
    base_url = os.getenv("OPENAI_BASE_URL") or getattr(settings, "OPENAI_BASE_URL", None)
    if base_url:
        return OpenAI(api_key=api_key, base_url=base_url)
    return OpenAI(api_key=api_key)


class AiIntegrationViewSet(ViewSet):
    @action(detail=False, methods=['post'], url_path='describe')
    def describe(self, request):
        serializer = DescribeTaskRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        title = serializer.validated_data["title"].strip()

        client = _get_openai_client()
        prompt = (
            "You are an expert productivity assistant. Your job is to expand very short task titles "
            "into clear, concrete, one-sentence descriptions that help users take action immediately.\n\n"
            "Instructions:\n"
            "- Output exactly ONE sentence (<= 25 words).\n"
            "- Be specific and practical (what to do, examples, scope).\n"
            "- Include 3–5 concrete examples where relevant.\n"
            "- No lists, no quotes, no emojis, no extra commentary.\n"
            "- Assume a single-person workflow.\n\n"
            "Good examples:\n"
            "- Buy groceries → Get essentials like milk, bread, eggs, and fresh vegetables from the nearest store today.\n"
            "- Prepare weekly report → Summarize KPIs, add highlights/risks, and email PDF to the team by 5 PM Friday.\n\n"
            f"Task title: {title}\n"
            "Description:"
        )

        model_name = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
        completion = client.chat.completions.create(
            model=model_name,
            messages=[
                {"role": "system", "content": "You generate concise, actionable, single-sentence task descriptions."},
                {"role": "user", "content": prompt},
            ],
            temperature=0.3,
            max_tokens=80,
            presence_penalty=0,
            frequency_penalty=0,
        )
        description = completion.choices[0].message.content.strip()

        return Response({"description": description}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], url_path='prioritize')
    def prioritize(self, request):
        serializer = PrioritizeTasksRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        tasks = serializer.validated_data["tasks"]

        client = _get_openai_client()

        lines = [f"- title: {t['title']}\n  description: {t.get('description', '')}" for t in tasks]
        prompt = (
            "You are an expert task triage assistant. Prioritize each task as high, medium, or low using this rubric:\n"
            "- High: Urgent (deadlines soon), high impact, blockers for other work, safety/finance-critical.\n"
            "- Medium: Important but not urgent, moderate impact, due within a week.\n"
            "- Low: Nice-to-have, unclear value, no deadline, can be deferred.\n\n"
            "Tie-breakers: prefer deadlines, dependencies, and multi-step tasks for higher priority.\n"
            "Assumptions: If no description, infer typical urgency from the title.\n\n"
            "Return STRICT JSON with schema: {\"tasks\":[{\"title\":string,\"description\":string,\"priority\":\"high|medium|low\"}]}\n"
            "Do not include any prose outside JSON.\n\n"
            "Tasks:\n" + "\n".join(lines)
        )

        model_name = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
        completion = client.chat.completions.create(
            model=model_name,
            messages=[
                {"role": "system", "content": "Return ONLY valid minified JSON matching the requested schema."},
                {"role": "user", "content": prompt},
            ],
            temperature=0.1,
            max_tokens=500,
            presence_penalty=0,
            frequency_penalty=0,
        )
        content = completion.choices[0].message.content

        import json
        try:
            data = json.loads(content)
        except Exception:
            import re
            match = re.search(r"\[.*\]", content, re.S)
            if not match:
                return Response({"detail": "Failed to parse AI response."}, status=500)
            data = json.loads(match.group(0))

        return Response({"tasks": data}, status=status.HTTP_200_OK)


