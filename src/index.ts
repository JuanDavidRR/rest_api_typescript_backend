// npm i colors
import colors from "colors";
import server from "./server";

//by default the port is assigned by your host on process.env.PORT but if it is not available it will be 4000
const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(colors.cyan.bold(`Desde el puerto ${port}`));
});
