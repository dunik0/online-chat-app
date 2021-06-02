import { signal } from '../main.js'
export default class Chat {
    constructor(user) {
        this.user = user;
        this.active = MediaStreamTrackAudioSourceNode;
    }
    async subscribe() {
        let response = await fetch('/subscribe', {
            method: 'GET',
            signal
        });
        if (response.status == 200) {
            this.active = true;
            response = await response.json();
            response = JSON.parse(response);
            this.showMessage(response);
            await this.subscribe();
        } else if (this.active) {
            await this.subscribe();
        }
    }
    sendMessage() {
        const message = document.querySelector('#message').value;
        document.querySelector('#message').value = '';
        if (message) {
            if (message[0] == '/') {
                const messageArray = message.split(' ');
                console.log(messageArray)
                if (messageArray[0] == '/nick') {
                    messageArray.shift();
                    this.user.changeNickname(messageArray.join(' '));
                } else if (messageArray[0] == '/color') {
                    this.user.changeColor(messageArray[1])
                } else if (messageArray[0] == '/quit') {
                    this.active = false;
                    this.user.quit();
                } else {
                    alert('Invalid command');
                }
            } else if (this.active) {
                fetch('/publish', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: message,
                        color: this.user.color,
                        nick: this.user.nick
                    })
                });
            }
        }
    }
    showMessage(response) {
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

        this.updateScroll();
    }
    updateScroll() {
        let element = document.querySelector('#chat');
        element.scrollTop = element.scrollHeight;
    }
}