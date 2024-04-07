from django.db import models

# Create your models here.
class Story(models.Model):
    prompt=models.CharField(max_length=255)
    story=models.TextField()
    


class Choice(models.Model):
    novel_id=models.ForeignKey(Story, on_delete=models.CASCADE, related_name='choices',)
    choice_text=models.TextField()