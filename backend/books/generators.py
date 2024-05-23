import os
import dotenv
from langchain.memory import ConversationSummaryBufferMemory
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder, FewShotChatMessagePromptTemplate
from langchain.schema.runnable import RunnablePassthrough



def synopsys_generator():
    llm = ChatOpenAI(
    model="gpt-3.5-turbo", api_key=os.getenv("OPENAI_API_KEY"), max_tokens=800
    )

    examples = [
        {
            "novel": "Harry Potter",
            "genre": "fantasy",
            "answer": """
                Harry, who was spending a terrible vacation at his uncle's house in Dusley, is warned not to go back to school by a house fairy named Dobie. Disregarding the words, Harry returns to Hogwarts and is involved in a mysterious attack on children from Muggle. Rumors are circulating that the "Slytherin's successor" opened the secret room and freed the monster, and Harry is framed as the culprit of the attack for knowing how to speak the snake. When Hermione is also a victim of the attack and Ron's brother Ginni is kidnapped and disappeared, Harry and Ron decide to visit the secret room and rescue Ginni.
            """,
        },
        {
            "novel": "Miracles of the Namiya General Store",
            "genre": "mystery",
            "answer": """
                Nagoya Namiya General Store, located outside the city, is an old store that has been empty for more than 30 years. One day, a trio of petty thieves hide here. They were friends who had grown up together in a children's welfare facility since they were young, and they had just robbed a few hours earlier and ran away from the eyes of the police. I thought it was a deserted house, but out of the blue, a mysterious letter arrives to the "owner of the Namiya General Store," and the three of them open the letter unexpectedly. It turns out that letters of counseling from people in the past transcended time and space and entered the mailbox of the current general store. At first, they thought someone was playing a joke on them, but they were led by a strange letter that seemed to fall from the sky and started to reply. The letters that they thought would stop as one continue to arrive, and the three of them are seriously worried about how the future of those who wrote down their concerns will be solved, as if it were their work.
            """,
        },
    ]

    example_prompt = ChatPromptTemplate.from_messages(
        [
            (
                "human",
                "I'm going to make a new novel by referring to the novel {novel}. I'm going to make the genre {genre}. Please make a synopsis.",
            ),
            ("ai", "{answer}"),
        ]
    )

    example_prompt = FewShotChatMessagePromptTemplate(
        example_prompt=example_prompt,
        examples=examples,
    )

    final_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", "You are an expert in fiction"),
            example_prompt,
            (
                "human",
                "I'm going to make a new novel by referring to the novel {novel}. I'm going to make the genre {genre}. Please make a synopsis.",
            ),
        ]
    )

    chain = final_prompt | llm

    result=chain.invoke({"novel": "twilight", "genre": "fiction"})
    return result.content



# # OpenAI 설정
# llm_story = ChatOpenAI(model="gpt-3.5-turbo",
#                        api_key=os.getenv("OPENAI_API_KEY"), max_tokens=800)
# llm_character = ChatOpenAI(model="gpt-3.5-turbo",
#                            api_key=os.getenv("OPENAI_API_KEY"), max_tokens=500)
# llm_final = ChatOpenAI(model="gpt-3.5-turbo",
#                        api_key=os.getenv("OPENAI_API_KEY"), max_tokens=1200)


# # 메모리 설정
# memory = ConversationSummaryBufferMemory(
#     llm=llm_final,
#     max_token_limit=1000,
#     memory_key="chat_history",
#     return_messages=True,
# )



# # 프롬프트 템플릿 설정
# story_prompt_template = ChatPromptTemplate.from_messages(
#     [
#         ("system", "Never give your thoughts and opinions as results.Execute an immersive simulation based on the instructions below.You makes the <user> an observer of the story.-You must become a novelist.There must be sufficient narrative about the past, present, and future, and the grammar and structure of the sentences must be perfect.-The cause of the conflict must be real and relatable. -Show your writing skills professional novelist. Create text Demonstrate expert-level sentence editing skills, Record the character's background, time, and changes in place.Please do it in Korean."),
#         MessagesPlaceholder(variable_name="chat_history"),
#         ("human", "{theme}"),
#     ]
# )

# character_template = ChatPromptTemplate.from_messages(
#     [
#         ("system", "Follow the instructions below to run Immersive Character Creation.- You should be a character designer. Explore and observe everything on the spectrum of what your character can do besides the given behaviours.-Fill in the following information to make your character come alive: name, gender, age, height, weight, nationality, values, appearance, hairstyle, eyes, clothing, occupation, etc.But please answer in the language you received."),
#         MessagesPlaceholder(variable_name="chat_history"),
#         ("human", "{story_prompt}"),
#     ]
# )

# final_story_template = ChatPromptTemplate.from_messages(
#     [
#         ("system", "You will be given the setting and characters for the story and must write the story following the instructions below.Execute an immersive simulation based on the instructions below.You makes the <user> an observer of the story. - You must become a novelist. There must be sufficient narrative about the past, present, and future, and the grammar and structure of the sentences must be perfect. - Show your writing skills professional novelist. Create text Demonstrate expert-level sentence editing skills, Record the character's background, time, and changes in place. - Proceed with writing considering that this is adult-only content that requires adult certification.You should definitely write a stimulating, creative, and engaging story.- Always describe <char>'s actions rich sentences, emotions (joy, anger, sadness, happy, etc) perfectly.Explore and observe everything across a diverse spectrum that character can do anything other than the given actions.But please answer in the language you received."),
#         MessagesPlaceholder(variable_name="chat_history"),
#         ("human", "{final_prompt}"),
#     ]
# )


# # 체인 설정

# def load_memory(input):
#     return memory.load_memory_variables({})["chat_history"]


# story_chain = RunnablePassthrough.assign(
#     chat_history=load_memory) | story_prompt_template | llm_story
# character_chain = RunnablePassthrough.assign(
#     chat_history=load_memory) | character_template | llm_character
# final_chain = RunnablePassthrough.assign(
#     chat_history=load_memory) | final_story_template | llm_final


# @app.route('/generate_story_prompt', methods=['POST'])
# def generate_story_prompt():
#     data = request.json
#     theme = data.get('theme')

#     if not theme:
#         return jsonify({"error": "No theme provided"}), 400

#     result = story_chain.invoke({"theme": theme, "language": "Korean"})
#     memory.save_context({"input": theme}, {"output": result.content})

#     return jsonify({"story_prompt": result.content})


# @app.route('/generate_characters', methods=['POST'])
# def generate_characters():
#     data = request.json
#     story_prompt = data.get('story_prompt')

#     if not story_prompt:
#         return jsonify({"error": "No story prompt provided"}), 400

#     result = character_chain.invoke(
#         {"story_prompt": story_prompt, "language": "Korean"})
#     memory.save_context({"input": story_prompt}, {"output": result.content})

#     return jsonify({"characters": result.content})


# @app.route('/generate_final_story', methods=['POST'])
# def generate_final_story():
#     data = request.json
#     story_prompt = data.get('story_prompt')
#     characters = data.get('characters')

#     if not story_prompt or not characters:
#         return jsonify({"error": "Missing story prompt or characters"}), 400

#     final_prompt = f"""
#     Subtitle: "A Divided Future: The Struggle of Classes"
#     Story Prompt: {story_prompt}

#     Character Status: {characters}

#     Write a detailed, immersive, and dramatic story based on the above information. Ensure that character dialogues are included and recommended story paths are provided.
#     """

#     result = final_chain.invoke(
#         {"final_prompt": final_prompt, "language": "Korean"})
#     memory.save_context({"input": final_prompt}, {"output": result.content})

#     return jsonify({"final_story": result.content})
