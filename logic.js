const addbtn = document.getElementById("addbtn");
const main = document.querySelector("#main");

addbtn.addEventListener("click", () => {
    addNotes();
})

let count = 0;
function addNotes(text = "") {
    count = count + 1;

    let containerDiv = document.createElement("div");
    containerDiv.classList.add("container");
    containerDiv.setAttribute("value", `${count}`)
    containerDiv.innerHTML =
        `<div class="toolesBar">
        <i id="save" class="fa-solid fa-floppy-disk"></i>
        <i id="delet" class="fa-solid fa-trash"></i>
    </div>
    <textarea id="textBox">${text}</textarea>
    `

    containerDiv.querySelector("#delet").addEventListener("click", () => {
        containerDiv.remove();
        saveNotes();
    })
    
    main.appendChild(containerDiv)

    containerDiv.querySelector("#save").addEventListener("click", () => {
        saveNotes();
    })

    saveNotes();

    containerDiv.querySelector("#textBox").addEventListener("focusout", () => {
        saveNotes()
    })
}


function saveNotes () {
    const notes = document.querySelectorAll("#textBox")
    const data = [];
    notes.forEach((note) => {
        data.push(note.value)
    })

    if (data.length === 0) {
        localStorage.removeItem("notes")
    }
    else {
        localStorage.setItem("notes", JSON.stringify(data))
    }
}

(
    function () {
        const lsNotes = JSON.parse(localStorage.getItem("notes"));
        if (lsNotes === null) {
            addNotes();
        }
        else{
            lsNotes.forEach((lsNotes) => {
                addNotes(lsNotes)
            })
        }
        
    }
)()

