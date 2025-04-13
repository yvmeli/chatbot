document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    function addMessage(message, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        
        // Comprobar si el mensaje contiene una URL
        if (!isUser && message.includes("www.itla.edu.do")) {
            // Crear un enlace para la URL
            const urlRegex = /(https?:\/\/[^\s]+)/g;
            messageContent.innerHTML = message.replace(urlRegex, function(url) {
                return '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + url + '</a>';
            });
            
            // Añadir vista previa del sitio web
            const previewDiv = document.createElement('div');
            previewDiv.classList.add('website-preview');
            previewDiv.innerHTML = `
                <div class="preview-container">
                    <img src="/static/images/website-preview.jpg" alt="Vista previa de la página web del ITLA">
                    <div class="preview-text">
                        <h3>ITLA - Instituto Tecnológico de Las Américas</h3>
                        <p>Sitio web oficial del Instituto Tecnológico de Las Américas</p>
                    </div>
                </div>
            `;
            
            setTimeout(() => {
                messageDiv.appendChild(previewDiv);
                // Auto-scroll to the bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 500);
        } else {
            messageContent.textContent = message;
        }

        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);

        if (!isUser) {
            if (message.includes("Instituto Tecnológico de Las Américas")) {
                const logoImg = document.createElement('img');
                logoImg.src = "/static/images/logo.jpg";
                logoImg.alt = "Logo ITLA";
                logoImg.style.maxWidth = "200px";
                logoImg.style.margin = "10px 0";
                
                chatMessages.appendChild(logoImg);
            }

            if (message.includes("ubicado en San Luis, Santo Domingo Este")) {
                const mapDiv = document.createElement('div');
                mapDiv.id = 'map';
                mapDiv.style.height = '200px';
                mapDiv.style.width = '100%';
                mapDiv.style.marginTop = '10px';
                mapDiv.style.borderRadius = '10px';
                
                chatMessages.appendChild(mapDiv);
                
                // Inicializar mapa
                const itlaLocation = { lat: 18.4861, lng: -69.8481 }; // Coordenadas aproximadas del ITLA
                const map = new google.maps.Map(mapDiv, {
                    center: itlaLocation,
                    zoom: 15,
                });
                
                // Añadir marcador
                new google.maps.Marker({
                    position: itlaLocation,
                    map: map,
                    title: "ITLA"
                });
            }
        }
        
        // Auto-scroll to the bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            // Add user message to chat
            addMessage(message, true);
            
            // Clear input field
            userInput.value = '';
            
            // Send to server and get response
            fetch('/get_response', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message }),
            })
            .then(response => response.json())
            .then(data => {
                // Add bot response to chat
                addMessage(data.response, false);
            })
            .catch(error => {
                console.error('Error:', error);
                addMessage('Lo siento, hubo un error al procesar tu solicitud.', false);
            });
        }
    }

    // Send message when button is clicked
    sendBtn.addEventListener('click', sendMessage);

    // Send message when Enter key is pressed
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});