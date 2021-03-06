"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Ocelot = void 0;
var web3_1 = __importDefault(require("web3"));
var config_json_1 = __importDefault(require("./config.json"));
var abi_json_1 = __importDefault(require("./abi.json"));
var Ocelot = /** @class */ (function () {
    function Ocelot(provider, account) {
        this.config_path = "./config.json";
        this.abi_path = "./abi.json";
        this.web3 = new web3_1["default"](provider);
        //this.web3.eth.defaultAccount = account;
        this.account = account;
        this.smart_contract = new this.web3.eth.Contract(abi_json_1["default"], config_json_1["default"].CONTRACT_ADDRESS);
        //this.smart_contract.defaultAccount = account;
        //console.log(this.smart_contract);
    }
    Ocelot.prototype.getCirculation = function () {
        return this.getCirculationNormal() + this.getCirculationCustom();
    };
    Ocelot.prototype.getCirculationNormal = function () {
        return this.smart_contract.methods.circulationNormal().call();
    };
    Ocelot.prototype.getCirculationCustom = function () {
        return this.smart_contract.methods.circulationCustom().call();
    };
    Ocelot.prototype.getBalanceOf = function (address) {
        return this.smart_contract.methods.balanceOf(address).call();
    };
    Ocelot.prototype.getBalance = function () {
        return this.smart_contract.methods.balance().call();
    };
    Ocelot.prototype.getOwnerNFT = function (token_id) {
        return this.smart_contract.methods.ownerOf(token_id).call();
    };
    Ocelot.prototype.getOwnerContract = function () {
        return this.smart_contract.methods.owner().call();
    };
    Ocelot.prototype.getNameCollection = function () {
        return this.smart_contract.methods.name().call();
    };
    Ocelot.prototype.getSymbolCollection = function () {
        return this.smart_contract.methods.symbol().call();
    };
    Ocelot.prototype.getUriNFT = function (token_id) {
        return this.smart_contract.methods.tokenURI(token_id).call();
    };
    Ocelot.prototype.getApproved = function (token_id) {
        return this.smart_contract.methods.getApproved(token_id).call();
    };
    Ocelot.prototype.isApprovedForAll = function (owner, operator) {
        return this.smart_contract.methods.isApprovedForAll(owner, operator).call();
    };
    Ocelot.prototype.getPrice = function () {
        return this.smart_contract.methods.getPrice().call();
    };
    //configuration of the transction that is used when we start a mint transaction
    Ocelot.prototype.transactionMintConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var price;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPrice().then()];
                    case 1:
                        price = _a.sent();
                        return [2 /*return*/, {
                                gasLimit: String(config_json_1["default"].GAS_LIMIT),
                                to: config_json_1["default"].CONTRACT_ADDRESS,
                                from: this.account,
                                value: price
                            }];
                }
            });
        });
    };
    Ocelot.prototype.mintOcelot = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transactionMintConfig()];
                    case 1:
                        config = _a.sent();
                        this.smart_contract.methods
                            .mintOcelot()
                            .send(config)
                            .once("error", function (err) {
                            console.log(err);
                            return "Sorry, something went wrong please try again later.";
                        })
                            .then(function (receipt) {
                            return receipt;
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    //configuration of the transction that is used when we start a non-payable transaction
    Ocelot.prototype.transactionConfig = function () {
        return {
            gasLimit: String(config_json_1["default"].GAS_LIMIT),
            to: config_json_1["default"].CONTRACT_ADDRESS
        };
    };
    return Ocelot;
}());
exports.Ocelot = Ocelot;
