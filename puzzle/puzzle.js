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
      array[randomIndex],
      array[currentIndex],
    ];
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
var kivalsztott_kep = "";

document.addEventListener("DOMContentLoaded", function () {
  /**
   *  Az "images_thumbs" azonosítójú elemben lévő képre kattintva ezt a képnek
   *  a darabjait jelenítsük meg a "puzzle-pieces" azonosítójú elemen szalag szerűen.
   */
  resizePuzzleBoard();
  
  
  const targets = document.getElementById("targets");
  const targetDivs = targets.querySelectorAll("div");
  targetDivs.forEach((div) => {
    div.addEventListener("dragover", (e) => {
      e.preventDefault(); // Engedélyezés a drop-ra
    });
    div.addEventListener("drop", (e) => {
      e.preventDefault();
      const imgAlt = imgAltFromSrc( e.dataTransfer.getData("text")); // Azonosítjuk a képet az alt al
      // Ha a kép alt értéke megegyezik a div id-jével, akkor a képet a div-be helyezzük
      if (imgAlt === div.id) {
        const img = document.querySelector(`img[alt="${imgAlt}"]`);
        div.innerHTML = "";
        div.appendChild(img); // A képet az adott div-hez rendeljük
      }
    });
    // Ha a kép nem egy div-re esik, visszahelyezzük az eredeti forrásba
    document.addEventListener("dragend", (e) => {
      const img = e.target;
      if (img.tagName === "IMG" && !img.parentElement.matches("#targets div")) {
        sources.appendChild(img); // Visszahelyezés az eredeti forráshoz
      }
    });
  });

  function kepDarabokBetoltese(kivalsztott_kep) {
    for (let i = 0; i < sor; i++) {
      for (let j = 0; j < oszlop; j++) {
        let pieces_img = kepDarabNeve(kivalsztott_kep, i, j);
        pieces.push(pieces_img);
      }
    }
    shuffle(pieces);
    sources.innerHTML = ""; // töröljük a korábbi képeket
    for (let i = 0; i < pieces.length; i++) {
      const piece = document.createElement("img");
      piece.src = pieces[i];
      piece.alt = imgAltFromSrc(pieces[i]); // Az alt értéke a 'piece_sor_oszlop' legyen
      console.log(piece.alt);
      piece.setAttribute("draggable", "true"); // kép húzhatóvá tétele
      piece.setAttribute("ondragstart", "drag(event)");
      piece.setAttribute("ondragstart", (e) => {
        e.dataTransfer.setData("text", e.target.alt); // Azonosítjuk a képet az alt alapján
      });
      sources.appendChild(piece);
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
    const puzzleBoard = document.getElementById("targets");
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
}); // End of DOMContentLoaded
function imgAltFromSrc(url) {

// Kivonjuk a kiterjesztés nélküli fájlnevet (pl.: "mount-everest_piece_0_1")
const filename = url.split('/').pop().split('.').slice(0, -1).join('.');

// Reguláris kifejezés a szükséges részlet kiszedéséhez
const match = filename.match(/piece_\d+_\d+/);
const result = match ? match[0] : null;

console.log(result); // Eredmény: "piece_0_1"
return result;
}
 
