---
marp: true
theme: default
paginate: true
---

# Dagens workshop - repetition

---

## Idag

- Närvaro
- Vem är jag?
- Kursmål
- Repetition
- Svårare uppgifter finns längst

---

## Vem är jag?

- Fredrik Lindroth
- Jobbat som utvecklare i 7 år
- Tidigare även utbildat
- 3d-printing som hobby senaste året

---

## Kursmål

- Detta har ni gått igenom hittills
  - Skapat ett JavaScript-API med Express och nodeJS
  - SQL-databas med MySQL (och PostgreSQL?)
  - Prisma
  - Middleware, validering och felhantering
- Vad är kvar
  - Typescript
  - NoSQL-databas (MongoDB) och GraphQL
  - AI-verktyg
    - Jag använder Github Copilot, men andra går också bra

---

## Del 1 - ExpressJS och NodeJS

- Skapa ett API med JavaScript som använder sig av nodeJS (server) och ExpressJS (REST-API)
  - APIet ska ha en endpoint för GET, POST, PUT och DELETE
  - Testa anropa varje endpoint, använd t.ex. Thunder Client (VSCode extension) eller Postman

---

## Del 2 - PostgreSQL och Prisma

- Skapa en SQL-databas av typen PostgreSQL
- Installera senaste versionen PostgreSQL (om du inte redan gjort det)
  - <https://www.enterprisedb.com/downloads/postgres-postgresql-downloads>
  - Starta pgAdmin 4
    - username: postgres
    - password: postgres
  - Installer och initiera prisma genom att skriva följande i konsolen
    - npm install prisma --save-dev
    - npx prisma init

---

- Lägg till följande model-objekt i den nyskapade filen "schema.prisma"

```JavaScript
model User 
{
    id       Int    @id @default(autoincrement())
    username String @unique
    email    String @unique
    password String
} 
```

- Skapa en databasmigrering genom att skriva följande kommando i konsolen
  - npx prisma migrate dev --name init
- Koppla upp dig mot databasen i ditt REST-API med hjälp av PrismaClient
  - Uppdatera POST-metoden så det går att skapa en User
  - Uppdatera PUT-metoden så det går att ändra lösenord en User
  - Uppdatera GET-metoden så det går att hämta alla användare
  - Lägg till en GET-metod så det går att hämta en specifik användare
  - Uppdatera DELETE-metoden så det går att ta bort en användare
  - Tänk på att varje metod nu måste vara av typen async/await

---

## Del 3 - Validering

- Validering med middleware och felhantering
  - Validera User-datan för POST och PUT-anropet
    - Installera npm-paketet "express-validator" med "npm install express-validator"
    - Validera att "username" är en sträng och har minst tre tecken
    - Validera att "email" är en email.
    - Validera att "password" en sträng och har minst 6 tecken
  - Validera GET-anropet för en specifik användare
    - Id måste vara ett nummer och får inte vara en sträng. Är id en sträng ska inte en sökning i databas utföras.
  - Lägg ett try-catch-block runt GET-anropet för en specifik användare.

---

## Svårare uppgifter

- Returnera korrekt HTTP-statuskod
- JWT
  - Lägg till auth-middleware med metoden "login" som returnerar en JWT för en specifik användare.
  - Lägg till metoden "auth" som middleware på valfri endpoint som verifiera denna JWT och bara returnerar resultatet ifall den är giltig
