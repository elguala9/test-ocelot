import conf from './config.json'; // This import style requires "esModuleInterop", see "side notes"
import { Ocelot } from "./Ocelot";

//console.log(conf);
let ocelot = new Ocelot("https://eth-rinkeby.alchemyapi.io/v2/og20Yy_ySrS03XIymDLWrukzBoZx7j2M", "0x4F5D845f7e6326fF4d97Db8913e37c4eE4b56b23");

ocelot.getPrice().then(console.log);
