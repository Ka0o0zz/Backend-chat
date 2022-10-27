import { connect } from "mongoose";

const DB_URI = `${process.env.DB_URI}`;

export const dbConnection = async () => {
  try {
    await connect(DB_URI);
    console.log("Database is connect");
  } catch (error) {
    console.log(error);
    throw new Error("Error connection database");
  }
};
