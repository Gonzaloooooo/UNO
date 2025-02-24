const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('unot_cartas_car', {
    pk_car_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    car_code: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    car_color: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    car_value: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    car_number: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    car_type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    car_special: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    car_class: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    car_color_code: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    car_url: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'unot_cartas_car',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "unot_cartas_car_car_code_key",
        unique: true,
        fields: [
          { name: "car_code" },
        ]
      },
      {
        name: "unot_cartas_car_pkey",
        unique: true,
        fields: [
          { name: "pk_car_id" },
        ]
      },
    ]
  });
};
