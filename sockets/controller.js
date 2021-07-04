const socketController = (socket) => {




    console.log('Cliente Conectado', socket.id);

    // Cliente desconectado
    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    });

    // El parámetro payload es la información del mensaje que envió el cliente
    socket.on('enviar-mensaje', (payload, callback) => {


        const id = 123456;
        callback({ id });

        socket.broadcast.emit('enviar-mensaje', payload);
    });





}

module.exports = {
    socketController
}