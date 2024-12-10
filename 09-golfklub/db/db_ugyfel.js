// Ügyfél entitás kezelése
export async function getUgyfelek() {
    let sql = "SELECT * FROM ugyfelek";
    try {
      const [rows] = await connection.execute(sql);
      response.success = true;
      response.data = rows;
    } catch (err) {
      response.success = false;
      response.error.hibaszoveg = err.message;
    } finally {
      return response;
    }
  }
  export async function getUgyfel(uazon) {
    let sql = "SELECT * FROM ugyfelek WHERE uazon = ?";
    try {
      const [rows] = await connection.execute(sql, [uazon]);
      response.success = true;
      response.data = rows;
    } catch (err) {
      response.success = false;
      response.error.hibaszoveg = err.message;
    } finally {
      return response;
    }
  }
  export async function updateUgyfel(uazon, ugyfel) {
    let sql = "UPDATE `ugyfelek` SET `unev`=?,`uemail`=?,`utel`=?,`ujelszo`=?,`uszuletett`=?,`uregisztracio`=? WHERE `uazon`=?";
    let values = [ugyfel.unev, ugyfel.uemail, ugyfel.utel, ugyfel.ujelszo, ugyfel.uszuletett, ugyfel.uregisztracio, uazon];
    try {
      const [rows] = await connection.execute(sql, values);
      response.success = true;
      response.data = rows;
      response.message.push("Az ügyfél adatai frissítve!");
    } catch (err) {
      response.success = false;
      response.error.hibaszoveg = err.message;
      response.message.push("Az ügyfél adatainak frissítése sikertelen!");
    } finally {
      return response;
    }
  }
  export async function deleteUgyfel(uazon) {
    let sql = "DELETE FROM `ugyfelek` WHERE `uazon`=?";
    try {
      const [rows] = await connection.execute(sql, [uazon]);
      response.success = true;
      response.data = rows;
      response.message.push("Az ügyfél törölve!");
    } catch (err) {
      response.success = false;
      response.error.hibaszoveg = err.message;
      response.message.push("Az ügyfél törlése sikertelen!");
    } finally {
      return response;
    }
  }
  export async function createUgyfel(ugyfel) {
    let sql = "INSERT INTO `ugyfelek`(`unev`, `uemail`, `utel`, `ujelszo`, `uszuletett`, `uregisztracio`) VALUES (?,?,?,?,?,?)";
    let values = [ugyfel.unev, ugyfel.uemail, ugyfel.utel, ugyfel.ujelszo, ugyfel.uszuletett, ugyfel.uregisztracio];
    try {
      const [rows] = await connection.execute(sql, values);
      response.success = true;
      response.data = rows;
      response.message.push("Az ügyfél hozzáadva!");
    } catch (err) {
      response.success = false;
      response.error.hibaszoveg = err.message;
      response.message.push("Az ügyfél hozzáadása sikertelen!");
    } finally {
      return response;
    }
  }
  export async function loginUgyfel(ugyfel) {
    let sql = "SELECT * FROM ugyfelek WHERE uemail = ? AND ujelszo = ?";
    let values = [ugyfel.uemail, ugyfel.ujelszo];
    try {
      const [rows] = await connection.execute(sql, values);
      if(rows.length == 1) {
        response.data = true;
        response.message.push("Ügyfél belépve!");
      } else {
        response.data = false;
        response.message.push("Felhasználónév és jelszópáros nem létezik!");
      }
    } catch (err) {
      response.success = false;
      response.error.hibaszoveg = err.message;
      response.message.push("Ügyfél belépése sikertelen!");
    } finally {
      return response;
    }
  }