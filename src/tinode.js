var Tinode = require("tinode-sdk");
const API_KEY = "AQAAAAABAABgdIf4e-qYHGhzx0pBm4tV";
const APP_NAME = "Tinode-IM";
const HOST = "localhost:6060";
import * as tinode from "./tinode.js";
import router from "./router.js";

export function NewClient() {
  let client = new Tinode(APP_NAME, HOST, API_KEY, null, false);

  client.enableLogging(true);
  client.onDisconnect = function() {
    router.push({ name: "landing" });
  };

  // client.connect().then(() => {
  //   console.log("Client connected");
  // });

  return client;
}
