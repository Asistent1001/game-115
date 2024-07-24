// // const makeText = (text) => {
// //     console.log(text)
// // }


// // let deck = []

// // let fieldDeck = []

// // class Card {
// //     constructor(suit, value) {
// //         this.suit = suit
// //         this.value = value
// //     }
// // }

// // for (let i = 0; i < 9; i++) {
// //     deck[i] = new Card(0, i + 6)
// // }

// // for (let i = 9; i < 18; i++) {
// //     deck[i] = new Card(1, i - 3)
// // }

// // for (let i = 18; i < 27; i++) {
// //     deck[i] = new Card(2, i - 12)
// // }

// // for (let i = 27; i < 36; i++) {
// //     deck[i] = new Card(3, i - 21)
// // }

// // // создаю пустий масів куда впишуться всі перемішані карти
// // let mixDeck = []
// // // функція яка перемішує колоду
// // function shuffleDeck(deck) {
// //     // хер знає як то робить, главноє робить
// //     for (let i = deck.length - 1; i > 0; i--) {
// //         const j = Math.floor(Math.random() * (i + 1));
// //         [deck[i], deck[j]] = [deck[j], deck[i]];
// //     }
// //     return deck;
// // }
// // // присваює помішану колоду в перемінну
// // mixDeck = shuffleDeck(deck)



// // // Ваша карта для сравнения
// // const cardToCompare = { suit: 2, value: 9 };

// // // Ваш массив карт
// // const arrayOfCards = [
// //     { suit: 3, value: 12 },
// //     { suit: 0, value: 7 },
// //     { suit: 1, value: 12 },
// //     { suit: 3, value: 6 },
// //     { suit: 1, value: 12 }
// // ];

// // // Функция для проверки совпадения
// // function checkForMatch(card) {
// //     return card.suit === cardToCompare.suit || card.value === cardToCompare.value || card.value === 11;
// // }

// // // Поиск совпадения в массиве карт
// // const hasMatch = arrayOfCards.some(checkForMatch);

// // console.log(hasMatch); // Выводим результат в консоль


// class Card {
//     constructor(suit, value) {
//         this.suit = suit;
//         this.value = value;
//     }
// }

// function calculateScores(cards) {
//     let Scores = 0;

//     for (const card of cards) {
//         if (card.value === 10 || card.value === 12 || card.value === 13) {
//             Scores += 10;
//         } else if (card.value === 14) {
//             Scores += 15;
//         } else if (card.value === 11) {
//             if (card.suit === 1) {
//                 Scores += 40;
//             } else {
//                 Scores += 20;
//             }
//         }
//     }

//     return Scores;
// }

// // Пример массива карт
// const cards = [
//     new Card(3, 9),
//     new Card(3, 14),
//     new Card(3, 6), new Card(3, 6), new Card(3, 6), new Card(1, 11), new Card(3, 6),
//     new Card(2, 11)
// ];

// const totalScores = calculateScores(cards);
// console.log("Total Scores:", totalScores);

const cards = [{ value: 10, suit: 'hearts' }, { value: 11, suit: 'diamonds' }, { value: 12, suit: 'clubs' }];

for (const card of cards) {
    console.log(card);
}