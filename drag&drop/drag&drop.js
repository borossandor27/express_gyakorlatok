document.addEventListener('DOMContentLoaded', function() {
    const sources = document.getElementById("sources");
const targets = document.getElementById("targets");
const images = sources.querySelectorAll("img");
const targetDivs = targets.querySelectorAll("div");

images.forEach(img => {
    img.draggable = true;
    img.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text", e.target.alt); // Azonosítjuk a képet az alt alapján
    });
});

targetDivs.forEach(div => {
    div.addEventListener("dragover", e => {
        e.preventDefault(); // Engedélyezés a drop-ra
    });
    div.addEventListener("drop", e => {
        e.preventDefault();
        const imgAlt = e.dataTransfer.getData("text");
        const img = document.querySelector(`img[alt="${imgAlt}"]`);
        if (img) {
            div.appendChild(img); // A képet az adott div-hez rendeljük
        }
    });
});

// Ha a kép nem egy div-re esik, visszahelyezzük az eredeti forrásba
document.addEventListener("dragend", e => {
    const img = e.target;
    if (img.tagName === "IMG" && !img.parentElement.matches("#targets div")) {
        sources.appendChild(img); // Visszahelyezés az eredeti forráshoz
    }
});

});
    