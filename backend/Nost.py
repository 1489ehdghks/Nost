from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
import requests
import openai
from dotenv import load_dotenv
import os
import traceback

load_dotenv()
app = Flask(__name__)


CORS(app)


# SQLite 데이터베이스 설정
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///nost.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


# 데이터베이스 모델 정의
class Story(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    prompt = db.Column(db.String(255), nullable=False)
    story = db.Column(db.Text, nullable=False)


# openai설정
def generate_story_response(prompt):
    headers = {
        'Authorization': f'Bearer {os.getenv("OPENAI_API_KEY")}',
        'Content-Type': 'application/json',
    }

    data = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt},
        ]
    }

    response = requests.post(
        'https://api.openai.com/v1/chat/completions', headers=headers, json=data)
    return response.json()


# 응답생성
def suggest_story_response(prompt):
    suggestions = []
    for _ in range(3):
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "system", "content": "You are a helpful assistant."},
                          {"role": "user", "content": prompt}],
            )
            for choice in response.choices:
                suggestions.append(choice.message['content'].strip())
        except Exception as e:
            print(f"Error generating suggestion: {str(e)}")
            suggestions.append("")
    return suggestions


@app.route('/')
def home():
    return "Welcome to Nost Project API!"


# 소설생성
@app.route('/create-story', methods=['POST'])
@cross_origin(supports_credentials=True, origins=['http://localhost:3000'])
def generate_story():
    data = request.get_json()
    user_prompt = data.get('prompt')

    try:
        response = generate_story_response(user_prompt)
        story = response['choices'][0]['message']['content']
        print(story)
        return jsonify({"story": story})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# 유저의 클린된 text 추천
@app.route('/suggest-story', methods=['POST'])
@cross_origin(supports_credentials=True, origins=['http://localhost:3000'])
def suggest_story():
    data = request.get_json()
    prompt = data.get('prompt')
    try:
        suggestions = suggest_story_response(prompt)
        return jsonify({"suggestions": suggestions})
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


# 이미지
@app.route('/generate-image', methods=['POST'])
def generate_image():
    data = request.get_json()
    prompt = data.get('prompt', '')

    # TODO : Stable Diffusion API를 호출하여 이미지 생성

    image_url = "generated_image_url_here"
    return jsonify({"imageUrl": image_url})


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
