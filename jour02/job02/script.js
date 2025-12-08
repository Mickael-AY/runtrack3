function showhide() {
    let text = document.getElementById('text');

    if (text.style.display === 'none') {
        text.style.display = 'block';
    } else {
        text.style.display = 'none';
    }
}

