import openai

# Replace with your actual OpenAI API key
openai.api_key = "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"

def chat_with_gpt(prompt):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}]
        )
        return response.choices[0].message['content'].strip()
    except Exception as e:
        return f"Error: {str(e)}"

