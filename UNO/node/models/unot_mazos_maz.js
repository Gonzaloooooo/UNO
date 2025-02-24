const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('unot_mazos_maz', {
    pk_maz_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    maz_cartas: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    maz_cartas_descartes: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    fk_par_maz_id_partida: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'unot_mazos_maz',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "unot_mazos_maz_fk_par_maz_id_partida_key",
        unique: true,
        fields: [
          { name: "fk_par_maz_id_partida" },
        ]
      },
      {
        name: "unot_mazos_maz_pkey",
        unique: true,
        fields: [
          { name: "pk_maz_id" },
        ]
      },
    ]
  });
};
