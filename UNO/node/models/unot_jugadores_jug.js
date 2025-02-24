const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('unot_jugadores_jug', {
    pk_jug_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    jug_apodo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    'jug_contraseña': {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'unot_jugadores_jug',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "unot_jugadores_jug_jug_apodo_key",
        unique: true,
        fields: [
          { name: "jug_apodo" },
        ]
      },
      {
        name: "unot_jugadores_jug_pkey",
        unique: true,
        fields: [
          { name: "pk_jug_id" },
        ]
      },
    ]
  });
};
