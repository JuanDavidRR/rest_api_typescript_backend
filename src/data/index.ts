import { exit } from "node:process";
import db from "../config/db";

//function to clear the database when we execute npm test
//that npm command has to be added on package.json
const clearDB = async () => {
  try {
    //if everything is ok, delete the data from the database
    await db.sync({ force: true });
    console.log("Database cleared");
    ("Database cleared");
    exit();
  } catch (error) {
    console.log(error);
    exit(1);
  }
};

if (process.argv[2] === "--clear") {
  clearDB();
}
