document.addEventListener('DOMContentLoaded', function () {
    // Job 02 - script for shuffling and ordering rainbow pieces (using local images arc1..arc6.png)
    const pieces = [
        { src: 'arc1.png', order: 1 },
        { src: 'arc2.png', order: 2 },
        { src: 'arc3.png', order: 3 },
        { src: 'arc4.png', order: 4 },
        { src: 'arc5.png', order: 5 },
        { src: 'arc6.png', order: 6 }
    ];

    const palette = document.getElementById('palette');
    const slots = Array.from(document.querySelectorAll('.slot'));
    const shuffleBtn = document.getElementById('shuffleBtn');
    const checkBtn = document.getElementById('checkBtn');
    const resetBtn = document.getElementById('resetBtn');
    const result = document.getElementById('result');

    // Create image element from an image file
    function makePiece(item) {
        const img = document.createElement('img');
        img.className = 'piece';
        img.draggable = true;
        img.src = item.src;
        img.dataset.order = item.order;
        img.id = 'piece-' + item.order + '-' + Math.random().toString(36).slice(2,6);
        img.alt = 'pièce ' + item.order;
        img.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', img.id);
            e.dataTransfer.effectAllowed = 'move';
        });
        return img;
    }

    function populatePalette(list) {
        palette.querySelectorAll('img').forEach(n => n.remove());
        list.forEach(item => {
            const img = makePiece(item);
            palette.appendChild(img);
            styleFor(img, palette);
        });
    }

    function shuffle(array) {
        const a = array.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    function allowDrop(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    function handleDrop(e) {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        const dragged = document.getElementById(id);
        if (!dragged) return;

        // determine actual drop container: prefer closest .slot, else palette
        const dropSlot = e.target && e.target.closest ? e.target.closest('.slot') : null;
        const dropPalette = e.target && e.target.closest ? e.target.closest('#palette') : null;
        const target = dropSlot || dropPalette || e.currentTarget;

        const container = (target && target.classList && (target.classList.contains('slot') || target.id === 'palette')) ? target : (target && target.closest ? target.closest('.slot') || target.closest('#palette') : target);

        if (!container) return;

        // If dropping into the palette: just append the thumbnail back
        if (container.id === 'palette') {
            // dragged is a thumbnail from palette — nothing special, append it
            container.appendChild(dragged);
            styleFor(dragged, container);
            return;
        }

        // If dropping into a slot: move the dragged <img> into the slot element
        if (container.classList && container.classList.contains('slot')) {
            const slot = container;
            const oldParent = dragged.parentElement;
            // If slot already has an image element, move it back to the palette
            const existingImg = slot.querySelector('img.piece');
            if (existingImg) {
                // move the existing image back into the palette
                palette.appendChild(existingImg);
                styleFor(existingImg, palette);
            }

            // append the dragged element into the slot and style it accordingly
            slot.appendChild(dragged);
            styleFor(dragged, slot);
            // store metadata on the slot for verification
            slot.dataset.src = dragged.src;
            slot.dataset.order = dragged.dataset.order;

            return;
        }

        // si les 6 slots sont remplis, vérifier automatiquement
        if (slots.every(s => s.querySelector('img'))) {
            checkOrder();
        }
    }

    // Attach drop listeners
    palette.addEventListener('dragover', allowDrop);
    palette.addEventListener('drop', handleDrop);
    slots.forEach(s => {
        s.addEventListener('dragover', allowDrop);
        s.addEventListener('drop', handleDrop);
    });

    // apply appropriate sizing depending on destination (palette vs slot)
    function styleFor(el, container) {
        if (!el) return;
        if (!container) return;
        if (container.id === 'palette') {
            el.style.width = '120px';
            el.style.height = 'auto';
        } else {
            el.style.height = '100%';
            el.style.width = 'auto';
        }
    }

    function checkOrder() {
        const sequence = slots.map(s => {
            return s.dataset.order ? Number(s.dataset.order) : 0;
        });
        const correct = sequence.every((v, i) => v === i + 1);
        if (correct) {
            result.textContent = 'Vous avez gagné';
            result.style.color = 'green';
            result.classList.remove('hidden');
        } else {
            result.textContent = 'Vous avez perdu';
            result.style.color = 'red';
            result.classList.remove('hidden');
        }
        return correct;
    }

    // Reset: clear slots and put pieces back in initial order in palette
    function resetAll() {
        slots.forEach(s => {
            // clear background and dataset
            s.style.backgroundImage = '';
            delete s.dataset.src;
            delete s.dataset.order;
            s.innerHTML = '';
        });
        populatePalette(pieces);
        result.classList.add('hidden');
    }

    // Initialize with pieces in correct order
    populatePalette(pieces);

    shuffleBtn.addEventListener('click', () => {
        slots.forEach(s => {
            s.style.backgroundImage = '';
            delete s.dataset.src;
            delete s.dataset.order;
            s.innerHTML = '';
        });
        const shuffled = shuffle(pieces);
        populatePalette(shuffled);
        result.classList.add('hidden');
    });

    checkBtn.addEventListener('click', () => checkOrder());
    resetBtn.addEventListener('click', () => resetAll());

});