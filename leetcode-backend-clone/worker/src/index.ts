import { createClient } from "redis";

const redisClient = createClient();

async function startWorker() {
  try {
    await redisClient.connect();
    while (true) {
      const submissions = redisClient.brPop("submissions", 0);
    }
  } catch (error) {
    console.log(`error in connecting with redis`, error);
  }
}

startWorker();
