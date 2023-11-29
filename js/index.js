
let pageCount = 1

const monsterContainer = document.getElementById("monster-container")
const formDiv = document.getElementById("create-monster")
const createMonsterForm = document.createElement("form")

const buttonForward = document.getElementById("forward")
const buttonBackward = document.getElementById("back")
///////////////////////////////

buildMonsterForm()
getFetch()
.then(resData => loadPage(resData,pageCount))

///////////////////////////////
function buildMonsterForm(){
    buildInputs = ["name", "age", "description"]
    buildInputs.forEach(input => { 
        const newInput = document.createElement("input")
        newInput.type = "text"
        newInput.id = `${input}-input`
        newInput.name = `${input}`
        newInput.placeholder = input
        createMonsterForm.appendChild(newInput)
    })
    const submitMonster = document.createElement("button")
    submitMonster.textContent = "Submit"
    createMonsterForm.appendChild(submitMonster)
    formDiv.appendChild(createMonsterForm)
    return createMonsterForm
}

function loadPage(resData,pageNumber){
    const maxCount = pageNumber * 50
    const minCount = maxCount - 50
    for (let i = minCount; i < maxCount ; i++){
    let nextMonster = resData[i]
        addToMonsterContainer(nextMonster)
    }
}

function addToMonsterContainer(monster){
    const monsterName = document.createElement("h2")
    monsterName.innerHTML = monster.name
    const monsterAge = document.createElement("h3")
    monsterAge.innerHTML = `Age: ${monster.age}`
    const monsterInfo = document.createElement("p")
    monsterInfo.innerHTML = monster.description
    const monsterDiv = document.createElement("div")
    monsterDiv.append(monsterName, monsterAge, monsterInfo)

    monsterContainer.append(monsterDiv)
}

createMonsterForm.addEventListener("submit", (event) =>{
    event.preventDefault()

    let freshMonster = {
        "name": document.getElementById("name-input").value,
        "age": document.getElementById("age-input").value,
        "description": document.getElementById("description-input").value
    }
    addToMonsterContainer(freshMonster)
})

buttonForward.addEventListener("click", () => {
    pageCount ++ 
    monsterContainer.innerHTML = ""
    getFetch()
    .then(resData =>loadPage(resData,pageCount))
})

buttonBackward.addEventListener("click", () => {
    if (pageCount > 2){
        pageCount -- 
        monsterContainer.innerHTML = ""
        getFetch()
        .then(resData =>loadPage(resData,pageCount))
    } else {ErrorEvent}
})

function getFetch(){
return fetch("http://localhost:3000/monsters")
    .then(res => res.json())
}
