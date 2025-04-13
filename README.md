# Asistente Virtual ITLA

## Descripción del proyecto

El **Asistente Virtual ITLA** es un chatbot interactivo diseñado para proporcionar información relevante sobre el Instituto Tecnológico de Las Américas (ITLA). Este asistente responde a preguntas frecuentes de estudiantes, profesores y visitantes sobre diversos temas relacionados con la institución, como ubicación, carreras, becas, admisiones y más.

## Características principales

- **Interfaz amigable**: Chat interactivo con diseño responsivo.
- **Respuestas inteligentes**: Procesamiento de lenguaje natural básico para entender preguntas.
- **Contenido enriquecido**: No solo texto, sino también:
  - Previsualización de enlaces
  - Mapas de ubicación
  - Tablas informativas
  - Tarjetas visuales para carreras
  - Formularios de feedback
- **Temas cubiertos**:
  - Información general del ITLA
  - Ubicación y contacto
  - Carreras técnicas ofrecidas
  - Proceso de admisión
  - Modalidades de estudio
  - Información sobre becas
  - Página web oficial

## Estructura del proyecto

```
CHATBOT/
├── static/
│   ├── css/
│   │   └── style.css           # Estilos CSS para la interfaz
│   ├── images/                 # Imágenes utilizadas (logo, previews)
│   └── js/
│       └── main.js             # Lógica del frontend
├── templates/
│   └── index.html              # Plantilla HTML principal
├── test_screenshots/           # Capturas de pruebas automatizadas
├── tests/
│   └── test_bot.py             # Pruebas automatizadas con Selenium
├── .gitignore
├── app.py                      # Aplicación Flask principal
├── itla.py                     # Base de conocimiento del chatbot
├── README.md
└── requirements.txt            # Dependencias de Python
```

## Tecnologías utilizadas

- **Backend**:
  - Python 3
  - Flask (framework web)
  - Procesamiento básico de lenguaje natural con expresiones regulares

- **Frontend**:
  - HTML5, CSS3, JavaScript
  - Diseño responsivo
  - Interacciones dinámicas sin recargar página (AJAX)

- **Testing**:
  - Selenium WebDriver
  - Pruebas automatizadas de interfaz
  - Capturas de pantalla automáticas

## Funcionamiento

1. El usuario ingresa su pregunta en el chat.
2. El sistema normaliza el texto (elimina acentos, convierte a minúsculas).
3. Busca coincidencias con patrones predefinidos.
4. Selecciona la respuesta más apropiada basada en probabilidad de coincidencia.
5. Devuelve la respuesta, enriqueciéndola con elementos visuales cuando es relevante.

## Instalación y ejecución

1. Clonar el repositorio
2. Instalar dependencias: `pip install -r requirements.txt`
3. Ejecutar la aplicación: `python app.py`
4. Acceder a `http://localhost:5000` en el navegador

## Pruebas

El proyecto incluye pruebas automatizadas con Selenium que verifican:
- Saludo inicial
- Respuestas sobre significado de ITLA
- Información de ubicación
- Página web oficial
- Información sobre becas
- Listado de carreras
- Manejo de despedidas
- Respuestas a mensajes desconocidos

## Capturas de pantalla

El sistema automáticamente guarda capturas de las pruebas exitosas en el directorio `test_screenshots/`.

## Autor

**Yameli Martínez Taveras**  
Matrícula: 2023-1390  
Estudiante del Instituto Tecnológico de Las Américas (ITLA)