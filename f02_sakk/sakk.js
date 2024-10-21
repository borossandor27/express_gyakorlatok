document.addEventListener('DOMContentLoaded', function() {
    var sakk = new Sakk();
    sakk.init();
});

class Sakktabla {
    constructor() {
        this.babuk = [];
        this.kezdoAllapot();
        
    }
    kezdoAllapot() {
        this.babuk = [
            ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
            ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
            ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
        ];
    }
}
class Sakk{
    constructor() {
        this.sakktabla = new Sakktabla();
    }
    init() {
        this.tablaGeneral();
    }
    tablaGeneral() {
        var tabla = document.querySelector('#chessboard');
        tabla.innerHTML = '';
        for (var i = 0; i < 8; i++) {
            var sor = document.createElement('tr');
            for (var j = 0; j < 8; j++) {
                var cella = document.createElement('td');
                cella.innerHTML = this.sakktabla.tabla[i][j];
                sor.appendChild(cella);
            }
            tabla.appendChild(sor);
        }
    }
    kezdoAllapot() {console.log('kezdoAllapot');}

        
}