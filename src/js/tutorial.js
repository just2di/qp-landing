export function initTutorial() {
    const tutorials = document.querySelectorAll('.tutorial');

    if (!tutorials.length) {
        return;
    }

    // Track currently opened tutorial element; respect any pre-opened in markup
    let openedTutorial = Array.from(tutorials).find(t => t.classList.contains('is-open')) || null;

    // Normalize initial state only if there is a pre-opened item
    if (openedTutorial) {
        for (const t of tutorials) {
            const tx = t.querySelector('.tutorial__text');
            if (!tx) continue;

            if (t === openedTutorial) {
                // Ensure correct height for opened item
                tx.style.maxHeight = `${tx.scrollHeight}px`;
            } else {
                // Close others
                t.classList.remove('is-open');
                tx.style.maxHeight = '0px';
            }
        }
    }

    for (const tutorial of tutorials) {
        const text = tutorial.querySelector('.tutorial__text');

        // Ensure we have an element to animate
        if (!text) continue;

        tutorial.addEventListener('click', () => {
            const wasOpen = tutorial.classList.contains('is-open');

            // If another tutorial is open and it's not this one, close it
            if (openedTutorial && openedTutorial !== tutorial) {
                openedTutorial.classList.remove('is-open');
                const prevText = openedTutorial.querySelector('.tutorial__text');
                if (prevText) prevText.style.maxHeight = '0px';
            }

            // Toggle current tutorial
            if (wasOpen) {
                // Close currentopenedTutorial && openedTutorial
                tutorial.classList.remove('is-open');
                text.style.maxHeight = '0px';
                openedTutorial = null;
            } else {
                // Open current
                tutorial.classList.add('is-open');
                text.style.maxHeight = `${text.scrollHeight}px`;
                openedTutorial = tutorial;
            }
        });
    }
}