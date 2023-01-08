import mongoose from "mongoose";
import logger from "./logger.config";

const mongo_uri =
  "mongodb+srv://huynguyen:1111@cluster0.zkoekeb.mongodb.net/todo?retryWrites=true&w=majority";

const db = async () => {
  try {
    await mongoose.connect(mongo_uri);
    logger.info("Database connected!");
  } catch (error) {
    logger.error(error.message);
  }
};

export default db;
