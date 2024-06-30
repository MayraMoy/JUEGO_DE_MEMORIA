const totalCards = 12;
let cards = [];
let selectedCards = [];
let valuesUsed = [];
let currentMove = 0;
let attempts = 0;

let cardTemplate = `
    <div class="card">
        <div class="inner">
            <div class="back"></div>
            <div class="face"></div>
        </div>
    </div>`;

function updateAttempts() {
    document.querySelector('.intentos').innerHTML = attempts;
}

function activate(e) {
    if (currentMove < 2) {
        let card = e.target.closest('.card');
        if (!card.classList.contains('active')) {
            card.classList.add('active');
            selectedCards.push(card);

            if (++currentMove == 2) {
                attempts++;
                updateAttempts();

                let firstCardValue = selectedCards[0].querySelector('.face').innerHTML;
                let secondCardValue = selectedCards[1].querySelector('.face').innerHTML;

                if (firstCardValue === secondCardValue) {
                    selectedCards = [];
                    currentMove = 0;
                } else {
                    setTimeout(() => {
                        selectedCards[0].classList.remove('active');
                        selectedCards[1].classList.remove('active');
                        selectedCards = [];
                        currentMove = 0;
                    }, 600);
                }
            }
        }
    }
}

function randomValue() {
    let rnd;
    do {
        rnd = Math.floor(Math.random() * (totalCards / 2)) + 1;
    } while (valuesUsed.filter(value => value === rnd).length >= 2);
    valuesUsed.push(rnd);
    return rnd;
}

for (let i = 0; i < totalCards; i++) {
    let div = document.createElement('div');
    div.innerHTML = cardTemplate;
    cards.push(div);
    document.querySelector('#game').append(cards[i]);

    let value = randomValue();
    cards[i].querySelector('.face').innerHTML = value;
    cards[i].addEventListener('click', activate);
}
