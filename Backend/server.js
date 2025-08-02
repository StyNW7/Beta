import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import router from "./routes/routes.js";
import cors from "cors";
import { setupSocket } from "./socket.js";
import http from "http";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "beta-indonesia.vercel.app"],
    credentials: true,
  })
);

app.get("/", (req, res) => res.send("Express on Vercel"));

app.use("/api", router);

const server = http.createServer(app);

setupSocket(server);

connectDB()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  // .then(() => {
  //   // Once the database connection is successful, start the server (deployment)
  //   const PORT = process.env.PORT;
  //   app.listen(PORT, () => {
  //     console.log(`Server running on port ${PORT}`);
  //   });
  // })
  .catch((err) => {
    console.error("Failed to connect to DB", err);
    process.exit(1);
  });