"""
MODELS
"""
from django.db import models
from users.models import Users

STATUS_CHOICES = {
    ('pending', 'Pending'),
    ('completed', 'Completed')
}

PRIORITY_CHOICES = {
    ('high', "High Priority"),
    ('medium', "Medium Priority"),
    ('low', "Low Priority")
}


class UserTask(models.Model):
    """_summary_

    Args:
        models (_type_): _description_
    """
    user = models.ForeignKey(Users, null=True, blank=True,
                             on_delete=models.CASCADE)
    task = models.TextField(null=True, blank=True)
    task_description = models.TextField(null=True, blank=True)
    status = models.CharField(choices=STATUS_CHOICES, default='pending',
                              null=True, blank=True)
    priority = models.CharField(choices=PRIORITY_CHOICES, blank=True,
                                null=True)
    is_deleted = models.BooleanField(null=True, blank=True)

    def __str__(self):
        return f"{self.task}"

    class Meta:
        """_summary_
        """
        db_table = "userstask"
        verbose_name = "UserTask"
        verbose_name_plural = "UserTasks"
