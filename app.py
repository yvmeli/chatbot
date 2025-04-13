# app.py - Aplicación Flask para Asistente Virtual ITLA
# Yameli Martínez Taveras. Matrícula: 2023-1390
from flask import Flask, render_template, request, jsonify
import re
import random
import unicodedata
from itla import itla

app = Flask(__name__)

def normalize_text(text):
    """Normaliza el texto: elimina acentos y convierte a minúsculas"""
    normalized = unicodedata.normalize('NFKD', text)
    normalized = ''.join([c for c in normalized if not unicodedata.combining(c)])
    # Convertir a minúsculas
    return normalized.lower()

def get_response(user_input):
    normalized_input = normalize_text(user_input)
    
    # Tratar casos especiales directamente
    if re.search(r'(donde|dónde|ubicado|ubicación|direccion|dirección).*itla', normalized_input, re.IGNORECASE):
        return "La sede principal del ITLA está ubicado en La Caleta, Boca Chica."
    
    if re.search(r'(pagina|página|web|sitio|url|https).*itla', normalized_input, re.IGNORECASE):
        return "La página web del ITLA es https://www.itla.edu.do"
    
    if re.search(r'(beca|becas|pagar|ayuda|financiera).*itla', normalized_input, re.IGNORECASE):
        return "Sí, el ITLA ofrece becas a través de diferentes programas del gobierno. Hay becas completas y parciales, dependiendo de tus calificaciones y situación económica. Puedes obtener más información en la sección de becas de la página web."
    
    split_message = re.split(r'\s|[,:;.?!-_]\s*', normalized_input)
    split_message = [word for word in split_message if word]

    response = check_all_messages(split_message)
    return response

def message_probability(user_message, recognized_words, single_response=False, required_words=[]):
    message_certainty = 0
    has_required_words = True

    for word in user_message:
        if word in recognized_words:
            message_certainty += 1

    percentage = float(message_certainty) / float(len(recognized_words)) if recognized_words else 0

    if required_words:
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
        print(f"Respuesta: {item['response']}, Prob: {prob}")

    # Encontrar la mejor coincidencia
    best_match = max(highest_prob, key=highest_prob.get)
    print(f"Mejor coincidencia: {best_match} con probabilidad {highest_prob[best_match]}")
    
    # Si la probabilidad es muy baja, devolver respuesta desconocida
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
    print(f"Consulta recibida: {user_input}")
    response = get_response(user_input)
    print(f"Respuesta: {response}")
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)