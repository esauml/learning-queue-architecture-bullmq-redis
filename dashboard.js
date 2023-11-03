import express from "express";
import { Queue } from "bullmq";
import { ExpressAdapter } from "@bull-board/express";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter.js";
import { createBullBoard } from "@bull-board/api";

const redisOptions = {
  connection: {
    host: "redis",
    port: 6379,
  },
};

const app = express();
const queue = new Queue("templateEngine", redisOptions);
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin");

createBullBoard({
  queues: [new BullMQAdapter(queue)],
  serverAdapter,
});

app.use("/admin", serverAdapter.getRouter());

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
