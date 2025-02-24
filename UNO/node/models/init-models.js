var DataTypes = require("sequelize").DataTypes;
var _unot_cartas_car = require("./unot_cartas_car");
var _unot_estado_est = require("./unot_estado_est");
var _unot_jugadores_jug = require("./unot_jugadores_jug");
var _unot_mazos_maz = require("./unot_mazos_maz");
var _unot_partidas_par = require("./unot_partidas_par");
var _unot_partidasjugadores_pju = require("./unot_partidasjugadores_pju");

function initModels(sequelize) {
  var unot_cartas_car = _unot_cartas_car(sequelize, DataTypes);
  var unot_estado_est = _unot_estado_est(sequelize, DataTypes);
  var unot_jugadores_jug = _unot_jugadores_jug(sequelize, DataTypes);
  var unot_mazos_maz = _unot_mazos_maz(sequelize, DataTypes);
  var unot_partidas_par = _unot_partidas_par(sequelize, DataTypes);
  var unot_partidasjugadores_pju = _unot_partidasjugadores_pju(sequelize, DataTypes);


  return {
    unot_cartas_car,
    unot_estado_est,
    unot_jugadores_jug,
    unot_mazos_maz,
    unot_partidas_par,
    unot_partidasjugadores_pju,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
