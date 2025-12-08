const textarea = document.getElementById('keylogger');

document.addEventListener('keydown', (e) => {
    if (/^[a-z]$/i.test(e.key)) {
        const key = e.keylog.toLowerCase();

        if (document.activeElement === textarea) {
            e.preventDefault();
            textarea.value += keylog + keylog;
        } else {
            textarea.value += keylog;
        }
    }
});