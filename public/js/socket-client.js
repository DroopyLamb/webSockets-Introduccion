// Referencias del HTML
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');




// Socket del cliente
const socket = io();

/* --------------------------------------
                EVENTOS
-------------------------------------- */

// Evento de conexión
socket.on('connect', () => {
    console.log('conectado');
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

// Evento de desconexión
socket.on('disconnect', () => {
    console.log('Desconectado');

    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
});

// Recibir información desde el servidor
socket.on('enviar-mensaje', (payload) => {
    console.log(payload);
});

// Evento click, envio de datos al servidor
btnEnviar.addEventListener('click', () => {

    const mensaje = txtMensaje.value;

    const payload = {
        mensaje,
        id: '123',
        fecha: new Date().getDay()
    }

    // Enviar datos al servidor
    socket.emit('enviar-mensaje', payload, (id) => {
        console.log('Desde el server', id);
    });
});