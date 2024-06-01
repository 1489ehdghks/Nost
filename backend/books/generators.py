import os
import logging
import re
import json
from langchain.memory import ConversationSummaryBufferMemory
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder, FewShotChatMessagePromptTemplate
from langchain.schema.runnable import RunnablePassthrough



def synopsis_generator(user_prompt):
    llm = ChatOpenAI(
        model="gpt-3.5-turbo",
        api_key=os.getenv("OPENAI_API_KEY"),
        max_tokens=800,
        temperature=1.2
    )

    example_prompt = (
        'Title: The Wounded Ones\n'
        'Genre: Romantic Thriller\n'
        'Theme: Love and Discrimination\n'
        'Tone: Tense and Emotional\n'
        'Setting: 2156, Neo New York\n'
        'Summary:\n'
        'In 2156, Neo New York is a society deeply divided by discrimination between humans and synthetic humans. '
        'Those with less than "60%" human DNA are legally not considered people and occupy the lowest rungs of society. '
        'While the first generations of synthetic humans were known for their exceptional abilities and appearance, '
        'subsequent generations became more biologically diverse, making them appear less human and more subject to discrimination.\n\n'
        'Characters:\n'
        'Eleanor Blackwood: An advocate for synthetic human rights. After her husband died in an accident, she has struggled to raise her two daughters.Eleanor is longtime friends with Frank Miller, and their friendship slowly blossoms into romance.'
        'Lydia Blackwood: Eleanor\'s eldest daughter, a 17-year-old with "94%" human DNA. She faces less discrimination but still experiences social isolation because of her family.\n'
        'Chloe Blackwood: Eleanor\'s younger daughter, a 12-year-old with "62%" human DNA. She faces severe bullying and discrimination at school and often gets into fights to defend herself.\n'
        'Frank Miller: A seasoned detective and journalist. He is dedicated to exposing the discrimination against synthetic humans and protecting Eleanor and her daughters. '
        'His efforts to uncover the truth also lead to a deepening relationship with Eleanor.'
    )

    example_prompt2 = (
        'Title: Project-elven001\n'
        'Genre: Thriller, Science Fiction\n'
        'Theme: Ethics of Genetic Engineering, Exploitation, and Redemption\n'
        'Tone: Dark, Intense, and Realistic\n'
        'Setting: Near-future, Global Conflict Zones, Secret Laboratory\n'
        'Summary:\n'
        'In a world ravaged by wars and conflicts, thousands of children are left orphaned and abandoned.'
        'Amidst this chaos, a brilliant but morally bankrupt geneticist, Dr. Viktor Halstrom, sees an opportunity for his radical experiments.'
        'While the first generations of synthetic humans were known for their exceptional abilities and appearance, '
        'Driven by a twisted obsession with mythical beings, he aims to create real-life elves through advanced genetic engineering.\n\n'
        'Characters:\n'
        'Dr. Viktor Halstrom: A once-respected geneticist who has descended into madness, believing that creating elves is the pinnacle of genetic science. He is charismatic yet deeply disturbed, viewing his subjects as mere tools for his experiments.'
        'Lena: A 12-year-old war orphan with a resilient spirit. She becomes the unintentional leader of the children taken by Halstrom. She is determined to survive and protect the younger children.\n'
        'Max: A 10-year-old boy with a keen intellect and a natural curiosity. He becomes Lena\'s closest ally, using his knowledge to help them understand Halstrom\'s plans.\n'
        'Sarah Collins: A top-tier journalist who assembles a team to create a documentary on the dangers of war and the devastation of post-war areas. While exploring these regions, she discovers Halstrom\'s research facility and begins to investigate its ominous nature.\n'
    )

    prompt_text = (
        f"You are an expert in fiction. Generate a detailed synopsis for a novel based on the following user prompt. "
        f"Here is an example format:\n\n{example_prompt}\n\n"
        f"Now create a synopsis for the following prompt in a similar format.\n\n"
        f"Prompt: {user_prompt}\n"
        f"Format the response as follows:\n"
        f"Title: <Insert the title of the novel>\n"
        f"Genre: <Specify the genre of the novel>\n"
        f"Theme: <Identify the main theme of the novel>\n"
        f"Tone: <Describe the tone of the novel>\n\n"
        f"Setting: <Describe the setting of the novel>\n\n"
        f"Summary: <Provide a brief summary of the novel>\n\n"
        f"Characters:<Describe the characters of the novel>"
    )

    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", prompt_text),
            ("assistant", "I'm an AI that generates the best synopsis. Feel free to tell me anything about your synopsis."),
            ("human", user_prompt),
            ("assistant", example_prompt2)
        ]
    )

    chain = prompt | llm
    result = chain.invoke({"user_prompt": user_prompt})

    result_text = result.content.strip()
    logging.debug(f"Synopsis Generator Response: {result_text}")

    try:
        result_lines = result_text.split('\n')
        data = {
            "title": "",
            "genre": "",
            "theme": "",
            "tone": "",
            "setting": "",
            "synopsis": "",
            "characters": ""
        }
        current_key = None
        for line in result_lines:
            line = line.strip()
            if line.startswith("Title:"):
                data["title"] = line.split("Title:", 1)[1].strip()
                current_key = "title"
            elif line.startswith("Genre:"):
                data["genre"] = line.split("Genre:", 1)[1].strip()
                current_key = "genre"
            elif line.startswith("Theme:"):
                data["theme"] = line.split("Theme:", 1)[1].strip()
                current_key = "theme"
            elif line.startswith("Tone:"):
                data["tone"] = line.split("Tone:", 1)[1].strip()
                current_key = "tone"
            elif line.startswith("Setting:"):
                data["setting"] = line.split("Setting:", 1)[1].strip()
                current_key = "setting"


            elif line.startswith("Characters:"):
                data["characters"] = line.split("Characters:", 1)[1].strip()
                current_key = "characters"
            elif current_key == "characters":
                data["characters"] += " " + line
            elif line.startswith("Summary:"):
                data["synopsis"] = line.split("Summary:", 1)[1].strip()
                current_key = "synopsis"
            elif current_key == "synopsis":
                data["synopsis"] += " " + line


        return data
    except Exception as e:
        logging.error(f"Error parsing synopsis response: {e}")
        return {"title": "", "genre": "", "theme": "", "tone": "", "setting": "", "synopsis": "", "characters": ""}



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

