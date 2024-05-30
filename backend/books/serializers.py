from django.db.models import Avg
from rest_framework import serializers
from .models import Book, Chapter, Comment, Rating


class BookSerializer(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = "__all__"

    def get_average_rating(self,book) :
        return Rating.objects.filter(book=book).aggregate(Avg('rating'))['rating__avg']
    

class BookLikeSerializer(BookSerializer):
    total_likes = serializers.IntegerField(read_only=True)

class RatingSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Rating
        fields = '__all__'
        read_only_fields = ("book", "user_id")

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields='__all__'
        read_only_fields = ("book", "user_id")

        def to_representation(self, instance):
            ret = super().to_representation(instance)
            ret.pop("article")
            return ret


class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = "__all__"
