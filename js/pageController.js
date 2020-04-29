downArrow();

function downArrow() {
    let downArrow = document.querySelector('.welcome-down-arrow');

    downArrow.addEventListener('click', (e) => {
        let block = document.querySelector('.first-sec');
        block.scrollIntoView({behavior:'smooth'})

    });
}

// wow.js animations

new WOW().init();