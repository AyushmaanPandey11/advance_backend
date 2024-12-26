import express, { json } from "express";
import { createClient } from "redis";

const app = express();
app.use(express.json());

const redisClient = createClient();
redisClient.on("error", (err) => {
  console.log(`redist client error`);
});

app.get("/submit", async (req, res) => {
  const { code, language, problemId } = req.body;
  try {
    await redisClient.LPUSH(
      "submissions",
      JSON.stringify({ code, language, problemId })
    );
    res.status(200).send("problem received successfullys");
  } catch (error) {
    res.status(500).send("error in receiving the problems");
  }
});

const startServer = async () => {
  try {
    redisClient.connect();
    console.log(`connected to redis`);

    app.listen(3000, () => {
      `app listening on port 3000`;
    });
  } catch (error) {
    console.log(`error connecting connecting to redis`, error);
  }
};
startServer();
