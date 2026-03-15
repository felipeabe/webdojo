const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
const port = 3333;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.post("/api/users/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) return res.status(400).json({ error: "Name is required" });
  if (!email) return res.status(400).json({ error: "Email is required" });
  if (!password) return res.status(400).json({ error: "Password is required" });

  try {
    // Verifica se email já existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: "Email já cadastrado" });
    }

    const user = await prisma.user.create({
      data: { name, email, password },
      select: { id: true, name: true, email: true, createdAt: true }, // nunca retorna a senha
    });

    return res
      .status(201)
      .json({ message: "Usuário cadastrado com sucesso!", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
