const { DataTypes } = require('sequelize');
const {v4:uuidV4} = require('uuid');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING
    },
    summary: {
      type: DataTypes.TEXT
    },
    healthScore: {
      type: DataTypes.INTEGER
    },
    instructions: {
      type: DataTypes.TEXT
    }
  }, {timestamps: false});
};
