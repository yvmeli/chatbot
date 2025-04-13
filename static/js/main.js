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

            if (message.includes("comunicarte con ITLA")) {
                const contactoInfo = document.createElement('div');
                contactoInfo.classList.add('contacto-info');
                contactoInfo.innerHTML = `
                    <h3>Información de Contacto</h3>
                    <div class="contacto-grid">
                        <div class="contacto-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            <div>
                                <strong>Teléfono</strong><br>
                                <a href="tel:+18097384852">(809) 738-4852</a>
                            </div>
                        </div>
                        <div class="contacto-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            <div>
                                <strong>Email</strong><br>
                                <a href="mailto:info@itla.edu.do">info@itla.edu.do</a>
                            </div>
                        </div>
                        <div class="contacto-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                            <div>
                                <strong>Facebook</strong><br>
                                <a href="https://www.facebook.com/ITLA.edu" target="_blank">@ITLA.edu</a>
                            </div>
                        </div>
                        <div class="contacto-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            <div>
                                <strong>Instagram</strong><br>
                                <a href="https://www.instagram.com/itla.edu.do/" target="_blank">@itla.edu.do</a>
                            </div>
                        </div>
                    </div>
                `;
                
                messageDiv.appendChild(contactoInfo);
            }

            if (message.includes("carreras tecnológicas")) {
                const carrerasInfo = document.createElement('div');
                carrerasInfo.classList.add('carreras-info');
                
                const carreras = [
                    { nombre: "Desarrollo de Software", duracion: "2.5 años", descripcion: "Creación de aplicaciones y sistemas" },
                    { nombre: "Multimedia", duracion: "2.5 años", descripcion: "Diseño y producción de contenido digital" },
                    { nombre: "Mecatrónica", duracion: "2.5 años", descripcion: "Combinación de mecánica, electrónica y programación" },
                    { nombre: "Seguridad Informática", duracion: "2.5 años", descripcion: "Protección de sistemas y datos" },
                    { nombre: "Inteligencia Artificial", duracion: "2.5 años", descripcion: "Desarrollo de sistemas inteligentes" },
                    { nombre: "Ciencia de Datos", duracion: "2.5 años", descripcion: "Análisis y procesamiento de grandes volúmenes de datos" },
                    { nombre: "Redes de Información", duracion: "2.5 años", descripcion: "Infraestructura de comunicaciones" },
                    { nombre: "Sonido", duracion: "2.5 años", descripcion: "Producción y edición de audio" }
                ];
                
                let carrerasHTML = `<h3>Carreras Técnicas en ITLA</h3><div class="carreras-grid">`;
                
                carreras.forEach(carrera => {
                    carrerasHTML += `
                        <div class="carrera-card">
                            <h4>${carrera.nombre}</h4>
                            <p><strong>Duración:</strong> ${carrera.duracion}</p>
                            <p>${carrera.descripcion}</p>
                        </div>
                    `;
                });
                
                carrerasHTML += `</div>`;
                carrerasInfo.innerHTML = carrerasHTML;
                
                messageDiv.appendChild(carrerasInfo);
            }

            if (message.includes("ITLA ofrece becas")) {
                const becasInfo = document.createElement('div');
                becasInfo.classList.add('becas-info');
                becasInfo.innerHTML = `
                    <h3>Tipos de Becas en ITLA</h3>
                    <ul>
                        <li><strong>Becas de Excelencia Académica</strong>: Para estudiantes con alto rendimiento</li>
                        <li><strong>Becas Gubernamentales</strong>: A través de programas del gobierno</li>
                        <li><strong>Becas Parciales</strong>: Cubren una parte de la matrícula</li>
                    </ul>
                    <a href="https://www.itla.edu.do/becas" target="_blank">Más información sobre becas</a>
                `;
                
                messageDiv.appendChild(becasInfo);
            }
            
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