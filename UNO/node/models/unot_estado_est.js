const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('unot_estado_est', {
    pk_est_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    est_ultima_carta: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    est_turno_actual: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    est_finalizada: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    est_efecto: {
      type: DataTypes.ENUM("normal","saltarTurno","coger4","coger2"),
      allowNull: true,
      defaultValue: "normal"
    },
    est_cogerdosrep: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    est_colorultimacarta: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    est_invertir_orden: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    fk_par_est_id_partida: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'unot_estado_est',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "unot_estado_est_fk_par_est_id_partida_key",
        unique: true,
        fields: [
          { name: "fk_par_est_id_partida" },
        ]
      },
      {
        name: "unot_estado_est_pkey",
        unique: true,
        fields: [
          { name: "pk_est_id" },
        ]
      },
    ]
  });
};
