from gimpfu import *
import os

def export_jigsaw_pieces(image, drawable, rows, cols):
    # Kép könyvtárának meghatározása
    image_dir = os.path.dirname(image.filename) if image.filename else "/tmp"
    output_dir = os.path.join(image_dir, "jigsaw_pieces")
    
    # Hozd létre az output mappát, ha nem létezik
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Darabok szélessége és magassága
    width = image.width // cols
    height = image.height // rows

    for row in range(rows):
        for col in range(cols):
            x = col * width
            y = row * height

            # Ideiglenes kép létrehozása a kivágott darabból
            temp_image = pdb.gimp_image_duplicate(image)
            pdb.gimp_image_crop(temp_image, width, height, x, y)

            # Fájl elnevezése
            filename = os.path.join(output_dir, "piece_{}_{}.png".format(row, col))

            # Exportálás
            pdb.file_png_save(temp_image, pdb.gimp_image_get_active_layer(temp_image), 
                              filename, filename, 0, 9, 1, 1, 1, 1, 1)

            # Takarítás
            pdb.gimp_image_delete(temp_image)

    pdb.gimp_message("Puzzle darabok mentése kész: {}".format(output_dir))

register(
    "export_jigsaw_pieces",
    "Export jigsaw puzzle pieces",
    "Exports each jigsaw piece as a separate file.",
    "Your Name",
    "Your License",
    "2024",
    "<Image>/Filters/Custom/Export Jigsaw Pieces...",
    "*",
    [
        (PF_INT, "rows", "Number of rows", 4),
        (PF_INT, "cols", "Number of columns", 4),
    ],
    [],
    export_jigsaw_pieces
)

main()
