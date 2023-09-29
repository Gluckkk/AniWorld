import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";

import KPI from "./models/KPI.js";

import { kpis } from "./data/data.js";

// configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// api routes
app.use("/kpi", kpiRoutes);

// mongoose setup
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`server port: ${PORT}`));

    // KPI.insertMany(kpis);
    // mongoose.connection.db.dropDatabase();
  })
  .catch((error) => console.log(`${error} did not conntect`));

app.get("/", cors(), (req, res) => {});

app.post("/", async (req, res) => {
  const newUser = req.body;

  await KPI.insertMany([newUser]);
  res.json({ success: true });
});

app.post("/updateUser", async (req, res) => {
  const user = req.body;

  const doc = await KPI.findOneAndUpdate(
    { username: user.oldUsername },
    {
      username: user.username,
      email: user.email,
      password: user.password,
    }
  );

  await doc.save();

  res.json({ success: true });
});

app.post("/addToArray", async (req, res) => {
  const user = req.body;
  let doc;

  if (user.type === "bookmarks") {
    doc = await KPI.findOneAndUpdate(
      { username: user.username },
      {
        $push: { bookmarks: user.item },
      }
    );
  }

  if (user.type === "watched") {
    doc = await KPI.findOneAndUpdate(
      { username: user.username },
      {
        $push: { watched: user.item },
      }
    );
  }
  if (user.type === "watchLater") {
    doc = await KPI.findOneAndUpdate(
      { username: user.username },
      {
        $push: { watchLater: user.item },
      }
    );
  }

  await doc.save();
  res.json({ success: true });
});

app.post("/removefromArray", async (req, res) => {
  const user = req.body;
  let doc;
  if (user.type === "bookmarks") {
    doc = await KPI.findOneAndUpdate(
      { username: user.username },
      {
        $pull: { bookmarks: user.item },
      }
    );
  }

  if (user.type === "watched") {
    doc = await KPI.findOneAndUpdate(
      { username: user.username },
      {
        $pull: { watched: user.item },
      }
    );
  }
  if (user.type === "watchLater") {
    doc = await KPI.findOneAndUpdate(
      { username: user.username },
      {
        $pull: { watchLater: user.item },
      }
    );
  }

  await doc.save();
  // console.log("updated");
  res.json({ success: true });
});
