function init() {
    subscribe();
}

async function subscribe() {
    const response = await fetch('/subscribe', {
        method: 'GET',
    });
    if (response.status == 200) {
        const message = await response.json();
        const messageDiv = document.createElement('div');
        messageDiv.innerHTML = message;
        document.querySelector('#chat').append(messageDiv);
        await subscribe();
    } else {
        await subscribe();
    }
}

function sendMessage() {
    const message = document.querySelector('#message').value;
    if (message) {
        fetch('/publish', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        });
        document.querySelector('#message').value = '';
    }
}