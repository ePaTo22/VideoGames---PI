const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("genre", {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ID: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      delfaultValue: DataTypes.UUIDV4,
    },
  });
};

// [ ] Genero con las siguientes propiedades:
// ID
// Nombre
