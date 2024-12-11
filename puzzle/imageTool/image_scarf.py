''' 
    pip install pillow numpy opencv-python matplotlib
'''
import cv2
import numpy as np
from PIL import Image, ImageDraw
import random
import os

# Puzzle konfiguráció
name="tiszta-hegyek_"  # Kép neve
image_path = name+".jpg"  # Add meg a kép nevét
output_folder = name+"puzzle_pieces"
os.makedirs(output_folder, exist_ok=True)

rows, cols = 5, 10  # Rács mérete: 5 sor, 10 oszlop (50 darab)
piece_size = 100  # Egy puzzle darab alapmérete (pixelekben)

# Betöltjük a képet
assert os.path.exists(image_path), f"A fájl nem található: {image_path}"
image = Image.open(image_path)
image = image.resize((cols * piece_size, rows * piece_size))
image_array = np.array(image)

# Fogazott szél létrehozása
def add_jigsaw_edge(draw, x1, y1, x2, y2, horizontal=True, invert=False):
    mid = (x1 + x2) // 2 if horizontal else (y1 + y2) // 2
    offset = piece_size // 4  # A fog mérete
    if invert:
        offset = -offset

    if horizontal:
        points = [(x1, y1), (mid - offset, y1), (mid, y1 + offset), (mid + offset, y1), (x2, y1), (x2, y2), (x1, y2)]
    else:
        points = [(x1, y1), (x1, mid - offset), (x1 + offset, mid), (x1, mid + offset), (x1, y2), (x2, y2), (x2, y1)]

    draw.polygon(points, fill=None, outline="black")  # Rajzolás poligonként

# Puzzle darabok generálása
for row in range(rows):
    for col in range(cols):
        x1, y1 = col * piece_size, row * piece_size
        x2, y2 = x1 + piece_size, y1 + piece_size
        
        # Kép kivágása
        piece = image.crop((x1, y1, x2, y2))
        piece_draw = ImageDraw.Draw(piece)
        
        
        # Darab mentése
        piece.save(os.path.join(output_folder, f"{name}piece_{row}_{col}.png"))

print(f"Fogazott puzzle darabok elmentve a '{output_folder}' mappába!")