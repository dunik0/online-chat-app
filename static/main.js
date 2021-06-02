"use strict";
const controller = new AbortController();
const { signal } = controller;

let user;
let active = true;

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return;
    }
    switch (event.key) {
        case "Enter":
            sendMessage()
            break;
        default:
            return;
    }
})

// $(document).ready(function () {
//     $('#scrollbar1').tinyscrollbar();
// });

function init() {
    const nick = prompt('Enter a nickname: ');
    user = new User(nick);
    subscribe();
}

async function subscribe() {
    let response = await fetch('/subscribe', {
        method: 'GET',
        signal
    });
    if (response.status == 200) {
        active = true;
        response = await response.json();
        response = JSON.parse(response);
        console.log(response)

        const messageContainer = document.createElement('div');
        messageContainer.classList.add('messageContainer');

        const nickEl = document.createElement('span');
        nickEl.style.color = response.color;
        nickEl.innerHTML = `&lt@${response.nick}&gt&nbsp`;

        const messageEl = document.createElement('p');
        messageEl.classList.add('text');
        messageEl.innerText = response.message;

        messageContainer.append(nickEl, messageEl);
        document.querySelector('#chat').append(messageContainer);

        $(document).ready(function () {
            $('.text').emoticonize({
                delay: 0,
                animate: false
            });
        })
        updateScroll();

        await subscribe();
    } else if (active) {
        await subscribe();
    }
}

function sendMessage() {
    const message = document.querySelector('#message').value;
    document.querySelector('#message').value = '';
    if (message) {
        if (message[0] == '/') {
            const messageArray = message.split(' ');
            console.log(messageArray)
            if (messageArray[0] == '/nick') {
                messageArray.shift();
                user.changeNickname(messageArray.join(' '));
            } else if (messageArray[0] == '/color') {
                user.changeColor(messageArray[1])
            } else if (messageArray[0] == '/quit') {
                user.quit();
            } else {
                alert('Invalid command');
            }
        } else {
            fetch('/publish', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    color: user.color,
                    nick: user.nick
                })
            });
        }
    }
}

function updateScroll() {
    let element = document.querySelector('#chat');
    element.scrollTop = element.scrollHeight;
}

class User {
    constructor(nick) {
        this.nick = nick;
        this.colors = [
            'rgb(255, 255, 255)',
            'rgb(0, 0, 0)',
            'rgb(0, 0, 127)',
            'rgb(0, 147, 0)',
            'rgb(255, 0, 0)',
            'rgb(127, 0, 0)',
            'rgb(156, 0, 156)',
            'rgb(252, 127, 0)',
            'rgb(255, 255, 0)',
            'rgb(0, 252, 0)',
            'rgb(0, 147, 147)',
            'rgb(0, 255, 255)',
            'rgb(0, 0, 252)',
            'rgb(255, 0, 255)',
            'rgb(127, 127, 127)',
            'rgb(210, 210, 210)'
        ]
        this.color = this.colors[Math.floor(Math.random() * 15)];
    }
    changeNickname(newName) {
        this.nick = newName;
    }
    changeColor(newColor) {
        if (0 <= newColor && newColor <= 15) {
            this.color = this.colors[newColor];
        } else {
            alert('Invalid input or number out of range')
        }
    }
    quit() {
        active = false;
        controller.abort();
        alert('You left the chat')
    }
}