# from django.shortcuts import render
# from django.http import JsonResponse
import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests
import json
from .models import Story
from .story_generator import generate_story_response, suggest_story_response
from .serializers import StorySerializer

# Create your views here.


# --------------------------------------------------
# Nost
class GenerateStory(APIView):
    def get(self, request):
        all_story = Story.objects.all()
        serialzier = StorySerializer(
            all_story,
            many=True,
            context={"request": request},
        )
        return Response(serialzier.data)

    def post(self, request):
        # prompt = request.data.get("prompt")
        prompt = 'return a Story for little star. Provide your resonse as a Json object with the following schema: {"story" : ""}'

        openai_url = "https://api.openai.com/v1/chat/completions"
        openai_api_key = os.environ.get("OPENAI_KEY")
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {openai_api_key}",
        }
        data = {
            "model": "gpt-3.5-turbo",
            "messages": [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt},
            ],
        }
        response = requests.post(openai_url, json=data, headers=headers)

        if response.status_code == 200:
            generated_data = response.json()
            story_data = json.loads(generated_data["choices"][0]["message"]["content"])

            serializer = StorySerializer(
                data={"prompt": prompt, "story": story_data["story"]}
            )
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(
                {"error": "Failed to generate story from OpenAI"},
                status=response.status_code,
            )


# class GenerateStory(APIView):
#     def post(self, request):
#         data=request.data
#         user_prompt=data.get('prompt')

#         try:
#             response=generate_story_response(user_prompt)
#             story=response['choices'][0]['message']['content']
#             print(story)
#             return Response({'story':story})
#         except Exception as e:
#             return Response({'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SuggestStory(APIView):
    def post(self, request):
        data = request.data
        prompt = data.get("prompt")
        try:
            suggestions = suggest_story_response(prompt)
            return Response({"suggestions": suggestions})
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# ----------------------------------------------------
# openai 사용 예시
# def generate_story_from_words(request):
#     words=request.GET.get('words') # Extract the expected words from the request
#     story=generate_story(words) # Call the generate_story function with the extracted words
#     return JsonResponse({'story':story}) # Return the story as a JSON response
