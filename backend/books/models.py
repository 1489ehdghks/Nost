from django.conf import settings
from django.db import models

class Book(models.Model) :
    title = models.CharField(max_length=50)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # Foriegn Key
    user_id = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name="books"
        )
    is_liked = models.ManyToManyField(
        settings.AUTH_USER_MODEL, 
        related_name="book_likes", 
        null = True
        )
    
class Comment(models.Model) :
    book = models.ForeignKey(
        Book, on_delete=models.CASCADE, related_name= "comments")
    content = models.TextField()
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)