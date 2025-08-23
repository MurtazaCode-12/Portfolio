import os
import google.generativeai as genai
from dotenv import load_dotenv
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY")) 
model = genai.GenerativeModel('gemini-2.0-flash')
# The long text you want to summarize. You can replace this with any text!
text_to_summarize = """
Python is an interpreted, high-level and general-purpose programming language.
Created by Guido van Rossum and first released in 1991, Python's design philosophy
emphasizes code readability with its notable use of significant whitespace. Its language
constructs and object-oriented approach aim to help programmers write clear, logical
code for small and large-scale projects. It is dynamically typed and garbage-collected.
It supports multiple programming paradigms, including structured (particularly, procedural),
object-oriented, and functional programming.
"""

# The instruction we will give to the AI
prompt = f"Summarize the following text in one or two clear sentences: {text_to_summarize}"
# Send the prompt to the model and get the response
response = model.generate_content(prompt)

# Print the summarized text from the response
print("✨ AI Summary:")
print(response.text)
