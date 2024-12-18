document.addEventListener("DOMContentLoaded", function () {
  const sources = document.getElementById("sources");
  const targets = document.getElementById("targets");
  const images = sources.querySelectorAll("img");
  const targetDivs = targets.querySelectorAll("div");

  images.forEach((img) => {
    img.draggable = true;
    img.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text", e.target.alt); // Azonosítjuk a képet az alt alapján
    });
  });

  targetDivs.forEach((div) => {
    // dragover - A húzott elem érvényes ledobási cél fölé ért
    div.addEventListener("dragover", (e) => {
      e.preventDefault(); // Engedélyezés a drop-ra
    });
    // drop - A húzott elemet ledobják
    div.addEventListener("drop", (e) => {
      e.preventDefault();
      const imgAlt = e.dataTransfer.getData("text");
      // Ha a div id-ja megegyezik a kép alt-jával, akkor a képet a div-hez rendeljük

      if (div.id === imgAlt) {
        const img = sources.querySelector(`img[alt="${imgAlt}"]`);
        div.appendChild(img);
      }
    });
  });

  // Ha a kép nem a megfelelő div-re esik, visszahelyezzük az eredeti forrásba
  document.addEventListener("dragend", (e) => {
    const img = e.target;
    if (img.tagName === "IMG" && !img.parentElement.matches("#targets div")) {
      sources.appendChild(img); // Visszahelyezés az eredeti forráshoz
    }
  });
});
