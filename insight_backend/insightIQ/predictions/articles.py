import re
from groq import Client


def clean_article(article):
    # Remove unwanted characters
    unwanted_chars = ["�", "??", "*", "•", "• ", "\n\n"]
    for char in unwanted_chars:
        article = article.replace(char, "")

    # Define patterns for titles and format them
    patterns = [
        r'(Future Market Trends\n)',
        r'(Recommended Education Paths\n)',
        r'(Key Skills Required\n)',
        r'(Career Opportunities\n)',
        r'(Practical Tips for Beginners\n)',
        r'(Conclusion\n)'
    ]

    # Bold titles without adding too much spacing
    for pattern in patterns:
        article = re.sub(pattern, r'<strong>\1</strong>', article)

    # Remove excessive newlines and replace with a single newline
    article = re.sub(r'\n+', '\n', article)  # Replace multiple newlines with a single newline

    # Format lists into cleaner paragraphs
    article = re.sub(r'(\w+):', r'<strong>\1:</strong>', article)  # Bold the category names

    # Additional formatting for key skills
    article = re.sub(r'(Programming skills:|Data visualization tools:|Machine learning libraries:|Statistics and mathematical modeling:|Data mining and querying:|Communication and presentation skills:)', r'<strong>\1</strong>', article)

    # Remove bullet points before titles
    article = re.sub(r'(- )', '', article)

    return article


GROQ_API_KEY = "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"

def generate_article_with_groq(topic):
    client = Client(api_key=GROQ_API_KEY)

    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": f"""Write a comprehensive article about {topic}. Include the following sections in HTML format with interactive ui:
                    <strong> Introduction: </strong> Briefly explain the topic and its significance. <br>
                    <strong> Future Market Trends: </strong> Analyze the upcoming trends in this field and their implications. <br>
                    <strong> Recommended Education Paths: </strong> Suggest specific courses, degrees, or certifications for beginners.<br>
                    <strong> Key Skills Required: </strong> List the essential skills needed to succeed in this field. <br>
                    <strong> Career Opportunities: </strong> Describe various job roles available for newcomers. <br>
                    <strong> Practical Tips for Beginners: </strong> Offer actionable advice and strategies for those starting out. <br>
                    <strong> Conclusion: </strong> Summarize the key takeaways and future perspectives.
                    Present the information in a clear, structured format without any unnecessary symbols."""
                }
            ],
            model="llama3-8b-8192",
        )


        # Extract the generated content from the response
        article = chat_completion.choices[0].message.content.strip()

        article = clean_article(article)
        return article

    except Exception as e:
        print(f"Error generating article: {e}")
        return None


def generate_html_page(topic, article):
    html_content = f"""
        <h1>An Article About {topic}</h1>
        <div id="article-content">
            {article}
        </div>
    """

    return html_content


def get_article(topic):

    article = generate_article_with_groq(topic)
    # print(article)

    if article:
        return generate_html_page(topic, article) 
    else:
        return "Failed to generate the article."
