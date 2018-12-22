var Tinode = require("tinode-sdk");
const API_KEY = "AQEAAAABAAD_rAp4DJh05a1HAwFT3A6K";
const APP_NAME = "Tinode-IM";
const HOST = "167.99.158.63:6060";
import * as tinode from "./tinode.js";
import router from "./router.js";

export function NewClient() {
  let client = new Tinode(APP_NAME, HOST, API_KEY, null, false);
  client.contacts = {};

  client.enableLogging(true);
  client.onDisconnect = function() {
    console.log("Client has disconnected!");
    router.push({ name: "landing" });
  };

  // client.connect().then(() => {
  //   console.log("Client connected");
  // });

  return client;
}
