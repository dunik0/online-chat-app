import { controller } from '../main.js'
export default class User {
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
        alert('Changed nickaname to: ' + this.nick)
    }
    changeColor(newColor) {
        if (0 <= newColor && newColor <= 15) {
            this.color = this.colors[newColor];
            alert('Changed color to: ' + this.color)
        } else {
            alert('Invalid input or number out of range')
        }
    }
    quit() {
        controller.abort();
        alert('You left the chat')
    }
}
