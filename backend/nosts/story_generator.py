import os
import openai
import requests


# -------------------------------------------------------
# Nost
# openai설정
openai.api_key=os.environ.get('OPENAI_KEY')

def generate_story_response(prompt):
    headers ={
        'Authorization': f'Bearer {os.environ.get("OPENAI_KEY")}',
        'Content-Type':'application/json',
    }
    
    data={
        'model':'gpt-3.5-turbo',
        'messages':[
            {'role':'system','content':'You are a helpful assistant.'},
            {'role':'user','content':prompt},
        ]
    }
    
    response=requests.post('https://api.openai.com/v1/chat/completions', headers=headers, json=data)
    return response.json()

# 응답생성
def suggest_story_response(prompt):
    suggestions = []
    for _ in range(3):
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": prompt},
                ],
            )
            for choice in response.choices:
                suggestions.append(choice.message['content'].strip())
        except Exception as e:
            print(f"Error generating suggestion: {str(e)}")
            suggestions.append("")
    return suggestions




# -----------------------------------------------
# openai 사용 예시
# client = OpenAI(api_key=os.environ.get("OPENAI_KEY"))


# def generate_story(words):
#     # Call the OpenAI API to generate the story
#     response = get_short_story(words)

#     # Format and return the response
#     return format_response(response)


# def get_short_story(words):
#     # Construct the system prompt
    # system_prompt = f"""You are a short story generator.
#     Write a short story using the following words: {words}.
#     Do not go beyond one paragraph."""
#     # Make the API call
#     response = client.chat.completions.create(
#         model="gpt-3.5-turbo",
#         messages=[{"role": "user", "content": system_prompt}],
#         temperature=0.8,
#         max_tokens=1000,
#     )

#     # Return the API response
#     return response


# def format_response(response):
#     # Extract the generated story from the response
#     story = response.choices[0].message.content

#     # Remove any unwanted text or formatting
#     story = story.strip()

#     # Return the formatted story
#     return story
