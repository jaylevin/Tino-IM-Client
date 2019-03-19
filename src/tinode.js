var Tinode = require("tinode-sdk");
const API_KEY = process.env.VUE_APP_API_KEY;
const APP_NAME = "Tinode-IM";
const HOST = "localhost:6060";
import router from "./router.js";

export function NewClient() {
  let tinode = new Tinode(APP_NAME, HOST, API_KEY, null, false);
  let drafty = Tinode.Drafty;
  tinode.Drafty = drafty;
  tinode.enableLogging(true);
  tinode.onDisconnect = function() {
    router.push({ name: "landing" });
  };

  // client.connect().then(() => {
  //   console.log("Client connected");
  // });

  return tinode;
}
