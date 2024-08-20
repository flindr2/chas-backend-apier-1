const { PrismaClient } = require("@prisma/client");
const express = require("express");
const { body, validationResult } = require("express-validator");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

const validateUser = [
  body("username")
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),
  body("email").isEmail().withMessage("Invalid email address").normalizeEmail(),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.send(users);
});

app.get("/users/:id", async (req, res) => {
  if (isNaN(req.params.id)) {
    return res.send({ error: "Invalid id, must be a number." });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    return res.send({ message: "User found", user });
  } catch (error) {
    console.error(error);
    return res.send({ error: error.message });
  }
});

app.post("/users", validateUser, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newUser = await prisma.user.create({
    data: {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    },
  });
  return res.send({ message: "Created user", user: newUser });
});

app.put("/users", validateUser, async (req, res) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    const updatedUser = await prisma.user.update({
      where: { id: req.body.id },
      data: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      },
    });
    return res.send({ message: "Updated user", user: updatedUser });
  }
  return res.send({ errors: result.array() });
});

app.delete("/users", async (req, res) => {
  const deletedUser = await prisma.user.delete({
    where: { id: req.body.id },
  });

  res.send({ message: "Deleted user", user: deletedUser });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
