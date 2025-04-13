# app.py - Aplicación Flask para Asistente Virtual ITLA
# Yameli Martínez Taveras. Matrícula: 2023-1390
from flask import Flask, render_template, request, jsonify
import re
import random
from itla import itla

app = Flask(__name__)

def get_response(user_input):
    split_message = re.split(r'\s|[,:;.?!-_]\s*', user_input.lower())
    response = check_all_messages(split_message)
    return response

def message_probability(user_message, recognized_words, single_response=False, required_words=[]):
    message_certainty = 0
    has_required_words = True

    for word in user_message:
        if word in recognized_words:
            message_certainty += 1

    percentage = float(message_certainty) / float(len(recognized_words)) if recognized_words else 0

    for word in required_words:
        if word not in user_message:
            has_required_words = False
            break

    if has_required_words or single_response:
        return int(percentage * 100)
    else:
        return 0

def check_all_messages(message):
    highest_prob = {}

    for item in itla:
        prob = message_probability(
            message,
            item['keywords'],
            single_response=item.get('single_response', False),
            required_words=item.get('required_words', [])
        )
        highest_prob[item['response']] = prob

    best_match = max(highest_prob, key=highest_prob.get)
    return unknown() if highest_prob[best_match] < 1 else best_match

def unknown():
    response = [
        '¿Puedes repetirlo?',
        'No estoy seguro de lo que quieres decir.',
        'Intenta preguntarlo de otra forma.'
    ][random.randrange(3)]
    return response

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get_response', methods=['POST'])
def bot_response():
    user_input = request.json.get('message', '')
    response = get_response(user_input)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)