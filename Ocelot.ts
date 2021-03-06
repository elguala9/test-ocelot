import Web3 from "web3";
import fs from 'fs';
//import * as fs from 'fs';
import { Contract } from 'web3-eth-contract';
import CONFIG from './config.json'; 
import ABI from './abi.json'; 
import { AbiItem } from 'web3-utils'

export class Ocelot{
    private config_path = "./config.json"
    private abi_path = "./abi.json"
    private web3 : Web3;
    private smart_contract : Contract;
    private account : string;

    constructor(provider : any, account : string){
      
        
        this.web3 = new Web3(provider);
        //this.web3.eth.defaultAccount = account;
        this.account = account;
        this.smart_contract = new this.web3.eth.Contract(ABI as AbiItem[],CONFIG.CONTRACT_ADDRESS);
        //this.smart_contract.defaultAccount = account;
        //console.log(this.smart_contract);
    }

    public getCirculation(){
      return this.getCirculationNormal() + this.getCirculationCustom();
    }

    public getCirculationNormal(){
      return this.smart_contract.methods.circulationNormal().call();
    }

    public getCirculationCustom(){
      return this.smart_contract.methods.circulationCustom().call();
    }

    public getBalanceOf(address : string){
      return this.smart_contract.methods.balanceOf(address).call();
    }

    public getBalance(){
      return this.smart_contract.methods.balance().call();
    }

    public getOwnerNFT(token_id : number){
      return this.smart_contract.methods.ownerOf(token_id).call();
    }

    public getOwnerContract(){
      return this.smart_contract.methods.owner().call();
    }

    public getNameCollection(){
      return this.smart_contract.methods.name().call();
    }

    public getSymbolCollection(){
      return this.smart_contract.methods.symbol().call();
    }

    public getUriNFT(token_id : number){
      return this.smart_contract.methods.tokenURI(token_id).call();
    }

    public getApproved(token_id : number){
      return this.smart_contract.methods.getApproved(token_id).call();
    }

    public isApprovedForAll(owner : string, operator : string){
      return this.smart_contract.methods.isApprovedForAll(owner, operator).call();
    }

    public getPrice(){
      return this.smart_contract.methods.getPrice().call();
    }

    //configuration of the transction that is used when we start a mint transaction
    private async transactionMintConfig(){
      //console.log(this.smart_contract.defaultAccount);
      //console.log(this.account);
      let price = await this.getPrice().then();
      
      return {
        gasLimit: String(CONFIG.GAS_LIMIT),
        to: CONFIG.CONTRACT_ADDRESS,
        from : this.account,
        value: price
      };
    }

    public async mintOcelot(){
      
      let config = await this.transactionMintConfig()
      
      this.smart_contract.methods
      .mintOcelot()
      .send(config)
      .once("error", (err : any) => {
        console.log(err);
        return "Sorry, something went wrong please try again later.";
      })
      .then((receipt : any) => {
        return receipt;
      });
    }

    //configuration of the transction that is used when we start a non-payable transaction
    private transactionConfig() : any{
      return {
        gasLimit: String(CONFIG.GAS_LIMIT),
        to: CONFIG.CONTRACT_ADDRESS
      };
    }


}