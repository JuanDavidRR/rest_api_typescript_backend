//npm install --save sequelize
//$ npm install --save pg pg-hstore # Postgres
//Instructions:
//https://sequelize.org/docs/v6/getting-started/

//npm i sequelize-typescript
import { Sequelize } from "sequelize-typescript";
//npm i dotenv
import dotenv from "dotenv";
import Product from '../models/Product.model';
dotenv.config();

//get the URL from Render and copy the External Database URL
//add ?sql=true at the end of the URL
//save the url on a .env file and use it with dotenv
const db = new Sequelize(process.env.DATABASE_URL!, {
  //Instance our model
  models: [__dirname + "/../models/**/*"],
  logging: false,
});

//Add the model to the db
db.addModels([Product])

export default db;
