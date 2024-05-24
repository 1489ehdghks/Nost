from django.conf import settings
from django.db import models


class Book(models.Model):
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # Foriegn Key
    user_id = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="books"
    )
    is_liked = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="book_likes", null=True
    )


class Comment(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="comments")
    content = models.TextField()
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Chapter(models.Model):
    chapter_num = models.PositiveIntegerField(editable=False)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    book_id = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="chapters")

    def save(self, *args, **kwargs):
        if not self.id:
            last_index = (
                Chapter.objects.filter(book_id=self.book_id).order_by("index").last()
            )
            if last_index:
                self.chapter_num = last_index.chapter_num + 1
            else:
                self.chapter_num = 1
        super(Chapter, self).save(*args, **kwargs)
