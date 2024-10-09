const backEndUrl = "http://localhost:3000/login";
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Ne küldje el az űrlapot azonnal
      let errors = [];

      // Email validálása (HTML5 email input automatikusan ellenőrzi)
      let email = document.getElementById("email").value;

      // Jelszó validálása (minimum 8 karakter)
      let password = document.getElementById("password").value;
      if (password.length < 8) {
        errors.push("A jelszó legalább 8 karakterből kell álljon.");
      }

      if (errors.length > 0) {
        document.getElementById("error").innerText = errors.join("\n");
      } else {
        let loginAdatok = new FormData(document.getElementById("loginForm"));
        
        let user = Object.fromEntries(loginAdatok.entries());
        console.log(user);
        fetch(backEndUrl, {
          method: "POST",
          headers: {
            "Content-Type": "form-data",
          },
          body: JSON.stringify(user),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Hálózati hiba!");
            }
          })
          .then((data) => {
            alert(data.message);
          })
          .catch((error) => {
            alert(error.message);
          });
      }
    });
});