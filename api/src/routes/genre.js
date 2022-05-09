const { Router } = require("express");
const router = Router();
const { Genre } = require("../db");

// Ruta Genres -- [ ] GET /genres:
// Obtener todos los tipos de géneros de videojuegos posibles
// En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

router.get("/", async (req, res, next) => {
  try {
    res.send(genre);
  } catch (error) {
    next(error);
  }
});

router.post("/", (req, res, next) => {
  res.send("Esto es el post en genre");
});

router.put("/", (req, res, next) => {
  res.send("Esto es el put en genre");
});

router.delete("/", (req, res, next) => {
  res.send("Esto es el delete en genre");
});

module.exports = router;
