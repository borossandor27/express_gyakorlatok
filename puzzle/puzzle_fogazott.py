'''
    Az élek mentén szabályos "fülek" és "lyukak" kerülnek hozzáadásra, amelyek teljesen szimmetrikusak és illeszkednek egymáshoz.
    A fülek és lyukak alakját bezier-görbékkel vagy előre definiált szabályos formákkal hozzuk létre.
    Minden puzzle-darab egyedi formájú lehet, de a szomszédos élekkel egyeznie kell.
    A darabok éleit bezier-görbékkel hozzuk létre a bezier_curve függvénnyel.
    Az irány (fel, le, balra, jobbra) alapján határozza meg az ívet.
    Az egyik darab "füle" automatikusan meghatározza a szomszédos darab "lyukát" és fordítva.
'''
import numpy as np
from PIL import Image, ImageDraw
import os
import random

# Puzzle konfiguráció
image_path = "K2_Bargiel_ski_RB_02_1920.jpg"  # Kép elérési útja
output_folder = "puzzle_pieces_classic"
os.makedirs(output_folder, exist_ok=True)

rows, cols = 5, 5  # Puzzle darabok száma
piece_size = 200  # Egy puzzle darab mérete (pixelekben)
tab_size = piece_size // 3  # Fül/lyuk mérete

# Betöltjük a képet
image = Image.open(image_path)
image = image.resize((cols * piece_size, rows * piece_size))

# Fülek definiálása
tabs = {}

def draw_piece(draw, x1, y1, x2, y2, top, left, bottom, right):
    """Egy puzzle darab körvonalának megrajzolása."""
    path = []
    # Bal felső sarokból indulunk
    path.append((x1, y1))

    # Felső él
    if top == "tab":
        path.extend(bezier_curve(x1, y1, x2, y1, "up"))
    elif top == "slot":
        path.extend(bezier_curve(x1, y1, x2, y1, "down"))
    else:
        path.append((x2, y1))  # Egyenes él

    # Jobb él
    if right == "tab":
        path.extend(bezier_curve(x2, y1, x2, y2, "right"))
    elif right == "slot":
        path.extend(bezier_curve(x2, y1, x2, y2, "left"))
    else:
        path.append((x2, y2))  # Egyenes él

    # Alsó él
    if bottom == "tab":
        path.extend(bezier_curve(x2, y2, x1, y2, "down"))
    elif bottom == "slot":
        path.extend(bezier_curve(x2, y2, x1, y2, "up"))
    else:
        path.append((x1, y2))  # Egyenes él

    # Bal él
    if left == "tab":
        path.extend(bezier_curve(x1, y2, x1, y1, "left"))
    elif left == "slot":
        path.extend(bezier_curve(x1, y2, x1, y1, "right"))
    else:
        path.append((x1, y1))  # Egyenes él

    # Rajzoljuk meg az útvonalat
    draw.line(path, fill="black", width=2)

def bezier_curve(x1, y1, x2, y2, direction):
    """Egy íves fül/lyuk létrehozása."""
    cx = (x1 + x2) // 2
    cy = (y1 + y2) // 2

    # Bezier ívek iránya
    if direction == "up":
        return [(cx - tab_size, y1 - tab_size), (cx + tab_size, y1 - tab_size), (x2, y2)]
    elif direction == "down":
        return [(cx - tab_size, y1 + tab_size), (cx + tab_size, y1 + tab_size), (x2, y2)]
    elif direction == "left":
        return [(x1 - tab_size, cy - tab_size), (x1 - tab_size, cy + tab_size), (x2, y2)]
    elif direction == "right":
        return [(x1 + tab_size, cy - tab_size), (x1 + tab_size, cy + tab_size), (x2, y2)]
    else:
        return [(x2, y2)]

# Puzzle darabok generálása
for row in range(rows):
    for col in range(cols):
        x1, y1 = col * piece_size, row * piece_size
        x2, y2 = x1 + piece_size, y1 + piece_size

        # Szomszédok fülei
        top = None if row == 0 else "slot" if tabs[(row - 1, col)]["bottom"] == "tab" else "tab"
        left = None if col == 0 else "slot" if tabs[(row, col - 1)]["right"] == "tab" else "tab"
        bottom = random.choice(["tab", "slot"]) if row < rows - 1 else None
        right = random.choice(["tab", "slot"]) if col < cols - 1 else None

        # Új darab kivágása
        piece = image.crop((x1, y1, x2, y2))
        piece_draw = ImageDraw.Draw(piece)

        # Körvonal rajzolása
        draw_piece(piece_draw, x1, y1, x2, y2, top, left, bottom, right)

        # Mentés
        piece.save(os.path.join(output_folder, f"piece_{row}_{col}.png"))

        # Elmentjük a darab éleit
        tabs[(row, col)] = {"top": top, "left": left, "bottom": bottom, "right": right}

print(f"Puzzledarabok elmentve: '{output_folder}' mappa")
