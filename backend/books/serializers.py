from rest_framework import serializers
from .models import Book, Chapter


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = "__all__"

class BookLikeSerializer(BookSerializer) :
    total_likes = serializers.IntegerField(read_only = True)

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = "__all__"
        read_only_fields = ("book", "user_id")

        def to_representation(self, instance):
            ret = super().to_representation(instance)
            ret.pop("article")
            return ret


class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = "__all__"
