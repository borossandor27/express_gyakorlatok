document.addEventListener("DOMContentLoaded", function () {
  async function showAllUsers() {
    let url = "http://localhost:3000/users";
    let response = await fetch(url);
    console.log(response.body);
    let data = await response.json();
    if (!response.ok) {
      console.error("Hiba a betöltés során.");
      return;
    }
    let resHtml = "";

    if (data.length === 0) {
      console.log("Nincs megjeleníthető adat.");
      resHtml = "Nincsenek regisztrált felhasználók.";
    } else {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        resHtml += newCard(data[i], i);
      }
    }
    document.getElementById("users").innerHTML = resHtml;
  }
  showAllUsers();

  document.getElementById("reg").addEventListener("click", function () {
    newLocation("regisztracio.html");
  });
  document.getElementById("login").addEventListener("click", function () {
    newLocation("http://localhost:3000/login");
});
function newCard(user, i) {
  console.log(user);
  let imgSrc=`https://randomuser.me/api/portraits/men/${30+i}.jpg`;
  console.log(imgSrc);
  return `<div class="card" style="width: 18rem;">
  <img src="${imgSrc}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${user.name}</h5>
    <p class="card-text">${user.email}</p>
    <p class="card-text">${user.birthdate}</p>
    <p class="card-text">${user.accountNumber}</p>
    <p class="card-text">${user.postalCode}</p>
    </div>
    </div>`;
}

function newLocation(url) {
  window.location = url;
}
});
