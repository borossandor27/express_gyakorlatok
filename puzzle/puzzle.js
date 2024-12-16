const sor = 5;
const oszlop = 10;

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

function kepDarabNeve(kivalsztott_kep, sor, oszlop) {
  let pieces_img =
    "images/" +
    kivalsztott_kep +
    "puzzle_pieces/" +
    kivalsztott_kep +
    "piece_" +
    sor +
    "_" +
    oszlop +
    ".png"; // A darabok nevének összeállítása images/tiszta-hegyek_puzzle_pieces/tiszta-hegyek__piece_0_0.png
  return pieces_img;
}

function kepNev(src) {
  const fileNameWithExtension = src.split("/").pop(); // Az utolsó "/" utáni rész kinyerése
  const pieces_src = fileNameWithExtension.split(".").slice(0, -1).join("."); // A fájlnév levágása a kiterjesztésről
  return pieces_src;
}
var pieces = [];

document.addEventListener("DOMContentLoaded", function () {
  /**
   *  Az "images_thumbs" azonosítójú elemben lévő képre kattintva ezt a képnek
   *  a darabjait jelenítsük meg a "puzzle-pieces" azonosítójú elemen szalag szerűen.
   */
  resizePuzzleBoard();
  var kivalsztott_kep = "";
  const puzzle_board = document.getElementById("puzzle-board");
  const filmSzalag = document.getElementById("film-szalag");

  function kepDarabokBetoltese(kivalsztott_kep) {
    for (let i = 0; i < sor; i++) {
      for (let j = 0; j < oszlop; j++) {
        let pieces_img = kepDarabNeve(kivalsztott_kep, i, j);
        pieces.push(pieces_img);
      }
    }
    shuffle(pieces);
    filmSzalag.innerHTML = ""; // töröljük a korábbi képeket
    for(let i = 0; i < pieces.length; i++) {
      const piece = document.createElement("img");
      piece.src = pieces[i];
      piece.setAttribute('draggable', "true");
      filmSzalag.appendChild(piece);
    }
    
  }

  document
    .getElementById("images_thumbs")
    .addEventListener("click", function (event) {
      if (event.target.tagName === "IMG") {
        const img = event.target;
        kivalsztott_kep = kepNev(img.src);
        kepDarabokBetoltese(kivalsztott_kep);
      }
    });
  function resizePuzzleBoard() {
    const puzzleBoard = document.getElementById("puzzle-board");
    const container = document.getElementById("puzzle-container");

    // Szülőelem méretének lekérdezése és puzzle-board méretének beállítása
    const containerHeight = container.offsetHeight;
    const containerWidth = container.offsetWidth;

    puzzleBoard.style.height = `${containerHeight}px`;
    puzzleBoard.style.width = `${containerWidth}px`;
  }

  // Betöltéskor és átméretezéskor hívjuk meg
  window.addEventListener("load", resizePuzzleBoard);
  window.addEventListener("resize", resizePuzzleBoard);
});
