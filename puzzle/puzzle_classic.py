import matplotlib.pyplot as plt
import matplotlib.patches as patches

def draw_puzzle_piece(ax, x, y, size):
    """Egy puzzle darab körvonalának megrajzolása."""
    tab_size = size // 3
    inset = tab_size // 3

    # Alap téglalap
    rect = patches.Rectangle((x, y), size, size, linewidth=2, edgecolor='black', facecolor='blue')
    ax.add_patch(rect)

    # Fülek hozzáadása
    # Felső fül
    ax.add_patch(patches.Arc((x + size / 2, y + size), tab_size, tab_size, theta1=0, theta2=180, color="black", linewidth=2))
    # Alsó fül
    ax.add_patch(patches.Arc((x + size / 2, y), tab_size, tab_size, theta1=180, theta2=360, color="black", linewidth=2))
    # Bal fül
    ax.add_patch(patches.Arc((x, y + size / 2), tab_size, tab_size, theta1=270, theta2=90, color="black", linewidth=2))
    # Jobb fül
    ax.add_patch(patches.Arc((x + size, y + size / 2), tab_size, tab_size, theta1=90, theta2=270, color="black", linewidth=2))

# Ábra rajzolása
fig, ax = plt.subplots(figsize=(6, 6))
draw_puzzle_piece(ax, x=1, y=1, size=100)  # Puzzle darab kezdőkoordinátái és mérete
ax.set_xlim(0, 200)
ax.set_ylim(0, 200)
plt.gca().set_aspect('equal', adjustable='box')
plt.axis('off')
plt.show()
