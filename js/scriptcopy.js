// функція для бистрого написання консол.лог (мені лінь було)
const makeText = (text) => {
    console.log(text)
}

function idBreaker(x) {
    let cardSuit = x % 10
    let cardValue = Math.floor(x / 10)
    return new Card(cardSuit, cardValue)
}

let deck = []

let fieldDeck = []

// конструктор класса
class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
    }
}

// функція яка создає всі карти чірви
for (let i = 0; i < 9; i++) {
    deck[i] = new Card(0, i + 6)
}

// функція яка создає всі карти буби
for (let i = 9; i < 18; i++) {
    deck[i] = new Card(1, i - 3)
}

// функція яка создає всі карти піки
for (let i = 18; i < 27; i++) {
    deck[i] = new Card(2, i - 12)
}

// функція яка создає всі карти хресті
for (let i = 27; i < 36; i++) {
    deck[i] = new Card(3, i - 21)
}

// создаю пустий масів куда впишуться всі перемішані карти
let mixDeck = []
// функція яка перемішує колоду
function shuffleDeck(deck) {
    // хер знає як то робить, главноє робить
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}
// присваює помішану колоду в перемінну
mixDeck = shuffleDeck(deck)

let enCards
// функція для роздачі карт в руку соперніка
function cardsForEnHand() {
    // вибираю нужний дів в якому буду всьо робити
    let crearHand = document.getElementById('enHand')
    // очищаю його (на всякий случай)
    crearHand.innerHTML = " "
    // вирізаю 5 карт в руку протівніка
    enCards = mixDeck.splice(0, 5)
    let i
    // функція яка создає для каждої карти дів
    for (i = 0; i < (enCards.length); i++) {
        // создаю дів для карти
        let card = document.createElement('div')
        // даю юй класс
        card.className = 'card'
        // даю айді на основі пари сили карт і її масті з "карт протівніка"
        card.setAttribute('id', "card" + enCards[i].value + enCards[i].suit)
        // вставляю карти в нужний дів
        document.getElementById('enHand').appendChild(card)
    }
}

// let myCards
// // функція для роздачі карт в мою руку
// function cardsForMyHand() {
//     // вибираю нужний дів
//     let crearHand = document.getElementById('myHand')
//     // очищаю дів от лишнього (на всякий случай)
//     crearHand.innerHTML = " "
//     // вибираю 5 карт з колоди і вставляю в в свої карти
//     myCards = mixDeck.splice(0, 5)
//     let i
//     // функція яка бере 5 карт і вписує іх в дів
//     for (i = 0; i < (myCards.length); i++) {
//         // ця частина для вставки послідньої карти в отбой (начало начал)
//         if (i === 4) {
//             // создаю новий дів для карти
//             let card = document.createElement('div')
//             // даю йому новий класс
//             card.className = 'card'
//             // даю йому айді на основі пари сили карти і її масті з "моїх карт"
//             card.setAttribute('id', "card" + myCards[i].value + myCards[i].suit)
//             // вставляю дів на місто
//             document.getElementById('field').appendChild(card)
//             // вирізаю карту із "моїх карт" і вставляю в "отбой" 
//             fieldDeck.push(myCards.pop())
//             // ця частина для остальних 4 карт які пуйдуть в руку
//         } else {
//             // создаю новий дів для карт
//             let card = document.createElement('div')
//             // прописую карті класс
//             card.className = 'card'
//             // даю айді на основі пари сили карти і її масті з "моїх карт"
//             card.setAttribute('id', "card" + myCards[i].value + myCards[i].suit)
//             // даю атрибут ONCLICK на тій же основі
//             card.setAttribute("onclick", "putCard(" + myCards[i].value + myCards[i].suit + ")")
//             // вставляю карту на місто
//             document.getElementById('myHand').appendChild(card)
//         }
//     }

// }

// let canTakeCard = true
// let myNewCard
// // функція для взяття карти із колоди
// const getMoreCards = () => {
//     if (canTakeCard === true) {
//         // частина де я забороняю брати карти
//         //canTakeCard = false
//         if (mixDeck.length === 0) {
//             // якшо карт 0 то і не можна брати
//             mixDeck = fieldDeck.splice(0, (fieldDeck.length - 1))
//         } else {
//             // вирізаю послідню карту з колоди
//             myNewCard = mixDeck.splice((mixDeck.length - 1), 1)[0]
//             // добавляю вирізану карту в массив колоди
//             myCards[myCards.length] = myNewCard
//             // создаю новий дів для карти
//             let card = document.createElement('div')
//             // даю йому класс
//             card.className = 'card'
//             // даю йому айді на основі послідньої карти
//             card.setAttribute('id', "card" + myCards[(myCards.length - 1)].value + myCards[(myCards.length - 1)].suit)
//             // даю йому атрібут ONCLICK на основі послідньої карти
//             card.setAttribute("onclick", "putCard(" + myCards[(myCards.length - 1)].value + myCards[(myCards.length - 1)].suit + ")")
//             // вставляю нову карту в дів руки
//             document.getElementById('myHand').appendChild(card)
//         }
//     } else {
//         console.log('ПАШОЛ НАХЕР')
//     }
// }



// // функція для вставки карт з руки в отбой
// function putCard(id) {
//     let deletedCard = idBreaker(id)
//     let suit = deletedCard.suit
//     let value = deletedCard.value

//     let cardToCompare = fieldDeck[fieldDeck.length - 1]

//     // makeText(cardToCompare.suit)
//     // makeText(cardToCompare.value)

//     // makeText(" ")
//     // makeText(deletedCard.suit)
//     // makeText(deletedCard.value)

//     if (cardToCompare.suit === deletedCard.suit ||
//         cardToCompare.value === deletedCard.value ||
//         deletedCard.value === 11) {
//         for (let i = 0; i < myCards.length; i++) {
//             if (myCards[i].suit === suit && myCards[i].value === value) {
//                 fieldDeck.push(myCards.splice(i, 1)[0]);
//                 i--;
//             }
//         }

//         let selectedCard = document.getElementById('card' + id)
//         selectedCard.remove()
//         let card = document.createElement('div')
//         card.className = 'card'
//         card.setAttribute('id', "card" + id)
//         document.getElementById('field').innerHTML = " "
//         document.getElementById('field').appendChild(card)

//     } else {
//         makeText('НЕМОЖУ')
//     }
// }



// функція для начала ігри. роздаєм карти всі діла
const getStarted = () => {
    // вибираю дів стопки карт
    let getMoreCards = document.getElementById('cardBackUrl')
    // даю йому атрібут шоб можна було тикати
    getMoreCards.setAttribute("onclick", "getMoreCards()")
    // визиваю функцію роздачі карт в руки соперніку
    cardsForEnHand()
    // визиваю функцію роздачі карт в руки собі
    cardsForMyHand()
    // убираю кнопку начала ігри, шоб не тикали (нема кнопки нема проблем)
    document.getElementById('hideStartButton').style.visibility = 'hidden'

}










// function test() {

//     makeText('ВИСТАВЛЕНІ КАРТИ')
//     makeText(fieldDeck)

//     makeText("СТОПКА КАРТ")
//     makeText(mixDeck)

//     makeText('МОЇ КАРТИ')
//     makeText(myCards)

//     // makeText('КАРТИ ЯКІ ВЗЯВ')
//     // makeText(myNewCard)

// }


