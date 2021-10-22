import { io } from "socket.io-client";
let socket;

export const initiateSocketConnection = () => {
    socket = io(process.env.REACT_APP_REMOTE_URL);
    console.log(`Connecting socket...`);
}

export const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    if (socket) socket.disconnect();
}

export const subscribeToChat = (cb) => {
    socket.emit('comment', 'Hello there from React.');
    // socket.on('cmt-broadcast', msg => {
    //     return cb(null, msg);
    // });
}

export const sendComment = (content) => {
    socket.emit('send-comment', content);
}

export const displayComment = (cb) => {
    socket.on('cmt-broadcast', msg => {
        return cb(null, msg);
    });
}