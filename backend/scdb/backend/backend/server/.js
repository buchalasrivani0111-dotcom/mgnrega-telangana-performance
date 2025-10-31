import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cron from "node-cron";
import { fetchAndStoreData } from "./utils/fetchData.js";
import mgnregaRoutes from "./routes/mgnrega.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", mgnregaRoutes);

cron.schedule("0 0 * * *", () => {
  console.log("Running daily MGNREGA data update...");
  fetchAndStoreData();
});

app.get("/", (req, res) => {
  res.send("MGNREGA Telangana Performance API Running ✅");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
