const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

(async () => {
  // Load the image
  const image = await loadImage(path.join(__dirname,'images', 'K2_Bargiel_ski_RB_02_1920.jpg')).png().toBuffer();

  // Create a canvas
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);

  // Create a puzzle
  const puzzle = createPuzzle(canvas, 3, 3);

  // Save the puzzle
  await savePuzzle(puzzle, 'puzzle.jpg');
})();