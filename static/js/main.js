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

        if (!isUser && message.includes("www.itla.edu.do")) {
            const urlRegex = /(https?:\/\/[^\s]+)/g;
            messageContent.innerHTML = message.replace(urlRegex, function(url) {
                return '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + url + '</a>';
            });

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
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 500);
        } else {
            messageContent.textContent = message;
        }

        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);

        if (!isUser) {

            if (message.includes("Adiós") || message.includes("Ha sido un placer")) {
                const despedidaActions = document.createElement('div');
                despedidaActions.classList.add('despedida-actions');

                const nuevaConsultaBtn = document.createElement('button');
                nuevaConsultaBtn.classList.add('action-button', 'nueva-consulta');
                nuevaConsultaBtn.textContent = 'Nueva Consulta';
                nuevaConsultaBtn.addEventListener('click', () => {
                    addMessage('¿En qué más puedo ayudarte sobre el ITLA?', false);

                    userInput.focus();
                });
                
                const feedbackBtn = document.createElement('button');
                feedbackBtn.classList.add('action-button', 'feedback');
                feedbackBtn.textContent = 'Dar Feedback';
                feedbackBtn.addEventListener('click', () => {
                    const feedbackModal = document.createElement('div');
                    feedbackModal.classList.add('feedback-modal');
                    feedbackModal.innerHTML = `
                        <div class="feedback-content">
                            <h3>¿Cómo te pareció la atención?</h3>
                            <div class="rating">
                                <span class="star" data-rating="1">★</span>
                                <span class="star" data-rating="2">★</span>
                                <span class="star" data-rating="3">★</span>
                                <span class="star" data-rating="4">★</span>
                                <span class="star" data-rating="5">★</span>
                            </div>
                            <textarea placeholder="Comentarios adicionales (opcional)"></textarea>
                            <div class="feedback-buttons">
                                <button class="cancel-btn">Cancelar</button>
                                <button class="submit-btn">Enviar</button>
                            </div>
                        </div>
                    `;
                    
                    document.body.appendChild(feedbackModal);

                    const stars = feedbackModal.querySelectorAll('.star');
                    stars.forEach(star => {
                        star.addEventListener('click', () => {
                            const rating = star.getAttribute('data-rating');
                            stars.forEach(s => {
                                if (s.getAttribute('data-rating') <= rating) {
                                    s.classList.add('active');
                                } else {
                                    s.classList.remove('active');
                                }
                            });
                        });
                    });

                    feedbackModal.querySelector('.cancel-btn').addEventListener('click', () => {
                        document.body.removeChild(feedbackModal);
                    });

                    feedbackModal.querySelector('.submit-btn').addEventListener('click', () => {
                        document.body.removeChild(feedbackModal);
                        addMessage('¡Gracias por tu feedback! Nos ayuda a mejorar.', false);
                    });
                });
                
                despedidaActions.appendChild(nuevaConsultaBtn);
                despedidaActions.appendChild(feedbackBtn);
                
                messageDiv.appendChild(despedidaActions);
                
                setTimeout(() => {
                    const waveEmoji = document.createElement('div');
                    waveEmoji.classList.add('wave-emoji');
                    waveEmoji.textContent = '👋';
                    messageDiv.appendChild(waveEmoji);
                }, 500);
            }

            if (message.includes("proceso de admisión")) {
                const admisionInfo = document.createElement('div');
                admisionInfo.classList.add('admision-info');
                admisionInfo.innerHTML = `
                    <h3>Proceso de Admisión ITLA</h3>
                    <div class="proceso-pasos">
                        <div class="paso">
                            <div class="paso-numero">1</div>
                            <div class="paso-contenido">
                                <h4>Registro en línea</h4>
                                <p>Completar formulario en la página web del ITLA</p>
                            </div>
                        </div>
                        <div class="paso-conector"></div>
                        <div class="paso">
                            <div class="paso-numero">2</div>
                            <div class="paso-contenido">
                                <h4>Pago de prueba</h4>
                                <p>Realizar pago de la prueba de admisión (RD$500)</p>
                            </div>
                        </div>
                        <div class="paso-conector"></div>
                        <div class="paso">
                            <div class="paso-numero">3</div>
                            <div class="paso-contenido">
                                <h4>Prueba de admisión</h4>
                                <p>Presentar prueba en la fecha asignada</p>
                            </div>
                        </div>
                        <div class="paso-conector"></div>
                        <div class="paso">
                            <div class="paso-numero">4</div>
                            <div class="paso-contenido">
                                <h4>Resultados</h4>
                                <p>Recibir notificación de aceptación vía correo</p>
                            </div>
                        </div>
                        <div class="paso-conector"></div>
                        <div class="paso">
                            <div class="paso-numero">5</div>
                            <div class="paso-contenido">
                                <h4>Inscripción</h4>
                                <p>Completar proceso de inscripción y pago</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="requisitos-admision">
                        <h4>Requisitos:</h4>
                        <ul>
                            <li>Certificado de bachiller o constancia</li>
                            <li>Documento de identidad</li>
                            <li>Acta de nacimiento</li>
                            <li>2 fotos 2x2</li>
                            <li>Formulario de solicitud completado</li>
                        </ul>
                    </div>
                `;
                
                messageDiv.appendChild(admisionInfo);
            }

            if (message.includes("modalidad presencial")) {
                const modalidadInfo = document.createElement('div');
                modalidadInfo.classList.add('modalidad-info');
                modalidadInfo.innerHTML = `
                    <h3>Modalidades de estudio en ITLA</h3>
                    <div class="table-container">
                        <table class="modalidad-table">
                            <thead>
                                <tr>
                                    <th>Modalidad</th>
                                    <th>Horarios</th>
                                    <th>Características</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Presencial</strong></td>
                                    <td>
                                        • Matutino (8:00 AM - 12:00 PM)<br>
                                        • Vespertino (2:00 PM - 6:00 PM)<br>
                                        • Nocturno (6:00 PM - 10:00 PM)
                                    </td>
                                    <td>
                                        • Clases en campus<br>
                                        • Acceso a laboratorios<br>
                                        • Interacción directa con profesores
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Virtual</strong></td>
                                    <td>
                                        • Flexible<br>
                                        • Sesiones sincrónicas programadas
                                    </td>
                                    <td>
                                        • Plataforma Microsoft Teams<br>
                                        • Material disponible 24/7<br>
                                        • Tutorías en línea
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p class="modalidad-nota">Nota: La disponibilidad de modalidades puede variar según la carrera y el cuatrimestre.</p>
                `;
                
                messageDiv.appendChild(modalidadInfo);
            }

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
                                <a href="https://www.facebook.com/ITLARD/?locale=es_LA" target="_blank">@ITLARD</a>
                            </div>
                        </div>
                        <div class="contacto-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            <div>
                                <strong>Instagram</strong><br>
                                <a href="https://www.instagram.com/itlard/" target="_blank">@itlard</a>
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
                
                let carrerasHTML = `<h3>Carreras técnicas en ITLA</h3><div class="carreras-grid">`;
                
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
                        <li><strong>Becas de excelencia académica</strong>: Para estudiantes con alto rendimiento</li>
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

            if (message.includes("ubicado en La Caleta, Boca Chica")) {
                const mapContainer = document.createElement('div');
                mapContainer.classList.add('map-container');
                mapContainer.style.position = 'relative';
                mapContainer.style.marginTop = '15px';
                
                const mapOverlay = document.createElement('div');
                mapOverlay.classList.add('map-overlay');
                mapOverlay.innerHTML = `
                    <div class="map-info">
                        <h4>ITLA - Instituto Tecnológico de Las Américas</h4>
                        <p>Autopista Las Américas, Km. 27, PCSD, La Caleta, Boca Chica 11606</p>
                        <a href="https://maps.google.com/?q=18.4825,-69.7533" target="_blank" class="map-link">
                            Abrir en Google Maps
                        </a>
                    </div>
                `;

                const mapImage = document.createElement('img');
                mapImage.src = "https://maps.googleapis.com/maps/api/staticmap?center=18.4825,-69.7533&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7C18.4825,-69.7533&key=YOUR_API_KEY";
                mapImage.alt = "Mapa de ubicación de ITLA";
                mapImage.width = "100%";
                mapImage.style.borderRadius = "10px";
                mapImage.style.maxWidth = "100%";
                
                mapContainer.appendChild(mapImage);
                mapContainer.appendChild(mapOverlay);
                
                const style = document.createElement('style');
                style.textContent = `
                    .map-container {
                        margin-top: 15px;
                        border-radius: 10px;
                        overflow: hidden;
                        border: 1px solid #ddd;
                        max-width: 100%;
                    }
                    .map-overlay {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        background-color: rgba(255, 255, 255, 0.9);
                        padding: 10px;
                        border-top: 1px solid #ddd;
                    }
                    .map-info {
                        font-size: 14px;
                    }
                    .map-info h4 {
                        margin: 0 0 5px 0;
                        color: #333;
                    }
                    .map-info p {
                        margin: 0 0 8px 0;
                        color: #666;
                    }
                    .map-link {
                        display: inline-block;
                        padding: 6px 12px;
                        background-color: #4285F4;
                        color: white;
                        text-decoration: none;
                        border-radius: 4px;
                        font-weight: bold;
                    }
                    .map-link:hover {
                        background-color: #3367D6;
                    }
                `;
                document.head.appendChild(style);
                
                messageDiv.appendChild(mapContainer);
                
                const fallbackLink = document.createElement('div');
                fallbackLink.classList.add('fallback-link');
                fallbackLink.innerHTML = `
                    <p style="margin-top: 10px; font-size: 13px; color: #666;">
                        Si no puedes ver el mapa, <a href="https://maps.google.com/?q=ITLA+Instituto+Tecnológico+de+Las+Américas,+Autopista+Las+Américas,+Km.+27,+PCSD,+La+Caleta,+Boca+Chica+11606" target="_blank">haz clic aquí para ver la ubicación exacta</a>.
                    </p>
                `;
                messageDiv.appendChild(fallbackLink);
            }
        }
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            
            userInput.value = '';
            
            fetch('/get_response', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message }),
            })
            .then(response => response.json())
            .then(data => {
                addMessage(data.response, false);
            })
            .catch(error => {
                console.error('Error:', error);
                addMessage('Lo siento, hubo un error al procesar tu solicitud.', false);
            });
        }
    }

    sendBtn.addEventListener('click', sendMessage);

    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});