const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('unot_partidas_par', {
    pk_par_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    par_fechainicio: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    par_fechafinal: {
      type: DataTypes.DATE,
      allowNull: true
    },
    par_orden: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'unot_partidas_par',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "unot_partidas_par_pkey",
        unique: true,
        fields: [
          { name: "pk_par_id" },
        ]
      },
    ]
  });
};
