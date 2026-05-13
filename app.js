const results = document.getElementById("results")
const deck = document.getElementById("deck")

let deckCards = []

// KAARTEN ZOEKEN (Scryfall API)
async function searchCards(){
  const q = document.getElementById("searchInput").value

  if(!q) return

  const res = await fetch(`https://api.scryfall.com/cards/search?q=${q}`)
  const data = await res.json()

  results.innerHTML = ""

  if(!data.data) return

  data.data.slice(0,20).forEach(card => {

    if(!card.image_uris) return

    const div = document.createElement("div")
    div.className = "card"

    div.innerHTML = `
      <img src="${card.image_uris.small}">
      <button onclick='addToDeck(${JSON.stringify(card)})'>+</button>
    `

    results.appendChild(div)
  })
}


// DECK
function addToDeck(card){
  deckCards.push(card)
  renderDeck()
}

function renderDeck(){
  deck.innerHTML = ""

  deckCards.forEach(card => {

    if(!card.image_uris) return

    const div = document.createElement("div")
    div.className = "card"

    div.innerHTML = `
      <img src="${card.image_uris.small}">
      <button onclick='playCard(${JSON.stringify(card)},1)'>P1</button>
      <button onclick='playCard(${JSON.stringify(card)},2)'>P2</button>
    `

    deck.appendChild(div)
  })
}


// BATTLEFIELD
function playCard(card, player){

  const board = document.getElementById(`board${player}`)

  const div = document.createElement("div")
  div.className = "card"

  div.innerHTML = `
    <img src="${card.image_uris.small}">
  `

  board.appendChild(div)
}


// LIFE SYSTEM
function changeLife(player, amount){

  const el = document.getElementById(`life${player}`)
  el.innerText = Number(el.innerText) + amount
}
