from flask import Flask, render_template

# Create an instance of the Flask web application
app = Flask(__name__)

# Define a route for the homepage
@app.route("/")
def home():
  return render_template('summarizer.html')