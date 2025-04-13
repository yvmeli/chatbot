import unittest
import time
import os
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

class TestAsistenteVirtualSelenium(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        chrome_options = Options()
        chrome_options.add_argument("--window-size=1366,768")
        cls.driver = webdriver.Chrome(options=chrome_options)
        cls.driver.implicitly_wait(10)
        cls.driver.get("http://localhost:5000")
        
        if not os.path.exists("test_screenshots"):
            os.makedirs("test_screenshots")

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def enviar_mensaje(self, texto):
        """Función auxiliar para enviar mensajes"""
        input_field = self.driver.find_element(By.ID, "user-input")
        input_field.clear()
        input_field.send_keys(texto)
        send_btn = self.driver.find_element(By.ID, "send-btn")
        send_btn.click()
        time.sleep(2)

    def obtener_ultima_respuesta(self):
        """Función auxiliar para obtener la última respuesta del bot"""
        mensajes = self.driver.find_elements(By.CSS_SELECTOR, ".bot-message .message-content")
        return mensajes[-1].text if mensajes else ""

    def take_screenshot(self, name):
        """Función para tomar capturas de pantalla de pruebas exitosas"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"test_screenshots/{name}_{timestamp}.png"
        self.driver.save_screenshot(filename)
        print(f"Captura de pantalla guardada: {filename}")

    def test_saludo_inicial(self):
        """Verificar que el bot muestre el saludo inicial"""
        mensajes = self.driver.find_elements(By.CSS_SELECTOR, ".bot-message .message-content")
        self.assertGreaterEqual(len(mensajes), 1)
        self.assertIn("Hola, ¿en qué puedo ayudarte con respecto al ITLA?", mensajes[0].text)
        self.take_screenshot("saludo_inicial")

    def test_saludo_usuario(self):
        """Prueba que el asistente responda correctamente a un saludo"""
        self.enviar_mensaje("Hola")
        respuesta = self.obtener_ultima_respuesta()
        self.assertIn("Hola, ¿en qué puedo ayudarte con respecto al ITLA?", respuesta)
        self.take_screenshot("saludo_usuario")

    def test_significado_itla(self):
        """Prueba que el asistente responda sobre el significado de ITLA"""
        self.enviar_mensaje("¿Qué significa ITLA?")
        respuesta = self.obtener_ultima_respuesta()
        self.assertIn("Instituto Tecnológico de Las Américas", respuesta)
        self.take_screenshot("significado_itla")

    def test_ubicacion(self):
        """Prueba que el asistente responda sobre la ubicación del ITLA"""
        self.enviar_mensaje("Dime donde está ubicado el ITLA")
        respuesta = self.obtener_ultima_respuesta()
        self.assertIn("La Caleta, Boca Chica", respuesta)
        self.take_screenshot("ubicacion_itla")

    def test_pagina_web(self):
        """Prueba que el asistente responda sobre la página web del ITLA"""
        self.enviar_mensaje("Quiero saber cuál es la página web del ITLA")
        respuesta = self.obtener_ultima_respuesta()
        self.assertIn("www.itla.edu.do", respuesta)
        self.take_screenshot("pagina_web_itla")

    def test_becas(self):
        """Prueba que el asistente responda sobre becas"""
        self.enviar_mensaje("¿El ITLA tiene becas?")
        respuesta = self.obtener_ultima_respuesta()
        self.assertIn("becas", respuesta.lower())
        self.take_screenshot("becas_itla")

    def test_carreras(self):
        """Prueba que el asistente responda sobre carreras"""
        self.enviar_mensaje("¿Qué carreras ofrece el ITLA?")
        respuesta = self.obtener_ultima_respuesta()
        self.assertIn("carreras tecnológicas", respuesta.lower())
        self.take_screenshot("carreras_itla")

    def test_despedida(self):
        """Prueba que el asistente responda a una despedida"""
        self.enviar_mensaje("Adiós")
        respuesta = self.obtener_ultima_respuesta()
        self.assertIn("que tengas un buen día", respuesta.lower())
        self.take_screenshot("despedida")

    def test_respuesta_desconocida(self):
        """Prueba que el asistente maneje mensajes desconocidos"""
        self.enviar_mensaje("xyz123")
        respuesta = self.obtener_ultima_respuesta()
        posibles_respuestas = [
            '¿Puedes repetirlo?',
            'No estoy seguro de lo que quieres decir.',
            'Intenta preguntarlo de otra forma.'
        ]
        self.assertIn(respuesta, posibles_respuestas)
        self.take_screenshot("respuesta_desconocida")

if __name__ == '__main__':
    unittest.main()