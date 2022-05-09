const { Router } = require("express");
const router = Router();
const { Videogame } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

//Ruta 1 -- [ ] GET /videogames:
// Obtener un listado de los videojuegos
// Debe devolver solo los datos necesarios para la ruta principal

// Ruta principal: debe contener

// [ ] Input de búsqueda para encontrar videojuegos por nombre
// [ ] Área donde se verá el listado de videojuegos. Deberá mostrar su:
// Imagen
// Nombre
// Géneros
// [ ] Botones/Opciones para filtrar por género y por videojuego existente o agregado por nosotros
// [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los videojuegos por orden alfabético y por rating
// [ ] Paginado para ir buscando y mostrando los siguientes videojuegos, 15 juegos por pagina, mostrando los primeros 15 en la primer pagina.
// IMPORTANTE: Dentro de la Ruta Principal se deben mostrar tanto los videjuegos traidos desde la API como así también los de la base de datos. Debido a que en la API existen alrededor de 500 mil juegos, por cuestiones de performance pueden tomar la simplificación de obtener y paginar los primeras 100.

router.get("/", async (req, res, next) => {
  try {
    let arr1 = [];

    let response1 = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}`
    );

    response1.data.results.forEach((el) => {
      if (arr1.length <= 100) {
        arr1.push({
          name: el.name,
          image: el.background_image,
        });
      }
    });

    //------------------

    let response2 = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=2`
    );

    response2.data.results.forEach((el) => {
      if (arr1.length <= 100) {
        arr1.push({
          name: el.name,
          image: el.background_image,
        });
      }
    });
    //---------------

    let response3 = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=3`
    );

    response3.data.results.forEach((el) => {
      if (arr1.length <= 100) {
        arr1.push({
          name: el.name,
          image: el.background_image,
        });
      }
    });
    //--------------

    let response4 = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=4`
    );

    response4.data.results.forEach((el) => {
      if (arr1.length <= 100) {
        arr1.push({
          name: el.name,
          image: el.background_image,
        });
      }
    });

    //-----------

    let response5 = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=5`
    );

    response5.data.results.forEach((el) => {
      if (arr1.length <= 100) {
        arr1.push({
          name: el.name,
          image: el.background_image,
        });
      }
    }),
      arr1.push(
        await Videogame.findAll({
          attributes: ["name", "genre"],
        })
      );

    res.send(arr1);
  } catch (error) {
    next(error);
  }
});

// Ruta 2 -- [ ] GET /videogames?name="...":
// Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
// Si no existe ningún videojuego mostrar un mensaje adecuado

// Hice un destructuring de req.params
// const { name } = req.params;
// Y después en el IF le paso ese name. Si el cliente no pasó ningún name, va a ser undef. y no entra al if. Si sí recibe, entra y hace un GET a la API a la URL que recibe el nombre (no me acuerdo cómo era, no estoy en la compu) y trabajas con ese resultado. Si no entra al IF, va al else en donde trae todo. Así lo hice yo

router.get("/", (req, res, next) => {
  const { name } = req.params;
  if (name) {
  } else
    Videogame.findAll()
      .then((videogame) => {
        res.send(videogame);
      })
      .catch((error) => {
        next(error);
      });
});

// Ruta 3 -- [ ] GET /videogame/{idVideogame}:
// Obtener el detalle de un videojuego en particular
// Debe traer solo los datos pedidos en la ruta de detalle de videojuego
// Incluir los géneros asociados

// Ruta de detalle de videojuego: debe contener

// [ ] Los campos mostrados en la ruta principal para cada videojuegos (imagen, nombre, y géneros)
// [ ] Descripción
// [ ] Fecha de lanzamiento
// [ ] Rating
// [ ] Plataformas

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    let game;
    if (typeof id === "string" && id.length > 15) {
      game = await Videogame.findByPk(id);
    } else {
      let response = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );

      // let arr = []
      // const hola = genres.forEach(el => {
      //   arr.push(el.name)
      // })

      let arrGeneros = [];
      response.data.genres.forEach((el) => {
        arrGeneros.push(el.name);
      });

      let arrPlatforms = [];
      response.data.platforms.forEach((el) => {
        arrPlatforms.push(el.platform.name);
      });

      let obj = {
        name: response.data.name,
        image: response.data.background_image,
        release: response.data.released,
        rating: response.data.rating,
        description: response.data.description,
        genres: arrGeneros,
        platforms: arrPlatforms,
      };

      game = obj;
    }
    res.send(game);
  } catch (error) {
    next(error);
  }
});

// Ruta 4 -- [ ] POST /videogame:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
// Crea un videojuego en la base de datos

router.post("/", async (req, res, next) => {
  try {
    const { name, description, released, rating, platforms, genres } = req.body;
    const newVideogame = await Videogame.create({
      name,
      description,
      released,
      rating,
      platforms,
      genres,
    });
    res.send(newVideogame);
  } catch (error) {
    next(error);
  }
});

// Ruta de creación de videojuegos: debe contener
// [ ] Un formulario controlado con JavaScript con los siguientes campos:
// Nombre
// Descripción
// Fecha de lanzamiento
// Rating
// [ ] Posibilidad de seleccionar/agregar varios géneros
// [ ] Posibilidad de seleccionar/agregar varias plataformas
// [ ] Botón/Opción para crear un nuevo videojuego

router.put("/", (req, res, next) => {
  res.send("Esto es el put en videogame");
});

router.delete("/", (req, res, next) => {
  res.send("Esto es el delete en videogame");
});

module.exports = router;
