

document.addEventListener("DOMContentLoaded", ()=>{
  let allMonsters = []
  const monsterContainer = document.getElementById("monster-container")
  //const createForm = document.querySelector('#new-monster-form')

    let pageNumber = 1
    document.body.addEventListener ("click", (e) => {
      // <button id="back"><=</button>
      // <button id="forward">=></button>

    })







    function fetchMonsters(){
      fetch(`http://localhost:3000/monsters/?_limit=1&_page=${pageNumber}`)
      .then( function(response){
          return response.json()
      })
      .then((data) => {
        console.log(data)
        allMonsters = data
        showAllMonsters(data)

      })
    }
    const monsterFormContainer = document.getElementById('create-monster')

    function newMonsterForm(){
      monsterFormContainer.innerHTML = `
        <form id="monster-form">
          <input id="name" placeholder="name...">
          <input id="age" placeholder="age...">
          <input id="description" placeholder="description...">
          <button>Create</button></form>
      `
    }

    newMonsterForm()

    const monsterForm = document.getElementById("monster-form")
    monsterForm.addEventListener("submit", (e) => {
      const newMonsterName = document.getElementById('name').value
      const newMonsterAge = document.getElementById('age').value
      const newMonsterDescription = document.getElementById('description').value
      console.log(newMonsterName, newMonsterAge, newMonsterDescription)
      e.preventDefault()
      fetch("http://localhost:3000/monsters", {
          method: "POST",
          headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
          },
          body: JSON.stringify({
            name: newMonsterName,
            age:  newMonsterAge,
            description: newMonsterDescription
          })
      })
      .then(function(response){
        return response.json()
      })
      .then(function(monster){
        allMonsters.push(monster)
        monsterContainer.innerHTML += renderSingleMonster(monster)
      })
    })
    fetchMonsters()

    function showAllMonsters(monsters){
      monsterContainer.innerHTML = monsters.map(renderSingleMonster).join('')
    }

    function renderSingleMonster(monster){
      return `
        <div>
          <h2>${monster.name}</h2>
          <h4> Age:${monster.age}</h4>
          <p> Bio:${monster.description}</p>
    		</div>
      		`
      	}


}) //DOM Content Loaded ends here
//
