"use strict";
import Chat from './components/Chat.js';
import ChatUser from './components/ChatUser.js';

export const controller = new AbortController();
export const { signal } = controller;

const nick = prompt('Enter a nickname: ');
const user = new ChatUser(nick);
const chat = new Chat(user);
chat.subscribe();

$('#chat').niceScroll({ cursorborder: '0px' });
$('#send').on('click', () => { chat.sendMessage() })

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return;
    }
    switch (event.key) {
        case "Enter":
            chat.sendMessage()
            break;
        default:
            return;
    }
})
