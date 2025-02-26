from groq import Client

GROQ_API_KEY = "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"

def get_career_suggestions(skills, interests):
    client = Client(api_key=GROQ_API_KEY)
    # user_input = f"Based on the following skills: {', '.join(skills)} and interests: {', '.join(interests)}, suggest possible career options. "

    user_input = f"Based on the following skills: {skills} and interests: {interests}, suggest possible career options. "

    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": user_input
                }
            ],
            model="llama3-8b-8192"  # Change this to the appropriate model as necessary
        )

        # Extract the generated content from the response
        suggestions = chat_completion.choices[0].message.content.strip()
        return suggestions

    except Exception as e:
        print(f"Error fetching suggestions: {e}")
        return "Unable to fetch career suggestions at this time."

# if __name__ == "__main__":
#     skills_input = input("Enter your skills (comma-separated): ")
#     interests_input = input("Enter your interests (comma-separated): ")

#     skills = [skill.strip() for skill in skills_input.split(",")]
#     interests = [interest.strip() for interest in interests_input.split(",")]

#     suggested_careers = get_career_suggestions(skills, interests)
    
#     print("Suggested career options based on your skills and interests:")
#     print(suggested_careers)
