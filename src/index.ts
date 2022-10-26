import "dotenv/config";
import express from "express";
import cors from "cors";
import userRoute from "./user/infrastructure/route/user.route";
import db from "./db/mongo";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use(userRoute);
db().then();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
