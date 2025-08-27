from rest_framework import serializers


class DescribeTaskRequestSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255)


class DescribeTaskResponseSerializer(serializers.Serializer):
    description = serializers.CharField()


class TaskItemSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255)
    description = serializers.CharField(required=False, allow_blank=True)


class PrioritizeTasksRequestSerializer(serializers.Serializer):
    tasks = TaskItemSerializer(many=True)


class PrioritizedTaskSerializer(serializers.Serializer):
    title = serializers.CharField()
    description = serializers.CharField(allow_blank=True)
    priority = serializers.ChoiceField(choices=["high", "medium", "low"])


class PrioritizeTasksResponseSerializer(serializers.Serializer):
    tasks = PrioritizedTaskSerializer(many=True)


