document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("showUsers")
    .addEventListener("click", async function () {
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
        resHtml = "Nincs megjeleníthető adat.";
      } else {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          resHtml += newCard(data[i]);
        }
      }
      document.getElementById("users").innerHTML = resHtml;
    });
});

function newCard(user) {
  console.log(user);
  return `<div class="card" style="width: 18rem;">
  <img src="${user.profilePic}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${user.name}</h5>
    <p class="card-text">${user.email}</p>
    <p class="card-text">${user.birthdate}</p>
    <p class="card-text">${user.accountNumber}</p>
    <p class="card-text">${user.postalCode}</p>
    </div>
    </div>`;
}
