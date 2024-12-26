import { pubSubManagerInstance } from "./PubSubManager";

setInterval(() => {
  pubSubManagerInstance.UserSubscribe(Math.random().toString(), "APPL");
}, 5000);
