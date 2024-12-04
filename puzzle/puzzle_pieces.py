# A fenti kódhoz szükséges importálások
import numpy as np # Python tömb (array) kezelő könyvtár
from PIL import Image, ImageDraw # Pillow, a Python Image Library
import os # operációs rendszer műveletekhez
os.system("clear") # windows esetén: os.system("cls")

# Puzzle konfiguráció
image_path = "K2_Bargiel_ski_RB_02_1920.jpg"  # Add meg a kép nevét
output_folder = "puzzle_pieces"
os.makedirs(output_folder, exist_ok=True)

rows, cols = 5, 10  # Rács mérete: 5 sor, 10 oszlop (50 darab)
piece_size = 100  # Egy puzzle darab alapmérete (pixelekben)

# Betöltjük a képet
assert os.path.exists(image_path), f"A fájl nem található: {image_path}"
image = Image.open(image_path)
image = image.resize((cols * piece_size, rows * piece_size))
image_array = np.array(image)

# egyenes oldal útvonala
class egyenes:
    def __init__(self, start, end, irany):
        self.start = start
        self.end = end
        self.irany = irany # (0) vízszintes vagy (1) függőleges

# Egy darab jellemzői
class PuzzlePiece:
    def __init__(self, sorszam, sor, oszlop, x_kordinata,y_kordinata, szelesseg, magassag, path_top, path_right, path_bottom, path_left):
        self.sorszam = sorszam
        self.sor = sor
        self.oszlop = oszlop
        self.x_kordinata = x_kordinata
        self.y_kordinata = y_kordinata
        self.szelesseg = szelesseg
        self.magassag = magassag
        self.path_top = path_top
        self.path_right = path_right
        self.path_bottom = path_bottom
        self.path_left = path_left
       