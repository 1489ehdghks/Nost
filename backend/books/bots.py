from openai import OpenAI
from django.conf import settings

CLIENT = OpenAI(
    api_key = settings.OPENAI_API_KEY
)

def create_novel(message) :
    system_instructions = """
        이제부터 너는 "소설가"야.
        제목과 소설 장르에 맞게 소설을 한 파트 작성해줘.
        내용이 추가될 수 있도록 끝부분을 완벽하게 마무리짓지는 말아줘.
    """

    completion = CLIENT.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
    {
        "role": "system",
        "content": system_instructions,
        },
    {
        "role": "user", 
        "content": user_message,
        }
    ]
    )
    chatgpt_response = completion.choices[0].message.content