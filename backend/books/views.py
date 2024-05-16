from django.shortcuts import get_object_or_404, render
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from .models import Book, Comment
from .serializers import BookSerializer, CommentSerializer
from django.core import serializers

class BookListAPIView(ListAPIView) :
    # 전체 목록 조회
    queryset = Book.objects.all().order_by('-created_at')
    serializer_class = BookSerializer

    # 새 글 작성
    def post(self, request) :
        serializer = BookSerializer(data = request.data)
        if serializer.is_valid(raise_exception=True) :
            serializer.save()#user_id = request.user
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
class BookDetailAPIView(APIView) :
    # 상세 조회
    def get(self,request, book_id) :
        book = get_object_or_404(Book, id = book_id)
        serializer = BookSerializer(book)
        return Response(serializer, status= 200)
    # 글 수정
    def put(self, request, book_id) :
        book = get_object_or_404(Book, id = book_id)
        serializer = BookSerializer(book, data = request.data, partial = True)
        if serializer.is_valid(raise_exception=True) :
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(status=401)
    # 글 삭제
    def delete(self, request, book_id) :
        book = get_object_or_404(book, id = book_id)
        book.delete()
        return Response("No Content", status=204)

class BookLikeAPIView(APIView) :
    def post(self, request) :
        pass
        

class CommentListAPIView(APIView) :
    def get(self, request, book_id) :
        book = get_object_or_404(Book, id = book_id)
        comments = book.comments.all()
        serializer = CommentSerializer(comments, many = True)
        return Response(serializer.data)
    
    def post(self, request, book_id) :
        book = get_object_or_404(Book, id = book_id)
        serializer = CommentSerializer(data = request.data)
        if serializer.is_valid(raise_exception=True) :
            serializer.save()#user_id = request.user, book = book
            return Response(serializer.data, status=201)

class CommentDetailAPIView(APIView) :
    def put(self, request, comment_id) :
        comment = get_object_or_404(Comment, id = comment_id)
        serializer = CommentSerializer(
            comment, data = request.data, partial = True
        )
        if serializer.is_valid(raise_exception=True) :
            serializer.save()
            return Response(serializer.data)
            
    def delete(self, request, comment_id) :
        comment = get_object_or_404(Comment, id = comment_id) 
        comment.delete()
        return Response("NO comment", status=204)