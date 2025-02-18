// npm i colors
import colors from "colors";
//npm i swagger-ui-express
import swaggerUI from "swagger-ui-express";
//to import the styles and the logo change also import below {swaggerUIOptions}
import swaggerSpec from "./config/swagger";
//npm i cors
import cors, {CorsOptions} from 'cors'
//npm i morgan
import morgan from 'morgan'
// npm i express
import express from "express";
import router from "./router";
import db from "./config/db";

//Connect to the database
export async function connectBD() {
  try {
    await db.authenticate();
    db.sync();
    //console.log(colors.green.bold("Database connected!"));
  } catch (error) {
    console.error(colors.red.bold("There was an error connecting to the database"));
  }
}

connectBD();
const server = express();

//Allow CORS connections
const corsOptions: CorsOptions = {
  origin: function(origin, callback){
    if (origin === process.env.FRONTEND_URL) {
      //allow the connection
      callback(null, true)
    } else{
      callback(new Error('CORS error'))
      
    }
  }
}

server.use(cors(corsOptions))

//Read data from forms
server.use(express.json());

server.use(morgan('dev'))

server.use("/api/products", router);
 
//docs
//to also import the change on the logo add swaggerUiOptions next to swaggerSpec
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

export default server;
