
document.addEventListener("DOMContentLoaded", ()=>{
  let pageNumber = 1
const monsterContainer = document.querySelector("#monster-container")
const monsterFormContainer= document.querySelector("#create-monster")
const URL = "http://localhost:3000/monsters"

fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
  .then(r => r.json())
  .then(monsters => {
    let monsterHTML = monsters.map(monster=>{
    return `
    <div>
    <h2>${monster.name}</h2>
    <h4>${monster.age}</h4>
    <p>${monster.description}</p>
    </div>`
  })//end then
    monsterContainer.innerHTML += monsterHTML.join('')

})//end fetch
//create a monsterForm
//add a new monster
function createNewMonsterForm(){
  monsterFormContainer.innerHTML = `
    <form id="monster-form">
    <input id="name" placeholder="name...">
    <form id="monster-form">
    <input id="age" placeholder="age...">
    <form id="monster-form">
    <input id="description" placeholder="description...">
    <button id="Create">Create</button>
  `
}//end createNewMonsterForm function
createNewMonsterForm()

monsterFormContainer.addEventListener("submit", (e) => {
  e.preventDefault()
//console.log(e.target);
    newMonsterName = document.getElementById('name').value
    newMonsterAge = document.getElementById('age').value
    newMonsterDescription = document.getElementById('description').value
    //console.log(newMonsterName, newMonsterAge, newMonsterDescription);

  fetch(URL, {
    method: "POST",
    headers:{
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: newMonsterName,
      age:  newMonsterAge,
      description: newMonsterDescription
    })
  })//end of fetch
  .then( r => r.json())
  .then( newMonster => {
    let newMonsterHTML = `
    <div>
    <h2>${newMonster.name}</h2>
    <h4>${newMonster.age}</h4>
    <p>${newMonster.description}</p>
    </div>
    `

    monsterContainer.innerHTML+= newMonsterHTML
  })

})//end of eventlistener





}) //DOM Content Loaded ends here
