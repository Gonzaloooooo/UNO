const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('unot_partidasjugadores_pju', {
    pk_pju_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fk_par_pju_id_partida: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fk_jug_pju_id_jugador: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pju_cartas: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    pju_puntuacion: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'unot_partidasjugadores_pju',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "unot_partidasjugadores_pju_pkey",
        unique: true,
        fields: [
          { name: "pk_pju_id" },
        ]
      },
    ]
  });
};
