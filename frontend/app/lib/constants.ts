import { Connection } from "@solana/web3.js";
import axios from "axios";

let LAST_UPDATED : number | null = null;
let  TOKEN_PRICE_REFRESH_INTERVAL = 60 * 1000; // EVERY MIN
let prices : {[key : string] : {
    id:string;
    type:string;
    price: string
}} = {};

export const SUPPORTED_TOKENS : {
    name : string;
    mint:string;
    native: boolean
}[] = [{
    name : "USDC",
    mint : "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    native: false
}, {
    name :"USDT",
    mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    native: false
},
{
    name :"SOL",
    mint: "So11111111111111111111111111111111111111112",
    native: true
}]

export const connection = new Connection("https://solana-mainnet.g.alchemy.com/v2/L2WQTcjS6zJZkKWzL2eneaAuJ1-OrYbs");

export async function getSupportedToken(){
 if(!LAST_UPDATED || new Date().getTime()  - LAST_UPDATED < TOKEN_PRICE_REFRESH_INTERVAL ){
     const responses = await axios.get("https://lite-api.jup.ag/price/v2?ids=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v,Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB,So11111111111111111111111111111111111111112")
     prices = responses.data.data;
     LAST_UPDATED = new Date().getTime();

 }
 return SUPPORTED_TOKENS.map(s => ({
    ...s,
    price: prices[s.mint]?.price
 }))
}
getSupportedToken();

