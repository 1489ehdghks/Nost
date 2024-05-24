import os
import dotenv
import logging
import re
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

    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", "You are an expert in fiction"),
            example_prompt,
            (
                "human",
                "I'm going to make a new novel by referring to the novel {novel}. I'm going to make the genre {genre}. Please make a synopsis.",
            ),
        ]
    )

    chain = prompt | llm

    result=chain.invoke({"novel": "twilight", "genre": "fiction"})
    return result.content



def summary_generator(summary):
    llm=ChatOpenAI(model='gpt-3.5-turbo', api_key=os.getenv('OPENAI_API_KEY'))
    
    memory=ConversationSummaryBufferMemory(llm=llm, max_token_limit=20000, memory_key='chat_history', return_messages=True)
    
    summary_template = ChatPromptTemplate.from_messages([
        ("system", "You are an experienced novelist. Write a concise, realistic, and engaging summary based on the provided theme and previous context. Develop the characters, setting, and plot with rich descriptions. Ensure the summary flows smoothly, highlighting both hope and despair. Make the narrative provocative and creative. Avoid explicit reader interaction prompts or suggested paths."),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{prompt}")
    ])

    recommend_template = ChatPromptTemplate.from_messages([
        ("system", "Based on the current summary prompt, provide three compelling recommendations for the next part of the summary. Your recommendations should emphasize hopeful, tragically hopeless, and starkly realistic choices, respectively. Be extremely contextual and realistic with your recommendations. Each recommendation should have 'Title': 'Description'. For example: 'Title': 'The Beginning of a Tragedy','Description': 'The people are kind to the new doctor in town, but under the guise of healing their wounds, the doctor slowly conducts experiments.' The response format is exactly the same as the frames in the example."),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{current_story}")
    ])
    
    def load_memory():
        return memory.load_memory_variables({})["chat_history"]
    
    def parse_recommendations(recommendation_text):
        recommendations = []
        try:
            rec_lines = recommendation_text.split('\n')
            title, description = None, None
            for line in rec_lines:
                if line.startswith("Title:"):
                    if title and description:
                        recommendations.append(
                            {"Title": title, "Description": description})
                    title = line.split("Title:", 1)[1].strip()
                    description = None
                elif line.startswith("Description:"):
                    description = line.split("Description:", 1)[1].strip()
                    if title and description:
                        recommendations.append(
                            {"Title": title, "Description": description})
                        title, description = None, None
                if len(recommendations) == 3:
                    break
        except Exception as e:
            logging.error(f"Error parsing recommendations: {e}")

        return recommendations
    
    def generate_recommendations(chat_history, current_story):
        formatted_recommendation_prompt = recommend_template.format(
            chat_history=chat_history, current_story=current_story)
        recommendation_result = llm.invoke(formatted_recommendation_prompt)
        recommendations = parse_recommendations(recommendation_result.content)
        return recommendations

    def remove_recommendation_paths(final_summary):
        pattern = re.compile(r'Recommended summary paths:.*$', re.DOTALL)
        cleaned_story = re.sub(pattern, '', final_summary).strip()
        return cleaned_story


    chat_history = load_memory()
    prompt = f"""
    Story Prompt: {summary}
    Previous Story: {chat_history}
    Write a concise, realistic, and engaging summary based on the above information. Highlight both hope and despair in the narrative. Make it provocative and creative.
    """

    formatted_final_prompt = summary_template.format(chat_history=chat_history, prompt=prompt)
    result = llm.invoke(formatted_final_prompt)
    memory.save_context({"input": prompt}, {"output": result.content})

    cleaned_story = remove_recommendation_paths(result.content)
    recommendations = generate_recommendations(chat_history, result.content)

    return {"final_summary": cleaned_story, "recommendations": recommendations}

