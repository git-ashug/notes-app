console.log("Welcome to Notes App. This is app.js");

showNotes();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";

  notesObj.forEach((element, index) => {
    html += `<div class="card notecard my-2 mx-2" style="width: 18rem">
                    <div class="card-body">
                        <h5 class="card-title">Note ${index + 1}</h5>
                        <p class="card-text">${element}</p>
                        <button class="btn btn-primary" onclick="deleteNote(${index})">Delete Note</button>
                    </div>
                </div>`;
  });
  let notesElem = document.getElementById("notes");
  if (notesObj.length == 0) {
    notesElem.innerHTML = `<p>Nothing to show here. Try to add tasks using 'Add Notes' button!</p>`;
  } else {
    notesElem.innerHTML = html;
  }
}

function deleteNote(index) {
  console.log("Delete called on " + index);
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

let searchTxt = document.getElementById("searchtxt");
searchTxt.addEventListener("input", function (e) {
  // console.log(searchNote.value);
  let noteCards = document.getElementsByClassName("notecard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0];
    if (
      cardTxt.innerText.toLowerCase().includes(searchTxt.value.toLowerCase())
    ) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

/**
 * Further features:
 * 1. Add Title
 * 2. Mark a note as Important
 * 3. Separate notes by user
 * 4. Sync and host to web server
 */
