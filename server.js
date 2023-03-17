const express = require("express");
const jsonwebtoken = require("jsonwebtoken");

const JWT_SECRET =
  "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  // Verify the token is valid
  return res.status(200).json({
    message: `Welcome to JWT server.`,
  });
});

app.get("/super-secure-resource", (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Not Authorized" });
  }

  // Bearer <token>>
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token is valid
    const { user } = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({
      message: `Congrats ${user}! You can now accesss the super secret resource`,
    });
  } catch (error) {
    return res.status(401).json({ error: "Not Authorized" });
  }
});

app.post("/login", (req, res) => {

  console.log(req.body);
  const { username, password } = req.body;
  console.log(`${username} is trying to login.`);

  if (username === "admin" && password === "admin") {
    return res.json({
      token: jsonwebtoken.sign({ user: "admin" }, JWT_SECRET),
    });
  }

  return res
    .status(401)
    .json({ message: "The username and password your provided are invalid" });
});

app.listen(3001, () => {
  console.log("API running on localhost:3001");
});
