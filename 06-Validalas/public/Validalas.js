let backEndUrl = "http://localhost:3000";
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("regForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Ne küldje el az űrlapot azonnal
      let errors = [];
      // Név validálása (minimum 5 karakter)
      let name = document.getElementById("name").value;
      if (name.length < 5) {
        errors.push("A név legalább 5 karakterből kell álljon.");
      }

      // Születési dátum validálása (18-100 év közötti életkor)
      let birthdate = new Date(document.getElementById("birthdate").value);
      let today = new Date();
      let age = today.getFullYear() - birthdate.getFullYear();
      let monthDiff = today.getMonth() - birthdate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthdate.getDate())
      ) {
        age--;
      }
      if (age < 18 || age > 100) {
        errors.push(
          "A születési dátum alapján az életkor 18 és 100 év közé kell essen."
        );
      }

      // Email validálása (HTML5 email input automatikusan ellenőrzi)

      // Számlaszám validálása (formátum 00000000-00000000-00000000)
      let accountNumber = document.getElementById("accountNumber").value;
      let accountRegex = /^\d{8}-\d{8}-\d{8}$/;
      if (!accountRegex.test(accountNumber)) {
        errors.push(
          "A számlaszám formátuma nem megfelelő. Követendő formátum: 00000000-00000000-00000000"
        );
      }

      // Irányítószám validálása (pontos 4 számjegy)
      let postalCode = document.getElementById("postalCode").value;
      let postalCodeRegex = /^\d{4}$/;
      if (!postalCodeRegex.test(postalCode)) {
        errors.push(
          "Az irányítószámnak pontosan négy számjegyűnek kell lennie."
        );
      }

      // Kép fájl méret és típus ellenőrzése
      let profilePic = document.getElementById("profilePic").files[0];
      if (profilePic) {
        let fileSize = profilePic.size / 1024; // Kilobytes
        if (fileSize < 20 || fileSize > 2048) {
          errors.push("A kép mérete 20KB és 2MB között kell legyen.");
        }
        let fileType = profilePic.type;
        if (!fileType.startsWith("image/")) {
          errors.push("Csak képfájlok megengedettek.");
        }
      } else {
        errors.push("Kép feltöltése kötelező.");
      }

      // Hibák megjelenítése, ha vannak
      let messageDiv = document.getElementById("message");
      messageDiv.innerHTML = "";
      if (errors.length > 0) {
        messageDiv.innerHTML =
          "<ul><li>" + errors.join("</li><li>") + "</li></ul>";
        messageDiv.style.color = "red";
      } else {
        messageDiv.textContent = "Az űrlap sikeresen elküldhető!";
        messageDiv.style.color = "green";
        // Az űrlap elküldése itt történhet meg, pl. Ajax vagy Fetch API segítségével
        adatKuldes();
      }
    });
  async function adatKuldes() {
    let formData = new FormData(document.getElementById("regForm"));
    // A FormData objektumot JSON-né alakítjuk
    let userDatas = Object.fromEntries(formData.entries()); // .entries() a FormData párokhoz
    console.log(userDatas);
    let response = await fetch(backEndUrl + "/reg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDatas), // JSON-ként küldjük el az adatokat
    });

    // Kezeld a választ
    if (response.ok) {
      alert("Sikeres regisztráció");
    } else {
      console.error(response);
      alert("Hiba történt a regisztráció során");
    }
  }
});
