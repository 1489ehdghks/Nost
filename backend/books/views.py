from django.shortcuts import get_object_or_404, render
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Book, Comment
from .serializers import (
    BookSerializer,
    BookLikeSerializer,
    CommentSerializer,
    ChapterSerializer,
)
from django.core import serializers
from .generators import synopsis_generator, summary_generator


class BookListAPIView(ListAPIView):
    # 전체 목록 조회
    queryset = Book.objects.all().order_by("-created_at")
    serializer_class = BookSerializer

    # 새 소설 책 생성
    def post(self, request):
        user_prompt = request.data.get("prompt")
        if not user_prompt:
            return Response(
                {"error": "Missing prompt"}, status=status.HTTP_400_BAD_REQUEST
            )

        content = synopsis_generator(user_prompt)  # ai로 title, synopsis 생성
        title = content["title"]
        synopsis = content["synopsis"]
        serializer = BookSerializer(
            data={"title": title, "user_id": request.user.pk}
        )  # db에 title, user_id 저장
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(
                data={'book_id':serializer.data['id'],"content": synopsis},  # FE에 content 응답
                status=status.HTTP_201_CREATED,
            )


class BookDetailAPIView(APIView):
    # 상세 조회
    def get(self, request, book_id):
        book = get_object_or_404(Book, id=book_id)
        serializer = BookSerializer(book)
        return Response(serializer, status=200)
    
    # chapter(summary) 생성
    def post(self, request, book_id):
        summary = request.data.get("summary")
        if not summary:
            return Response(
                {"error": "Missing summary prompt"}, status=status.HTTP_400_BAD_REQUEST
            )
        result = summary_generator(summary)
        book=get_object_or_404(Book, id=book_id)
        serializer = ChapterSerializer(
            data={"content": result["final_summary"], "book_id": book.pk}
        )
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            result['book_id']=book.pk
            return Response(data=result, status=status.HTTP_201_CREATED)

    # 글 수정
    def put(self, request, book_id):
        book = get_object_or_404(Book, id=book_id)
        serializer = BookSerializer(book, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(status=401)

    # 글 삭제
    def delete(self, request, book_id):
        book = get_object_or_404(Book, id=book_id)
        book.delete()
        return Response("No Content", status=204)


class BookLikeAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, book_id):
        book = get_object_or_404(Book, id=book_id)
        # 좋아요 삭제
        if request.user in book.is_liked.all():
            book.is_liked.remove(request.user)
            like_bool = False
        # 좋아요 추가
        else:
            book.is_liked.add(request.user)
            like_bool = True
        serializer = BookLikeSerializer(book)
        return Response(
            {
                "like_bool": like_bool,
                "total_likes": book.total_likes(),
                "book": serializer.data,
            },
            status=200,
        )


class CommentListAPIView(APIView):
    def get(self, request, book_id):
        book = get_object_or_404(Book, id=book_id)
        comments = book.comments.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    def post(self, request, book_id):
        book = get_object_or_404(Book, id=book_id)
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user_id=request.user, book=book)
            return Response(serializer.data, status=201)


class CommentDetailAPIView(APIView):
    def put(self, request, book_id, comment_id):
        comment = get_object_or_404(Comment, id=comment_id)
        serializer = CommentSerializer(comment, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

    def delete(self, request, comment_id):
        comment = get_object_or_404(Comment, id=comment_id)
        comment.delete()
        return Response("NO comment", status=204)