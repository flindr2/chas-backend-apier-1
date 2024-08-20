const { PrismaClient } = require("@prisma/client");
const express = require("express");

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.send(users);
});

app.get("/users/:id", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.send(user);
});

app.post("/users", async (req, res) => {
  console.log(req.body);
  const newUser = await prisma.user.create({
    data: {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    },
  });

  console.log("newUser", newUser);

  res.send("Created user");
});

app.put("/users", async (req, res) => {
  const updatedUser = await prisma.user.update({
    where: { id: req.body.id },
    data: {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    },
  });

  console.log("updatedUser", updatedUser);

  res.send("Updated user");
});

app.delete("/users", async (req, res) => {
  const deletedUser = await prisma.user.delete({
    where: { id: req.body.id },
  });

  console.log("deletedUser", deletedUser);

  res.send("Deleted user");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
