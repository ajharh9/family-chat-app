// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-f7689-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListInDb = ref(database, "endorsementList")


let messageEl = document.getElementById("message")
let fromEl = document.getElementById("from")
let toEl = document.getElementById("to")
let btnEL = document.getElementById("btn")
let listEl = document.getElementById("ul-el")

function addEndorsementToList(id, messageObj) {
    let newLi = document.createElement("li")
    newLi.innerHTML = `
        <h3>${messageObj.userName}</h3>
        <p>${messageObj.userMsg}</p>
        <h3>${messageObj.toUser}</h3>
    `
    newLi.addEventListener("dblclick", function () {
        let exactLocationOfItemInDB = ref(database, `endorsementList/${id}`)
        remove(exactLocationOfItemInDB)

    })
    listEl.append(newLi)
}

function clearInputFields() {
    messageEl.value = ""
    fromEl.value = ""
    toEl.value = ""
}

function clearEndorsementList() {
    listEl.innerHTML = ""
}

onValue(endorsementListInDb, function (snapshot) {
    if (snapshot.exists()) {
        let endorsementList = Object.entries(snapshot.val())
        clearEndorsementList()
        for (let i = (endorsementList.length - 1); i >= 0; i--) {
            addEndorsementToList(endorsementList[i][0], endorsementList[i][1])
        }
    } else {
        listEl.innerHTML = "Please give some recomendation"
    }
})


btnEL.addEventListener("click", function () {
    let messageObj = {
        userMsg: message.value,
        userName: from.value,
        toUser: to.value
    }

    push(endorsementListInDb, messageObj)
    clearInputFields()
})

