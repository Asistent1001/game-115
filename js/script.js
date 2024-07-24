const makeText = (text) => {
    console.log(text)
}

let countEndJack = 0

function showRules() {
    document.getElementById("modalStart").style.display = "block"
    document.getElementById("rulesList").style.display = "block"
    document.getElementById("startButtons").style.display = "none"

}

function closeModal() {
    document.getElementById("startButtons").style.display = "flex"
    document.getElementById("modalStart").style.display = "none"
    document.getElementById("rulesList").style.display = "none"
}

function selectedSuitJack() {
    let select = document.getElementById('select')
    let suitIcon = document.getElementById('suitIcon')

    let selectedValue = select.value
    
    switch (selectedValue) {
        case '0':
            suitIcon.innerHTML = '&#9829;'
            break;
        case '1':
            suitIcon.innerHTML = '&#9830;'
            break;
        case '2':
            suitIcon.innerHTML = '&#9824;'
            break;
        case '3':
            suitIcon.innerHTML = '&#9827;'
            break;
        default:
            suitIcon.innerHTML = ''
    }
}

function countEndJackFn() {
    if (fieldDeck[fieldDeck.length - 1].value === 11 && fieldDeck[fieldDeck.length - 1].suit === 1) {
        countEndJack += 2
    } else if (fieldDeck[fieldDeck.length - 1].value === 11) {
        countEndJack += 1
    }
}

let whoseTurnIs = true

function idBreaker(x) {
    let cardSuit = x % 10
    let cardValue = Math.floor(x / 10)
    return new Card(cardSuit, cardValue)
}

function createOriginalIds() {
    let myHandCards = document.querySelectorAll('#myHand .card')

    let enHandCards = document.querySelectorAll('#enHand .card')

    myHandCards.forEach(function(card) {
        card.dataset.originalId = card.id;
    })

    enHandCards.forEach(function(card) {
        card.dataset.originalId = card.id;
    })
}

function showSuitChoosing() {
    document.getElementById("suitChoosing").style.display = "flex"
}

function canIPutCardsStart() {
    let lastCard = fieldDeck[fieldDeck.length - 1]
    if (lastCard.value === 6 || lastCard.value === 8 || lastCard.value === 14) {
        isFirstCard = true
        canTakeCard = true
    } else {
        buttonEnableTurn()
    }
}

function swapCardsBack() {
    const myHandBack = document.getElementById('myHand')
    const enHandBack = document.getElementById('enHand')

    const myCardsBack = myHandBack.getElementsByClassName('card')
    const enCardsBack = enHandBack.getElementsByClassName('card')

    if (whoseTurnIs === true) {
        for (let i = 0; i < enCardsBack.length; i++) {
            enCardsBack[i].id = 'cardBackUrl'
        }
        for (let i = 0; i < myCardsBack.length; i++) {
            myCardsBack[i].id = myCardsBack[i].getAttribute('data-original-id')
        }
    } else {
        for (let i = 0; i < myCardsBack.length; i++) {
            myCardsBack[i].id = 'cardBackUrl'
        }
        for (let i = 0; i < enCardsBack.length; i++) {
            enCardsBack[i].id = enCardsBack[i].getAttribute('data-original-id')
        }
    }
}

function clearAll() {
    canTakeCard = false
    cleanFunctionCardsOfSeven()
    cardsToDrawSeven = 0
    document.getElementById("whooseTurn").style.display = "none"
    whoseTurnIs = true
    countEndJack = 0
    document.getElementById("enHand").innerHTML = ""
    document.getElementById("myHand").innerHTML = ""
    document.getElementById("field").innerHTML = ""
    fieldDeck = []
    document.getElementById("suitChoosing").style.display = "none"
}


let myScores = 0

function calculateMyScores(cards) {

    for (const card of cards) {
        if (card.value === 10 || card.value === 12 || card.value === 13) {
            myScores += 10;
        } else if (card.value === 14) {
            myScores += 15;
        } else if (card.value === 11) {
            if (card.suit === 1) {
                myScores += 40;
            } else {
                myScores += 20;
            }
        }
    }

    return myScores;
}

let enScores = 0

function calculateEnScores(cards) {

    for (const card of cards) {
        if (card.value === 10 || card.value === 12 || card.value === 13) {
            enScores += 10;
        } else if (card.value === 14) {
            enScores += 15;
        } else if (card.value === 11) {
            if (card.suit === 1) {
                enScores += 40;
            } else {
                enScores += 20;
            }
        }
    }

    return enScores;
}

function functionCardsToDrawSeven() {
    cardsToDrawSeven += 2
}

function functionCardsOfSeven() {
    cardsOfSeven += 1
}

function cleanFunctionCardsOfSeven() {
    cardsOfSeven = 0
    cardsToDrawSeven = 0
}

function functionOfEightEnemy() {
    if (mixDeck.length < cardsToDrawEight) {
        cleanAfterJack(fieldDeck)
        let mixDeckTemp = fieldDeck.splice(0, (fieldDeck.length - 1))
        function shuffleDeck(deck) {
            for (let i = deck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [deck[i], deck[j]] = [deck[j], deck[i]]
            }
            return deck
        }
        mixDeck = mixDeck.concat(shuffleDeck(mixDeckTemp))
        if (mixDeck.length < cardsToDrawEight) {
            cardsToDrawEight = mixDeck.length
        }
    } else {

    }
    if (cardsToDrawEight > 0) {
        enCards.push(...mixDeck.splice(0, 1))
        let card = document.createElement('div')
        card.className = 'card'
        card.setAttribute('id', "card" + enCards[enCards.length - 1].value + enCards[enCards.length - 1].suit)
        card.setAttribute("onclick", "putEnCard(" + enCards[enCards.length - 1].value + enCards[enCards.length - 1].suit + ")")
        document.getElementById('enHand').appendChild(card)
        card.dataset.originalId = card.id
    }
    cardsToDrawEight = 0
}
function functionOfEightMy() {
    if (mixDeck.length < cardsToDrawEight) {
        cleanAfterJack(fieldDeck)
        let mixDeckTemp = fieldDeck.splice(0, (fieldDeck.length - 1))
        function shuffleDeck(deck) {
            for (let i = deck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [deck[i], deck[j]] = [deck[j], deck[i]]
            }
            return deck
        }
        mixDeck = mixDeck.concat(shuffleDeck(mixDeckTemp))
        if (mixDeck.length < cardsToDrawEight) {
            cardsToDrawEight = mixDeck.length
        }
    } else {

    }
    if (cardsToDrawEight > 0) {
        myCards.push(...mixDeck.splice(0, 1))
        let card = document.createElement('div')
        card.className = 'card'
        card.setAttribute('id', "card" + myCards[myCards.length - 1].value + myCards[myCards.length - 1].suit)
        card.setAttribute("onclick", "putMyCard(" + myCards[myCards.length - 1].value + myCards[myCards.length - 1].suit + ")")
        document.getElementById('myHand').appendChild(card)
        card.dataset.originalId = card.id
    }
    cardsToDrawEight = 0
}

function canTakeCardIs() {
    canTakeCard = false
}

function cleanAfterJack(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].hasOwnProperty("defSuit")) {
            array[i].suit = array[i].defSuit
            delete array[i].defSuit
        }
    }
    return array
}

let selectedNextSuit
function saveYourChoice() {
    selectedNextSuit = document.getElementById("select").value
    selectedNextSuit = Number(selectedNextSuit)
    fieldDeck[fieldDeck.length - 1].defSuit = fieldDeck[fieldDeck.length - 1].suit
    fieldDeck[fieldDeck.length - 1].suit = selectedNextSuit
    document.getElementById("suitChoosing").style.display = "none"
    buttonEnableTurn()
    selectedSuitJack()
}

let fieldDeck = []

let deck = []

class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
    }
}

function generateStartCards() {
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
}

// создаю пустий масів куда впишуться всі перемішані карти
let mixDeck = []
// функція яка перемішує колоду

function shuffleStartCards() {
    function shuffleDeck(deck) {
        // хер знає як то робить, главноє робить
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]]
        }
        return deck
    }
    // присваює помішану колоду в перемінну
    mixDeck = shuffleDeck(deck)
}

let enCards
// функція для роздачі карт в руку соперніка
function cardsForEnHand() {
    // вибираю нужний дів
    let clearHand = document.getElementById('enHand')
    // очищаю дів от лишнього (на всякий случай)
    clearHand.innerHTML = ""
    // вибираю 5 карт з колоди і вставляю в в свої карти
    enCards = mixDeck.splice(0, 5)
    let i
    // функція яка бере 5 карт і вписує іх в дів
    for (i = 0; i < (enCards.length); i++) {
        // ця частина для вставки послідньої карти в отбой (начало начал)
        if (enScores > myScores) {
            whoseTurnIs = false
            if (i === 4/*enScores > myScores && i === 4*/) {
                // создаю новий дів для карти
                let card = document.createElement('div')
                // даю йому новий класс
                card.className = 'card'
                // даю йому айді на основі пари сили карти і її масті з "моїх карт"
                card.setAttribute('id', "card" + enCards[i].value + enCards[i].suit)
                // вставляю дів на місто
                document.getElementById('field').appendChild(card)
                // вирізаю карту із "моїх карт" і вставляю в "отбой" 
                fieldDeck.push(enCards.pop())
                // ця частина для остальних 4 карт які пуйдуть в руку
            } else {
                // создаю новий дів для карт
                let card = document.createElement('div')
                // прописую карті класс
                card.className = 'card'
                // даю айді на основі пари сили карти і її масті з "моїх карт"
                card.setAttribute('id', "card" + enCards[i].value + enCards[i].suit)
                // даю атрибут ONCLICK на тій же основі
                card.setAttribute("onclick", "putEnCard(" + enCards[i].value + enCards[i].suit + ")")
                // вставляю карту на місто
                document.getElementById('enHand').appendChild(card)
            }
        } else {
            // создаю новий дів для карт
            let card = document.createElement('div')
            // прописую карті класс
            card.className = 'card'
            // даю айді на основі пари сили карти і її масті з "моїх карт"
            card.setAttribute('id', "card" + enCards[i].value + enCards[i].suit)
            // даю атрибут ONCLICK на тій же основі
            card.setAttribute("onclick", "putEnCard(" + enCards[i].value + enCards[i].suit + ")")
            // вставляю карту на місто
            document.getElementById('enHand').appendChild(card)
        }
    }

}

let myCards
// функція для роздачі карт в мою руку
function cardsForMyHand() {
    // вибираю нужний дів
    let clearHand = document.getElementById('myHand')
    // очищаю дів от лишнього (на всякий случай)
    clearHand.innerHTML = ""
    // вибираю 5 карт з колоди і вставляю в в свої карти
    myCards = mixDeck.splice(0, 5)
    let i
    // функція яка бере 5 карт і вписує іх в дів
    for (i = 0; i < (myCards.length); i++) {
        // ця частина для вставки послідньої карти в отбой (начало начал)
        if (myScores > enScores || myScores === enScores) {
            if (i === 4/*myScores > enScores && i === 44*/) {
                // создаю новий дів для карти
                let card = document.createElement('div')
                // даю йому новий класс
                card.className = 'card'
                // даю йому айді на основі пари сили карти і її масті з "моїх карт"
                card.setAttribute('id', "card" + myCards[i].value + myCards[i].suit)
                // вставляю дів на місто
                document.getElementById('field').appendChild(card)
                // вирізаю карту із "моїх карт" і вставляю в "отбой" 
                fieldDeck.push(myCards.pop())
                // ця частина для остальних 4 карт які пуйдуть в руку
            } else {
                // создаю новий дів для карт
                let card = document.createElement('div')
                // прописую карті класс
                card.className = 'card'
                // даю айді на основі пари сили карти і її масті з "моїх карт"
                card.setAttribute('id', "card" + myCards[i].value + myCards[i].suit)
                // даю атрибут ONCLICK на тій же основі
                card.setAttribute("onclick", "putMyCard(" + myCards[i].value + myCards[i].suit + ")")
                // вставляю карту на місто
                document.getElementById('myHand').appendChild(card)
            }
        } else {
            // создаю новий дів для карт
            let card = document.createElement('div')
            // прописую карті класс
            card.className = 'card'
            // даю айді на основі пари сили карти і її масті з "моїх карт"
            card.setAttribute('id', "card" + myCards[i].value + myCards[i].suit)
            // даю атрибут ONCLICK на тій же основі
            card.setAttribute("onclick", "putMyCard(" + myCards[i].value + myCards[i].suit + ")")
            // вставляю карту на місто
            document.getElementById('myHand').appendChild(card)
        }

    }
}
let canTakeCard = false
let myNewCard
let enNewCard

// функція для взяття карти із колоди
const getMoreCards = () => {
    if (canTakeCard === true) {
        // частина де я забороняю брати карти
        if (mixDeck.length === 0) {
            cleanAfterJack(fieldDeck)
            // якшо карт 0 то і не можна брати
            mixDeck = fieldDeck.splice(0, (fieldDeck.length - 1))
            function shuffleDeck(deck) {
                // хер знає як то робить, главноє робить
                for (let i = deck.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [deck[i], deck[j]] = [deck[j], deck[i]]
                }
                return deck
            }
            // присваює помішану колоду в перемінну
            mixDeck = shuffleDeck(mixDeck)
        } else if (whoseTurnIs === true) {
            // вирізаю послідню карту з колоди
            myNewCard = mixDeck.splice((mixDeck.length - 1), 1)[0]
            // добавляю вирізану карту в массив колоди
            myCards[myCards.length] = myNewCard
            // создаю новий дів для карти
            let card = document.createElement('div')
            // даю йому класс
            card.className = 'card'
            // даю йому айді на основі послідньої карти
            card.setAttribute('id', "card" + myCards[(myCards.length - 1)].value + myCards[(myCards.length - 1)].suit)
            card.dataset.originalId = card.id
            
            // даю йому атрібут ONCLICK на основі послідньої карти
            card.setAttribute("onclick", "putMyCard(" + myCards[(myCards.length - 1)].value + myCards[(myCards.length - 1)].suit + ")")
            // вставляю нову карту в дів руки
            document.getElementById('myHand').appendChild(card)

            

            if (fieldDeck[fieldDeck.length - 1].value === 6) {

            } else {
                canTakeCardIs()
                buttonEnableTurn()
            }

            if (cardsOfSeven > 0) {
                buttonTurnOff()
                canTakeCardIs()
                cardsToDrawSeven--
            }

        } else if (whoseTurnIs === false) {
            // вирізаю послідню карту з колоди
            enNewCard = mixDeck.splice((mixDeck.length - 1), 1)[0]
            // добавляю вирізану карту в массив колоди
            enCards[enCards.length] = enNewCard
            // создаю новий дів для карти
            let card = document.createElement('div')
            // даю йому класс
            card.className = 'card'
            // даю йому айді на основі послідньої карти
            card.setAttribute('id', "card" + enCards[(enCards.length - 1)].value + enCards[(enCards.length - 1)].suit)
            // даю йому атрібут ONCLICK на основі послідньої карти
            card.dataset.originalId = card.id
            card.setAttribute("onclick", "putEnCard(" + enCards[(enCards.length - 1)].value + enCards[(enCards.length - 1)].suit + ")")
            // вставляю нову карту в дів руки
            document.getElementById('enHand').appendChild(card)

            if (fieldDeck[fieldDeck.length - 1].value === 6) {

            } else {
                canTakeCardIs()
                buttonEnableTurn()
            }

            if (cardsOfSeven > 0) {
                buttonTurnOff()
                canTakeCardIs()
                cardsToDrawSeven--
            }

        } else {

        }


    } else {
        makeText("CANT")
    }
}

let isFirstCard = true
let cardsToDrawSeven = 0
let cardsOfSeven = 0
let cardsToDrawEight = 0

// функція для вставки карт з руки в отбой
function putMyCard(id) {
    let deletedCard = idBreaker(id)
    let suit = deletedCard.suit
    let value = deletedCard.value 
    // ЗАКОНЧИВ ОПИСУВАТИ ТУТ
    let cardToCompare = fieldDeck[fieldDeck.length - 1]
    if (cardsToDrawSeven > 0) {
        if (deletedCard.value === 7) {
            document.getElementById("myButtonTakeSeven").style.visibility = "hidden"
            document.getElementById("enButtonTakeSeven").style.visibility = "hidden"
            if (whoseTurnIs === true) {
                if (isFirstCard === true &&
                    (deletedCard.suit === cardToCompare.suit ||
                        deletedCard.value === cardToCompare.value)) {
                            if (fieldDeck[fieldDeck.length - 1].value !== 14) {
                                document.getElementById("suitIcon").innerHTML = " "
                            }
                    for (let i = 0; i < myCards.length; i++) {
                        if (myCards[i].suit === suit && myCards[i].value === value) {
                            fieldDeck.push(myCards.splice(i, 1)[0])
                        }
                    }
                    let selectedCard = document.getElementById('card' + id)
                    selectedCard.remove()
                    let card = document.createElement('div')
                    card.className = 'card'
                    card.setAttribute('id', "card" + id)
                    document.getElementById('field').innerHTML = " "
                    document.getElementById('field').appendChild(card)
                    isFirstCard = false
                    buttonEnableTurn()
                    functionCardsToDrawSeven()
                    functionCardsOfSeven()
                }
                else if (isFirstCard === false &&
                    deletedCard.value === cardToCompare.value) {
                    for (let i = 0; i < myCards.length; i++) {
                        if (myCards[i].suit === suit && myCards[i].value === value) {
                            fieldDeck.push(myCards.splice(i, 1)[0])
                        }
                    }
                    if (fieldDeck[fieldDeck.length - 1].value !== 14) {
                        document.getElementById("suitIcon").innerHTML = " "
                    }
                    let selectedCard = document.getElementById('card' + id)
                    selectedCard.remove()
                    let card = document.createElement('div')
                    card.className = 'card'
                    card.setAttribute('id', "card" + id)
                    document.getElementById('field').innerHTML = " "
                    document.getElementById('field').appendChild(card)
                    buttonEnableTurn()
                    functionCardsToDrawSeven()
                    functionCardsOfSeven()
                }
            }
        } else {
            makeText('CANT')
        }
    } else {
        switch (deletedCard.value) {
            case 6:
                canTakeCard = true
                cleanFunctionCardsOfSeven()
                if (whoseTurnIs === true) {
                    if (isFirstCard === true &&
                        (deletedCard.suit === cardToCompare.suit ||
                            deletedCard.value === cardToCompare.value)) {

                        for (let i = 0; i < myCards.length; i++) {
                            if (myCards[i].suit === suit && myCards[i].value === value) {
                                fieldDeck.push(myCards.splice(i, 1)[0])

                            }
                        }
                        if (fieldDeck[fieldDeck.length - 1].value !== 11) {
                            document.getElementById("suitIcon").innerHTML = " "
                        }
                        let selectedCard = document.getElementById('card' + id)
                        selectedCard.remove()
                        let card = document.createElement('div')
                        card.className = 'card'
                        card.setAttribute('id', "card" + id)
                        document.getElementById('field').innerHTML = " "
                        document.getElementById('field').appendChild(card)
                        buttonTurnOff()
                    }

                } else {
                    makeText('CANT')
                }

                break
            case 7:
                if (whoseTurnIs === true) {
                    if (isFirstCard === true &&
                        (deletedCard.suit === cardToCompare.suit ||
                            deletedCard.value === cardToCompare.value)) {

                        for (let i = 0; i < myCards.length; i++) {
                            if (myCards[i].suit === suit && myCards[i].value === value) {
                                fieldDeck.push(myCards.splice(i, 1)[0])

                            }
                        }
                        if (fieldDeck[fieldDeck.length - 1].value !== 11) {
                            document.getElementById("suitIcon").innerHTML = " "
                        }
                        let selectedCard = document.getElementById('card' + id)
                        selectedCard.remove()
                        let card = document.createElement('div')
                        card.className = 'card'
                        card.setAttribute('id', "card" + id)
                        document.getElementById('field').innerHTML = " "
                        document.getElementById('field').appendChild(card)
                        isFirstCard = false
                        buttonEnableTurn()
                        functionCardsToDrawSeven()
                        functionCardsOfSeven()
                        canTakeCardIs()
                    }
                    else if (isFirstCard === false &&
                        deletedCard.value === cardToCompare.value) {
                        for (let i = 0; i < myCards.length; i++) {
                            if (myCards[i].suit === suit && myCards[i].value === value) {
                                fieldDeck.push(myCards.splice(i, 1)[0])

                            }
                        }
                        if (fieldDeck[fieldDeck.length - 1].value !== 11) {
                            document.getElementById("suitIcon").innerHTML = " "
                        }
                        let selectedCard = document.getElementById('card' + id)
                        selectedCard.remove()
                        let card = document.createElement('div')
                        card.className = 'card'
                        card.setAttribute('id', "card" + id)
                        document.getElementById('field').innerHTML = " "
                        document.getElementById('field').appendChild(card)
                        buttonEnableTurn()
                        functionCardsToDrawSeven()
                        functionCardsOfSeven()
                        canTakeCardIs()
                    }
                } else {
                    makeText('CANT')
                }

                break
            case 8:
                cleanFunctionCardsOfSeven()
                if (whoseTurnIs === true) {
                    if (isFirstCard === true &&
                        (deletedCard.suit === cardToCompare.suit ||
                            deletedCard.value === cardToCompare.value)) {

                        for (let i = 0; i < myCards.length; i++) {
                            if (myCards[i].suit === suit && myCards[i].value === value) {
                                fieldDeck.push(myCards.splice(i, 1)[0])

                            }
                        }
                        if (fieldDeck[fieldDeck.length - 1].value !== 11) {
                            document.getElementById("suitIcon").innerHTML = " "
                        }
                        let selectedCard = document.getElementById('card' + id)
                        selectedCard.remove()
                        let card = document.createElement('div')
                        card.className = 'card'
                        card.setAttribute('id', "card" + id)
                        document.getElementById('field').innerHTML = " "
                        document.getElementById('field').appendChild(card)
                        cardsToDrawEight = 1
                        functionOfEightEnemy()
                        canTakeCard = true
                        buttonTurnOff()
                    }

                } else {
                    makeText('CANT')
                }

                break
            case 9:
                cleanFunctionCardsOfSeven()
                if (whoseTurnIs === true) {
                    if (isFirstCard === true &&
                        (deletedCard.suit === cardToCompare.suit ||
                            deletedCard.value === cardToCompare.value)) {

                        for (let i = 0; i < myCards.length; i++) {
                            if (myCards[i].suit === suit && myCards[i].value === value) {
                                fieldDeck.push(myCards.splice(i, 1)[0])

                            }
                        }
                        if (fieldDeck[fieldDeck.length - 1].value !== 11) {
                            document.getElementById("suitIcon").innerHTML = " "
                        }
                        let selectedCard = document.getElementById('card' + id)
                        selectedCard.remove()
                        let card = document.createElement('div')
                        card.className = 'card'
                        card.setAttribute('id', "card" + id)
                        document.getElementById('field').innerHTML = " "
                        document.getElementById('field').appendChild(card)
                        isFirstCard = false
                        buttonEnableTurn()
                        canTakeCardIs()
                    }
                    else if (isFirstCard === false &&
                        deletedCard.value === cardToCompare.value) {
                        for (let i = 0; i < myCards.length; i++) {
                            if (myCards[i].suit === suit && myCards[i].value === value) {
                                fieldDeck.push(myCards.splice(i, 1)[0])

                            }
                        }
                        if (fieldDeck[fieldDeck.length - 1].value !== 11) {
                            document.getElementById("suitIcon").innerHTML = " "
                        }
                        let selectedCard = document.getElementById('card' + id)
                        selectedCard.remove()
                        let card = document.createElement('div')
                        card.className = 'card'
                        card.setAttribute('id', "card" + id)
                        document.getElementById('field').innerHTML = " "
                        document.getElementById('field').appendChild(card)
                        buttonEnableTurn()
                        canTakeCardIs()
                    }

                } else {
                    makeText('CANT')
                }

                break
            case 10:
                cleanFunctionCardsOfSeven()
                if (whoseTurnIs === true) {
                    if (isFirstCard === true &&
                        (deletedCard.suit === cardToCompare.suit ||
                            deletedCard.value === cardToCompare.value)) {

                        for (let i = 0; i < myCards.length; i++) {
                            if (myCards[i].suit === suit && myCards[i].value === value) {
                                fieldDeck.push(myCards.splice(i, 1)[0])

                            }
                        }
                        if (fieldDeck[fieldDeck.length - 1].value !== 11) {
                            document.getElementById("suitIcon").innerHTML = " "
                        }
                        let selectedCard = document.getElementById('card' + id)
                        selectedCard.remove()
                        let card = document.createElement('div')
                        card.className = 'card'
                        card.setAttribute('id', "card" + id)
                        document.getElementById('field').innerHTML = " "
                        document.getElementById('field').appendChild(card)
                        isFirstCard = false
                        buttonEnableTurn()
                        canTakeCardIs()
                    }
                    else if (isFirstCard === false &&
                        deletedCard.value === cardToCompare.value) {
                        for (let i = 0; i < myCards.length; i++) {
                            if (myCards[i].suit === suit && myCards[i].value === value) {
                                fieldDeck.push(myCards.splice(i, 1)[0])

                            }
                        }
                        if (fieldDeck[fieldDeck.length - 1].value !== 11) {
                            document.getElementById("suitIcon").innerHTML = " "
                        }
                        let selectedCard = document.getElementById('card' + id)
                        selectedCard.remove()
                        let card = document.createElement('div')
                        card.className = 'card'
                        card.setAttribute('id', "card" + id)
                        document.getElementById('field').innerHTML = " "
                        document.getElementById('field').appendChild(card)
                        buttonEnableTurn()
                        canTakeCardIs()
                    }

                } else {
                    makeText('CANT')
                }

                break
            case 11:
                cleanFunctionCardsOfSeven()
                if (whoseTurnIs === true) {
                    if (isFirstCard === true &&
                        (deletedCard.value === 11)) {
                        for (let i = 0; i < myCards.length; i++) {
                            if (myCards[i].suit === suit && myCards[i].value === value) {
                                fieldDeck.push(myCards.splice(i, 1)[0])

                            }
                        }
                        if (fieldDeck[fieldDeck.length - 1].value !== 11) {
                            document.getElementById("suitIcon").innerHTML = " "
                        }
                        let selectedCard = document.getElementById('card' + id)
                        selectedCard.remove()
                        let card = document.createElement('div')
                        card.className = 'card'
                        card.setAttribute('id', "card" + id)
                        document.getElementById('field').innerHTML = " "
                        document.getElementById('field').appendChild(card)
                        isFirstCard = false
                        buttonTurnOff()
                        showSuitChoosing()
                        canTakeCardIs()
                    }
                    else if (isFirstCard === false &&
                        deletedCard.value === cardToCompare.value) {
                        for (let i = 0; i < myCards.length; i++) {
                            if (myCards[i].suit === suit && myCards[i].value === value) {
                                fieldDeck.push(myCards.splice(i, 1)[0])

                            }
                        }
                        if (fieldDeck[fieldDeck.length - 1].value !== 11) {
                            document.getElementById("suitIcon").innerHTML = " "
                        }
                        let selectedCard = document.getElementById('card' + id)
                        selectedCard.remove()
                        let card = document.createElement('div')
                        card.className = 'card'
                        card.setAttribute('id', "card" + id)
                        document.getElementById('field').innerHTML = " "
                        document.getElementById('field').appendChild(card)
                        buttonTurnOff()
                        showSuitChoosing()
                        canTakeCardIs()
                    }

                } else {
                    makeText('CANT')
                }

                break
            case 12:
                cleanFunctionCardsOfSeven()
                if (whoseTurnIs === true) {
                    if (isFirstCard === true &&
                        (deletedCard.suit === cardToCompare.suit ||
                            deletedCard.value === cardToCompare.value)) {

                        for (let i = 0; i < myCards.length; i++) {
                            if (myCards[i].suit === suit && myCards[i].value === value) {
                                fieldDeck.push(myCards.splice(i, 1)[0])

                            }
                        }
                        if (fieldDeck[fieldDeck.length - 1].value !== 11) {
                            document.getElementById("suitIcon").innerHTML = " "
                        }
                        let selectedCard = document.getElementById('card' + id)
                        selectedCard.remove()
                        let card = document.createElement('div')
                        card.className = 'card'
                        card.setAttribute('id', "card" + id)
                        document.getElementById('field').innerHTML = " "
                        document.getElementById('field').appendChild(card)
                        isFirstCard = false
                        buttonEnableTurn()
                        canTakeCardIs()
                    }
                    else if (isFirstCard === false &&
                        deletedCard.value === cardToCompare.value) {
                        for (let i = 0; i < myCards.length; i++) {
                            if (myCards[i].suit === suit && myCards[i].value === value) {
                                fieldDeck.push(myCards.splice(i, 1)[0])

                            }
                        }
                        if (fieldDeck[fieldDeck.length - 1].value !== 11) {
                            document.getElementById("suitIcon").innerHTML = " "
                        }
                        let selectedCard = document.getElementById('card' + id)
                        selectedCard.remove()
                        let card = document.createElement('div')
                        card.className = 'card'
                        card.setAttribute('id', "card" + id)
                        document.getElementById('field').innerHTML = " "
                        document.getElementById('field').appendChild(card)
                        buttonEnableTurn()
                        canTakeCardIs()
                    }

                } else {
                    makeText('CANT')
                }

                break
            case 13:
                cleanFunctionCardsOfSeven()
                if (whoseTurnIs === true) {
                    if (isFirstCard === true &&
                        (deletedCard.suit === cardToCompare.suit ||
                            deletedCard.value === cardToCompare.value)) {

                        for (let i = 0; i < myCards.length; i++) {
                            if (myCards[i].suit === suit && myCards[i].value === value) {
                                fieldDeck.push(myCards.splice(i, 1)[0])

                            }
                        }
                        if (fieldDeck[fieldDeck.length - 1].value !== 11) {
                            document.getElementById("suitIcon").innerHTML = " "
                        }
                        let selectedCard = document.getElementById('card' + id)
                        selectedCard.remove()
                        let card = document.createElement('div')
                        card.className = 'card'
                        card.setAttribute('id', "card" + id)
                        document.getElementById('field').innerHTML = " "
                        document.getElementById('field').appendChild(card)
                        isFirstCard = false
                        buttonEnableTurn()
                        canTakeCardIs()
                    }
                    else if (isFirstCard === false &&
                        deletedCard.value === cardToCompare.value) {
                        for (let i = 0; i < myCards.length; i++) {
                            if (myCards[i].suit === suit && myCards[i].value === value) {
                                fieldDeck.push(myCards.splice(i, 1)[0])

                            }
                        }
                        if (fieldDeck[fieldDeck.length - 1].value !== 11) {
                            document.getElementById("suitIcon").innerHTML = " "
                        }
                        let selectedCard = document.getElementById('card' + id)
                        selectedCard.remove()
                        let card = document.createElement('div')
                        card.className = 'card'
                        card.setAttribute('id', "card" + id)
                        document.getElementById('field').innerHTML = " "
                        document.getElementById('field').appendChild(card)
                        buttonEnableTurn()
                        canTakeCardIs()
                    }

                } else {
                    makeText('CANT')
                }

                break
            case 14:
                cleanFunctionCardsOfSeven()
                if (whoseTurnIs === true) {
                    if (isFirstCard === true &&
                        (deletedCard.suit === cardToCompare.suit ||
                            deletedCard.value === cardToCompare.value)) {

                        for (let i = 0; i < myCards.length; i++) {
                            if (myCards[i].suit === suit && myCards[i].value === value) {
                                fieldDeck.push(myCards.splice(i, 1)[0])

                            }
                        }
                        if (fieldDeck[fieldDeck.length - 1].value !== 11) {
                            document.getElementById("suitIcon").innerHTML = " "
                        }
                        let selectedCard = document.getElementById('card' + id)
                        selectedCard.remove()
                        let card = document.createElement('div')
                        card.className = 'card'
                        card.setAttribute('id', "card" + id)
                        document.getElementById('field').innerHTML = " "
                        document.getElementById('field').appendChild(card)
                        canTakeCard = true
                        buttonTurnOff()
                    }

                } else {
                    makeText('CANT')
                }

                break
        }

    }

    countEndJackFn()
    // щитаєм очки коли виігрую я
    // функція дивиться кількість карт
    if (myCards.length === 0 && fieldDeck[fieldDeck.length - 1].value !== 6 && fieldDeck[fieldDeck.length - 1].value !== 7
        && fieldDeck[fieldDeck.length - 1].value !== 8 && fieldDeck[fieldDeck.length - 1].value !== 14) {
        myScores -= countEndJack * 20
        document.getElementById("myScoreValue").innerHTML = myScores
        document.getElementById("enScoreValue").innerHTML = calculateEnScores(enCards)
        if (enScores === 115 || enScores === -115) {
            enScores = 0
            setTimeout(getStarted, 3000)
        } else if (enScores > 115) {
            makeText("I'M WON")
        } else {
            setTimeout(getStarted, 3000)
        }
    }
    if (cardsOfSeven === 4) {
        enTakeSeven()
        document.getElementById("myScoreValue").innerHTML = myScores
        document.getElementById("enScoreValue").innerHTML = calculateEnScores(enCards)
        if (enScores === 115 || enScores === -115) {
            enScores = 0
            setTimeout(getStarted, 3000)
        } else if (enScores > 115) {
            makeText("I'M WON")
        } else {
            setTimeout(getStarted, 3000)
        }
    }
    swapCardsBack()
}

function putEnCard(id) {
    let deletedCard = idBreaker(id)
    let suit = deletedCard.suit
    let value = deletedCard.value

    let cardToCompare = fieldDeck[fieldDeck.length - 1]
    if (cardsToDrawSeven > 0) {
        if (deletedCard.value === 7) {
            document.getElementById("myButtonTakeSeven").style.visibility = "hidden"
            document.getElementById("enButtonTakeSeven").style.visibility = "hidden"
            if (whoseTurnIs === false) {
                if (isFirstCard === true &&
                    (deletedCard.suit === cardToCompare.suit ||
                        deletedCard.value === cardToCompare.value)) {

                    for (let i = 0; i < enCards.length; i++) {
                        if (enCards[i].suit === suit && enCards[i].value === value) {
                            fieldDeck.push(enCards.splice(i, 1)[0])

                        }
                    }
                    if (fieldDeck[fieldDeck.length - 1].value !== 14) {
                        document.getElementById("suitIcon").innerHTML = " "
                    }
                    let selectedCard = document.getElementById('card' + id)
                    selectedCard.remove()
                    let card = document.createElement('div')
                    card.className = 'card'
                    card.setAttribute('id', "card" + id)
                    document.getElementById('field').innerHTML = " "
                    document.getElementById('field').appendChild(card)
                    isFirstCard = false
                    buttonEnableTurn()
                    functionCardsToDrawSeven()
                    functionCardsOfSeven()
                }
                else if (isFirstCard === false &&
                    deletedCard.value === cardToCompare.value) {
                    for (let i = 0; i < enCards.length; i++) {
                        if (enCards[i].suit === suit && enCards[i].value === value) {
                            fieldDeck.push(enCards.splice(i, 1)[0])

                        }
                    }
                    if (fieldDeck[fieldDeck.length - 1].value !== 14) {
                        document.getElementById("suitIcon").innerHTML = " "
                    }
                    let selectedCard = document.getElementById('card' + id)
                    selectedCard.remove()
                    let card = document.createElement('div')
                    card.className = 'card'
                    card.setAttribute('id', "card" + id)
                    document.getElementById('field').innerHTML = " "
                    document.getElementById('field').appendChild(card)
                    buttonEnableTurn()
                    functionCardsToDrawSeven()
                    functionCardsOfSeven()
                }

            }
        } else {
            makeText('CANT')
        }
    } else {
        switch (deletedCard.value) {
            case 6:
                canTakeCard = true
                cleanFunctionCardsOfSeven()
                if (whoseTurnIs === false) {
                    if (isFirstCard === true &&
                        (deletedCard.suit === cardToCompare.suit ||
                            deletedCard.value === cardToCompare.value)) {

                        for (let i = 0; i < enCards.length; i++) {
                            if (enCards[i].suit === suit && enCards[i].value === value) {
                                fieldDeck.push(enCards.splice(i, 1)[0])

                            }
                        }
                        if (fieldDeck[fieldDeck.length - 1].value !== 11) {
                            document.getElementById("suitIcon").innerHTML = " "
                        }
                        let selectedCard = document.getElementById('card' + id)
                        selectedCard.remove()
                        let card = document.createElement('div')
                        card.className = 'card'
                        card.setAttribute('id', "card" + id)
                        document.getElementById('field').innerHTML = " "
                        document.getElementById('field').appendChild(card)
                        buttonTurnOff()
                    }

                } else {
                    makeText('CANT')
                }

                break
            case 7:
                if (whoseTurnIs === false) {
                    if (isFirstCard === true &&
                        (deletedCard.suit === cardToCompare.suit ||
                            deletedCard.value === cardToCompare.value)) {

                        for (let i = 0; i < enCards.length; i++) {
                            if (enCards[i].suit === suit && enCards[i].value === value) {
                                fieldDeck.push(enCards.splice(i, 1)[0])

                            }
                        }
                        if (fieldDeck[fieldDeck.length - 1].value !== 11) {
                            document.getElementById("suitIcon").innerHTML = " "
                        }
                        let selectedCard = document.getElementById('card' + id)
                        selectedCard.remove()
                        let card = document.createElement('div')
                        card.className = 'card'
                        card.setAttribute('id', "card" + id)
                        document.getElementById('field').innerHTML = " "
                        document.getElementById('field').appendChild(card)
                        isFirstCard = false
                        buttonEnableTurn()
                        functionCardsToDrawSeven()
                        functionCardsOfSeven()
                        canTakeCardIs()
                    }
                    else if (isFirstCard === false &&
                        deletedCard.value === cardToCompare.value) {
                        for (let i = 0; i < enCards.length; i++) {
                            if (enCards[i].suit === suit && enCards[i].value === value) {
                                fieldDeck.push(enCards.splice(i, 1)[0])

                            }
                        }
                        if (fieldDeck[fieldDeck.length - 1].value !== 11) {
                            document.getElementById("suitIcon").innerHTML = " "
                        }
                        let selectedCard = document.getElementById('card' + id)
                        selectedCard.remove()
                        let card = document.createElement('div')
                        card.className = 'card'
                        card.setAttribute('id', "card" + id)
                        document.getElementById('field').innerHTML = " "
                        document.getElementById('field').appendChild(card)
                        buttonEnableTurn()
                        functionCardsToDrawSeven()
                        functionCardsOfSeven()
                        canTakeCardIs()
                    }
                } else {
                    makeText('CANT')
                }


                break
            case 8:
                cleanFunctionCardsOfSeven()
                if (whoseTurnIs === false) {
                    if (isFirstCard === true &&
                        (deletedCard.suit === cardToCompare.suit ||
                            deletedCard.value === cardToCompare.value)) {

                        for (let i = 0; i < enCards.length; i++) {
                            if (enCards[i].suit === suit && enCards[i].value === value) {
                                fieldDeck.push(enCards.splice(i, 1)[0])

                            }
                        }
                        if (fieldDeck[fieldDeck.length - 1].value !== 11) {
                            document.getElementById("suitIcon").innerHTML = " "
                        }
                        let selectedCard = document.getElementById('card' + id)
                        selectedCard.remove()
                        let card = document.createElement('div')
                        card.className = 'card'
                        card.setAttribute('id', "card" + id)
                        document.getElementById('field').innerHTML = " "
                        document.getElementById('field').appendChild(card)
                        cardsToDrawEight = 1
                        functionOfEightMy()
                        canTakeCard = true
                        buttonTurnOff()
                    }

                } else {
                    makeText('CANT')
                }

                break
            case 9:
                cleanFunctionCardsOfSeven()
                if (whoseTurnIs === false) {
                    if (isFirstCard === true &&
                        (deletedCard.suit === cardToCompare.suit ||
                            deletedCard.value === cardToCompare.value)) {

                        for (let i = 0; i < enCards.length; i++) {
                            if (enCards[i].suit === suit && enCards[i].value === value) {
                                fieldDeck.push(enCards.splice(i, 1)[0])

                            }
                        }
                        if (fieldDeck[fieldDeck.length - 1].value !== 11) {
                            document.getElementById("suitIcon").innerHTML = " "
                        }
                        let selectedCard = document.getElementById('card' + id)
                        selectedCard.remove()
                        let card = document.createElement('div')
                        card.className = 'card'
                        card.setAttribute('id', "card" + id)
                        document.getElementById('field').innerHTML = " "
                        document.getElementById('field').appendChild(card)
                        isFirstCard = false
                        buttonEnableTurn()
                        canTakeCardIs()
                    }
                    else if (isFirstCard === false &&
                        deletedCard.value === cardToCompare.value) {
                        for (let i = 0; i < enCards.length; i++) {
                            if (enCards[i].suit === suit && enCards[i].value === value) {
                                fieldDeck.push(enCards.splice(i, 1)[0])

                            }
                        }
                        if (fieldDeck[fieldDeck.length - 1].value !== 11) {
                            document.getElementById("suitIcon").innerHTML = " "
                        }
                        let selectedCard = document.getElementById('card' + id)
                        selectedCard.remove()
                        let card = document.createElement('div')
                        card.className = 'card'
                        card.setAttribute('id', "card" + id)
                        document.getElementById('field').innerHTML = " "
                        document.getElementById('field').appendChild(card)
                        buttonEnableTurn()
                        canTakeCardIs()
                    }

                } else {
                    makeText('CANT')
                }

                break
            case 10:
                cleanFunctionCardsOfSeven()
                if (whoseTurnIs === false) {
                    if (isFirstCard === true &&
                        (deletedCard.suit === cardToCompare.suit ||
                            deletedCard.value === cardToCompare.value)) {

                        for (let i = 0; i < enCards.length; i++) {
                            if (enCards[i].suit === suit && enCards[i].value === value) {
                                fieldDeck.push(enCards.splice(i, 1)[0])

                            }
                        }
                        if (fieldDeck[fieldDeck.length - 1].value !== 11) {
                            document.getElementById("suitIcon").innerHTML = " "
                        }
                        let selectedCard = document.getElementById('card' + id)
                        selectedCard.remove()
                        let card = document.createElement('div')
                        card.className = 'card'
                        card.setAttribute('id', "card" + id)
                        document.getElementById('field').innerHTML = " "
                        document.getElementById('field').appendChild(card)
                        isFirstCard = false
                        buttonEnableTurn()
                        canTakeCardIs()
                    }
                    else if (isFirstCard === false &&
                        deletedCard.value === cardToCompare.value) {
                        for (let i = 0; i < enCards.length; i++) {
                            if (enCards[i].suit === suit && enCards[i].value === value) {
                                fieldDeck.push(enCards.splice(i, 1)[0])

                            }
                        }
                        if (fieldDeck[fieldDeck.length - 1].value !== 11) {
                            document.getElementById("suitIcon").innerHTML = " "
                        }
                        let selectedCard = document.getElementById('card' + id)
                        selectedCard.remove()
                        let card = document.createElement('div')
                        card.className = 'card'
                        card.setAttribute('id', "card" + id)
                        document.getElementById('field').innerHTML = " "
                        document.getElementById('field').appendChild(card)
                        buttonEnableTurn()
                        canTakeCardIs()
                    }

                } else {
                    makeText('CANT')
                }

                break
            case 11:
                cleanFunctionCardsOfSeven()
                if (whoseTurnIs === false) {
                    if (isFirstCard === true &&
                        (deletedCard.value === 11)) {
                        for (let i = 0; i < enCards.length; i++) {
                            if (enCards[i].suit === suit && enCards[i].value === value) {
                                fieldDeck.push(enCards.splice(i, 1)[0])

                            }
                        }
                        if (fieldDeck[fieldDeck.length - 1].value !== 11) {
                            document.getElementById("suitIcon").innerHTML = " "
                        }
                        let selectedCard = document.getElementById('card' + id)
                        selectedCard.remove()
                        let card = document.createElement('div')
                        card.className = 'card'
                        card.setAttribute('id', "card" + id)
                        document.getElementById('field').innerHTML = " "
                        document.getElementById('field').appendChild(card)
                        isFirstCard = false
                        buttonTurnOff()
                        showSuitChoosing()
                        canTakeCardIs()
                    }
                    else if (isFirstCard === false &&
                        deletedCard.value === cardToCompare.value) {
                        for (let i = 0; i < enCards.length; i++) {
                            if (enCards[i].suit === suit && enCards[i].value === value) {
                                fieldDeck.push(enCards.splice(i, 1)[0])

                            }
                        }
                        if (fieldDeck[fieldDeck.length - 1].value !== 11) {
                            document.getElementById("suitIcon").innerHTML = " "
                        }
                        let selectedCard = document.getElementById('card' + id)
                        selectedCard.remove()
                        let card = document.createElement('div')
                        card.className = 'card'
                        card.setAttribute('id', "card" + id)
                        document.getElementById('field').innerHTML = " "
                        document.getElementById('field').appendChild(card)
                        buttonTurnOff()
                        showSuitChoosing()
                        canTakeCardIs()
                    }

                } else {
                    makeText('CANT')
                }

                break
            case 12:
                cleanFunctionCardsOfSeven()
                if (whoseTurnIs === false) {
                    if (isFirstCard === true &&
                        (deletedCard.suit === cardToCompare.suit ||
                            deletedCard.value === cardToCompare.value)) {

                        for (let i = 0; i < enCards.length; i++) {
                            if (enCards[i].suit === suit && enCards[i].value === value) {
                                fieldDeck.push(enCards.splice(i, 1)[0])

                            }
                        }
                        if (fieldDeck[fieldDeck.length - 1].value !== 11) {
                            document.getElementById("suitIcon").innerHTML = " "
                        }
                        let selectedCard = document.getElementById('card' + id)
                        selectedCard.remove()
                        let card = document.createElement('div')
                        card.className = 'card'
                        card.setAttribute('id', "card" + id)
                        document.getElementById('field').innerHTML = " "
                        document.getElementById('field').appendChild(card)
                        isFirstCard = false
                        buttonEnableTurn()
                        canTakeCardIs()
                    }
                    else if (isFirstCard === false &&
                        deletedCard.value === cardToCompare.value) {
                        for (let i = 0; i < enCards.length; i++) {
                            if (enCards[i].suit === suit && enCards[i].value === value) {
                                fieldDeck.push(enCards.splice(i, 1)[0])

                            }
                        }
                        if (fieldDeck[fieldDeck.length - 1].value !== 11) {
                            document.getElementById("suitIcon").innerHTML = " "
                        }
                        let selectedCard = document.getElementById('card' + id)
                        selectedCard.remove()
                        let card = document.createElement('div')
                        card.className = 'card'
                        card.setAttribute('id', "card" + id)
                        document.getElementById('field').innerHTML = " "
                        document.getElementById('field').appendChild(card)
                        buttonEnableTurn()
                        canTakeCardIs()
                    }

                } else {
                    makeText('CANT')
                }

                break
            case 13:
                cleanFunctionCardsOfSeven()
                if (whoseTurnIs === false) {
                    if (isFirstCard === true &&
                        (deletedCard.suit === cardToCompare.suit ||
                            deletedCard.value === cardToCompare.value)) {

                        for (let i = 0; i < enCards.length; i++) {
                            if (enCards[i].suit === suit && enCards[i].value === value) {
                                fieldDeck.push(enCards.splice(i, 1)[0])

                            }
                        }
                        if (fieldDeck[fieldDeck.length - 1].value !== 11) {
                            document.getElementById("suitIcon").innerHTML = " "
                        }
                        let selectedCard = document.getElementById('card' + id)
                        selectedCard.remove()
                        let card = document.createElement('div')
                        card.className = 'card'
                        card.setAttribute('id', "card" + id)
                        document.getElementById('field').innerHTML = " "
                        document.getElementById('field').appendChild(card)
                        isFirstCard = false
                        buttonEnableTurn()
                        canTakeCardIs()
                    }
                    else if (isFirstCard === false &&
                        deletedCard.value === cardToCompare.value) {
                        for (let i = 0; i < enCards.length; i++) {
                            if (enCards[i].suit === suit && enCards[i].value === value) {
                                fieldDeck.push(enCards.splice(i, 1)[0])

                            }
                        }
                        if (fieldDeck[fieldDeck.length - 1].value !== 11) {
                            document.getElementById("suitIcon").innerHTML = " "
                        }
                        let selectedCard = document.getElementById('card' + id)
                        selectedCard.remove()
                        let card = document.createElement('div')
                        card.className = 'card'
                        card.setAttribute('id', "card" + id)
                        document.getElementById('field').innerHTML = " "
                        document.getElementById('field').appendChild(card)
                        buttonEnableTurn()
                        canTakeCardIs()
                    }

                } else {
                    makeText('CANT')
                }

                break
            case 14:
                cleanFunctionCardsOfSeven()
                if (whoseTurnIs === false) {
                    if (isFirstCard === true &&
                        (deletedCard.suit === cardToCompare.suit ||
                            deletedCard.value === cardToCompare.value)) {

                        for (let i = 0; i < enCards.length; i++) {
                            if (enCards[i].suit === suit && enCards[i].value === value) {
                                fieldDeck.push(enCards.splice(i, 1)[0])

                            }
                        }
                        if (fieldDeck[fieldDeck.length - 1].value !== 11) {
                            document.getElementById("suitIcon").innerHTML = " "
                        }
                        let selectedCard = document.getElementById('card' + id)
                        selectedCard.remove()
                        let card = document.createElement('div')
                        card.className = 'card'
                        card.setAttribute('id', "card" + id)
                        document.getElementById('field').innerHTML = " "
                        document.getElementById('field').appendChild(card)
                        canTakeCard = true
                        buttonTurnOff()
                    }

                } else {
                    makeText('CANT')
                }

                break
        }
    }
    countEndJackFn()
    // щитаєм очки коли виігрує протівнік
    // функція дивиться кількість карт
    if (enCards.length === 0 && fieldDeck[fieldDeck.length - 1].value !== 6 && fieldDeck[fieldDeck.length - 1].value !== 7
        && fieldDeck[fieldDeck.length - 1].value !== 8 && fieldDeck[fieldDeck.length - 1].value !== 14) {
        enScores -= countEndJack * 20
        document.getElementById("enScoreValue").innerHTML = enScores
        document.getElementById("myScoreValue").innerHTML = calculateMyScores(myCards)

        if (myScores === 115 || myScores === -115) {
            myScores = 0
            setTimeout(getStarted, 3000)
        } else if (myScores > 115) {
            makeText('ENEMY WON')
        } else {
            setTimeout(getStarted, 3000)
        }

    }
    if (cardsOfSeven === 4) {
        myTakeSeven()
        document.getElementById("enScoreValue").innerHTML = enScores
        document.getElementById("myScoreValue").innerHTML = calculateMyScores(myCards)

        if (myScores === 115 || myScores === -115) {
            myScores = 0
            setTimeout(getStarted, 3000)
        } else if (myScores > 115) {
            makeText('ENEMY WON')
        } else {
            setTimeout(getStarted, 3000)
        }
    }
    swapCardsBack()
}


function toggleButton() {
    let button = document.getElementById("whooseTurn")
    if (button.style.display === "none") {
        button.style.display = "block"
    } else {
        button.style.display = "none"
    }
}

function buttonEnableTurn() {
    let button = document.getElementById("whooseTurn")
    button.style.display = "flex"
}

function buttonTurnOff() {
    let button = document.getElementById("whooseTurn")
    button.style.display = "none"
}



function switchTurn() {
    countEndJack = 0
    buttonTurnOff()
    canTakeCard = true
    whoseTurnIs = !whoseTurnIs
    isFirstCard = true
    cardsToDrawSeven = cardsOfSeven * 2
    document.getElementById("myButtonTakeSeven").style.visibility = "hidden"
    document.getElementById("enButtonTakeSeven").style.visibility = "hidden"
    if (whoseTurnIs === true && cardsToDrawSeven !== 0) {
        document.getElementById("myButtonTakeSeven").style.visibility = "visible"
    } else if (whoseTurnIs === false && cardsToDrawSeven !== 0) {
        document.getElementById("enButtonTakeSeven").style.visibility = "visible"
    } else {
    }

    swapCardsBack()
    
}



const enTakeSeven = () => {
    document.getElementById("enButtonTakeSeven").style.visibility = "hidden"
    if (mixDeck.length < cardsToDrawSeven) {
        cleanAfterJack(fieldDeck)
        let mixDeckTemp = fieldDeck.splice(0, (fieldDeck.length - 1))
        function shuffleDeck(deck) {
            for (let i = deck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [deck[i], deck[j]] = [deck[j], deck[i]]
            }
            return deck
        }
        mixDeck = mixDeck.concat(shuffleDeck(mixDeckTemp))
        if (mixDeck.length < cardsToDrawSeven) {
            cardsToDrawSeven = mixDeck.length
        }
    } else {

    }
    for (let i = 0; i < cardsToDrawSeven; i++) {
        enCards.push(...mixDeck.splice(0, 1))
        let card = document.createElement('div')
        card.className = 'card'
        card.setAttribute('id', "card" + enCards[enCards.length - 1].value + enCards[enCards.length - 1].suit)
        card.setAttribute("onclick", "putEnCard(" + enCards[enCards.length - 1].value + enCards[enCards.length - 1].suit + ")")
        card.dataset.originalId = card.id
        document.getElementById('enHand').appendChild(card)
    }
    cleanFunctionCardsOfSeven()
    canTakeCard = true
}

const myTakeSeven = () => {
    document.getElementById("myButtonTakeSeven").style.visibility = "hidden"
    if (mixDeck.length < cardsToDrawSeven) {
        cleanAfterJack(fieldDeck)
        let mixDeckTemp = fieldDeck.splice(0, (fieldDeck.length - 1))
        function shuffleDeck(deck) {
            for (let i = deck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [deck[i], deck[j]] = [deck[j], deck[i]]
            }
            return deck
        }
        mixDeck = mixDeck.concat(shuffleDeck(mixDeckTemp))
        if (mixDeck.length < cardsToDrawSeven) {
            cardsToDrawSeven = mixDeck.length
        }
    } else {

    }
    for (let i = 0; i < cardsToDrawSeven; i++) {
        myCards.push(...mixDeck.splice(0, 1))
        let card = document.createElement('div')
        card.className = 'card'
        card.setAttribute('id', "card" + myCards[myCards.length - 1].value + myCards[myCards.length - 1].suit)
        card.setAttribute("onclick", "putMyCard(" + myCards[myCards.length - 1].value + myCards[myCards.length - 1].suit + ")")
        card.dataset.originalId = card.id
        document.getElementById('myHand').appendChild(card)
    }
    cleanFunctionCardsOfSeven()
    canTakeCard = true
}

const getStarted = () => {
    clearAll()
    generateStartCards()
    shuffleStartCards()
    cardsForEnHand()
    cardsForMyHand()
    // вибираю дів стопки карт
    let getMoreCards = document.getElementById('cardBackUrl')
    // даю йому атрібут шоб можна було тикати
    getMoreCards.setAttribute("onclick", "getMoreCards()")
    getMoreCards.style.display = "flex"
    // визиваю функцію роздачі карт в руки соперніку
    // визиваю функцію роздачі карт в руки собі
    // убираю кнопку начала ігри, шоб не тикали (нема кнопки нема проблем)

    document.getElementById("hideStartButton").style.display = "none"
    document.getElementById("hideRulesButton").style.display = "none"
    document.getElementById("startButtons").style.display = "none"

    isFirstCard = false

    canIPutCardsStart()
    createOriginalIds()
    swapCardsBack()

}

function test() {
    // makeText("deck")
    // makeText(deck)
    // makeText("fieldDeck")
    // makeText(fieldDeck)
    // makeText("mixDeck")
    // makeText(mixDeck)
    // makeText("countEndJack")
    // makeText(countEndJack)
    // makeText("cardsOfSeven")
    // makeText(cardsOfSeven)
    // makeText("cardsToDrawSeven")
    // makeText(cardsToDrawSeven)

}



