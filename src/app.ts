import "dotenv/config";
import express from "express";
import cors from "cors";

// ** Swagger Docs
import swaggerUI from "swagger-ui-express";
import openApiConfiguration from "./docs/swagger";

/* // ** Monitoreo Errors Slack
const morganBody = require("morgan-body");
const { loggerStream } = require("./src/utils/monitoreo-slack/handleLooger");
 */
// ** DB connections
import dbConnectNoSQL from "./config/mongo";

// ** Rutas
import routes from "./routes";

const app = express();
const ENGINE_DB = process.env.ENGINE_DB;
const NODE_ENV = process.env.NODE_ENV || "development";

app.use(cors());
app.use(express.json());
app.use(express.static("./storage")); //archivos publicos

/* //Enviar Errores a Slack
morganBody(app, {
	noColors: true,
	stream: loggerStream,
	skip: function (req, res) {
		return res.statusCode < 400;
	},
}); */

const port: number | string = process.env.PORT || 3000;
/**
 * Definir ruta de documentacion
 */

app.use(
	"/documentation",
	swaggerUI.serve,
	swaggerUI.setup(openApiConfiguration)
);

app.use("/api", routes);

if (NODE_ENV !== "test") {
	app.listen(port, () => {
		console.log(`Tu app esta lista por http://localhost:${port}`);
	});
}

dbConnectNoSQL().then(() => {
	console.log("Conexion Exitosaa la BD");
});

export default app;
