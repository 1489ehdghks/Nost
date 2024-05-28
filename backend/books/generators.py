import os
import dotenv
import logging
import re
import json
from langchain.memory import ConversationSummaryBufferMemory
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder, FewShotChatMessagePromptTemplate
from langchain.schema.runnable import RunnablePassthrough



def synopsis_generator(user_prompt):
    llm = ChatOpenAI(
    model="gpt-3.5-turbo", api_key=os.getenv("OPENAI_API_KEY"), max_tokens=800
    )

    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", 'You are an expert in fiction. You must respond to the question in the following json format: {{"title":"", "synopsis":""}}'),
            (
                "human",
                "{user_prompt}. Please make a synopsis and the title of the fiction.",
            ),
        ]
    )

    chain = prompt | llm

    result=chain.invoke({"user_prompt":user_prompt})
    json_data=json.loads(result.content)
    return json_data



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

