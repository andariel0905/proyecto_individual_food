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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    image: {
      type: DataTypes.STRING
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        checkHealthScore(value) {
          if (value < 0 || value > 100){ 
            throw new Error('El Health Score debe ser un valor entre 0 y 100');
      }}}
    },
    steps: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {timestamps: false});
};
