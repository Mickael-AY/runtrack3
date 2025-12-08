let pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let current = 0;

let keyHandler = function (event) {

    if (event.key !== pattern[current]) {
        current = 0;
        return;
    }

    current++;

    if (pattern.length === current) {
        current = 0;
        let message = document.createElement('div');
        message.textContent = "Bonjour la Plateforme !";
        document.body.style.background = `#2443B3`;
        message.style.color = 'white';
        message.style.fontSize = '50px';
        message.style.textAlign = 'center';
        message.style.position = 'absolute';
        message.style.top = '50%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(message);
    }

};

document.addEventListener('keydown', keyHandler, false);