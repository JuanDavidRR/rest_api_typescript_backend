//npm i swagger-jsdoc
//npm i -D @types/swagger-jsdoc
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI, { SwaggerUiOptions } from 'swagger-ui-express';

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    tags: [
      {
        name: "Products",
        description: "API operations related to products",
      },
    ],
    info: {
      title: "REST API Node.js - TypeScript - Express",
      version: "1.0.0",
      description: "API Docs for Products",
    },
  },
  apis: ["./src/router.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

//Change SWAGGER LOGO
// const swaggerUOptions: SwaggerUiOptions = {
//   customCss: `
//     .topbar-wrapper .link{
//       content: url('your-url.jpg');
//       height: 120px;
//       width: auto;
//     }
//   `,
// }
export default swaggerSpec;
//export { swaggerUOptions }
