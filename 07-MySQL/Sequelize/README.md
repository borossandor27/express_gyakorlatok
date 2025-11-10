# Sequelize

## Csomagok telepítése

    ```shell
    npm init -y
    npm install sequelize mysql2
    npm install --save-dev sequelize-cli
    ```

## Sequlize projekt inicializálása

    ```shell
    npx sequelize-cli init
    ```
Ez létrehozza a config, models, migrations és seeders mappákat

## Kapcsolat beállítása `(config/config.json)` fájlban

    ```json
    {
    "development": {
        "username": "root",
        "password": null,
        "database": "userdb",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "userdb",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": "root",
        "password": null,
        "database": "userdb",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
    }
    ```

## Modellek létrehozása

    ```shell
    npx sequelize-cli model:generate --name Role --attributes role_name:string
    npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string,role_id:integer,active:boolean
    npx sequelize-cli model:generate --name Login --attributes user_id:integer,login_time:date,success:boolean
    ```

A fenti parancsok a `migrations` mappában elhelyezik a létrehozáshoz használható szkripteket. 

> __NOTE__ Ha a `package.json`-ben a `type: module` szerepel, akkor a `.js` fájlokta át kell nevezni `.cjs`-re!

## Migrációk futtatása

A Sequelize nem támogatja az adatbázis létrehozást, ezt nekünk kell megoldani. Pédánkban ezért az adatbázis kezelőben létre kell hoznunk a `userdb` adatbázist a migrácó futtatása előtt

    ```shell
    npx sequelize-cli db:migrate
    ```

## Teljes alkalmazás elkészítése

    ```plaintext
    project/
    ├── models/
    │   ├── index.js
    │   ├── user.js
    │   ├── role.js
    │   └── login.js
    ├── routes/
    │   ├── users.js
    │   ├── roles.js
    │   └── logins.js
    ├── controllers/
    │   ├── usersController.js
    │   ├── rolesController.js
    │   └── loginsController.js
    ├── app.js
    ├── package.json
    ```


