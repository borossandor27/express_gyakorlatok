const szoras = 1;
const atlag = 0;
const szorasnegyzet = 1; // variancia
const minX = -5;
const maxX = 5;
const step = 0.1;
const xValues = [];
const yValues = [];
function gorbeAdatok(szoras, atlag, szorasnegyzet, minX, maxX, step) {
  for (let x = minX; x <= maxX; x += step) {
    xValues.push(x);
    yValues.push(
      (1 / (szoras * Math.sqrt(2 * Math.PI))) *
        Math.exp(-Math.pow(x - atlag, 2) / (2 * szorasnegyzet))
    );
  }
}
const xLabels = [];
for (let i = minX; i <= maxX; i++) {
  xLabels.push(i);
}
gorbeAdatok(szoras, atlag, szorasnegyzet, minX, maxX, step);

document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("myChart");

  if (canvas) {
    const minXValue = Math.min(...xValues);
    const maxXValue = Math.max(...xValues);
    const minYValue = Math.min(...yValues);
    const maxYValue = Math.max(...yValues);
    var ctx = canvas.getContext("2d");
    var chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: xValues,
        datasets: [
          {
            label: "Gauss-görbe",
            data: yValues,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: false, // A canvas manuális méretének figyelembevétele
        scales: {
          x: {
            type: "linear",
            min: minXValue,
            max: maxXValue,
          },
          y: {
            min: minYValue,
            max: maxYValue,
          },
        },
      },
    });
  }
});
