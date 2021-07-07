const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

/*const name = prompt("enter your name to join chat");
socket.emit('new-user-joined', name);
socket.on('user-joined',name=>{
    append(`${name} joined chat`,'center');
})*/

form.addEventListener('submit', (e) => {
    e.preventDefult();
    const message = messageInput.value;
    append(`you:${message}`, 'right');
    socket.emit('send',message);
    messageInput='';
})

socket.on('recieve', data=>{
    append(`${data.name}:${data.message}`,'left');
})

socket.on('left', name=>{
    append(`${name}`,'center');
})
