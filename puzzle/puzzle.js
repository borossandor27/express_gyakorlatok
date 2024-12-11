document.addEventListener("DOMContentLoaded", function () {
  /**
   *  Az "images_thumbs" azonosítójú elemben lévő képre kattintva ezt a képnek
   *  a darabjait jelenítsük meg a "puzzle-board" azonosítójú elemen belül.
   */
  document
    .getElementById("images_thumbs")
    .addEventListener("click", function (event) {
      if (event.target.tagName === "IMG") {
        const img = event.target;
        const src = img.src;
        const fileNameWithExtension = src.split("/").pop(); // Az utolsó "/" utáni rész kinyerése
        const pieces_src = fileNameWithExtension
          .split(".")
          .slice(0, -1)
          .join("."); // A fájlnév levágása a kiterjesztésről
        let sor = 0;
        let oszlop = 0;
        let pieces_img =
          "images/" +
          pieces_src +
          "puzzle_pieces/" +
          pieces_src +
          "piece_" +
          sor +
          "_" +
          oszlop +
          ".png"; // A darabok nevének összeállítása images/tiszta-hegyek_puzzle_pieces/tiszta-hegyek__piece_0_0.png
          alert(pieces_img);
        const puzzle_board = document.getElementById("puzzle-board");
        const piece_div = document.getElementById("piece_0_0");
        const piece = document.createElement("img");
        piece.src = pieces_img;
        piece_div.appendChild(piece);
      }

      alert(pieces_src);
    });
});
