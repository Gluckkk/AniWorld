import mongoose from "mongoose";

const Schema = mongoose.Schema;

const KPISchema = new Schema({
  username: String,
  email: String,
  password: String,
  bookmarks: [String],
  watched: [String],
  watchLater: [String],
});

const KPI = mongoose.model("KPI", KPISchema);
export default KPI;
