"use strict";
exports.__esModule = true;
var Ocelot_1 = require("./Ocelot");
//console.log(conf);
var ocelot = new Ocelot_1.Ocelot("https://eth-rinkeby.alchemyapi.io/v2/og20Yy_ySrS03XIymDLWrukzBoZx7j2M", "0x4F5D845f7e6326fF4d97Db8913e37c4eE4b56b23");
ocelot.getPrice().then(console.log);
