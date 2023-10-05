import swaggerJsDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

// ** API Config Info || Configuracion de la informacion de la API
const swaggerDefinition: OAS3Definition = {
	openapi: "3.0.0",
	info: {
		title: "Documentacion de mi API",
		version: "1.0.1",
	},
	servers: [
		{
			url: "http://localhost:3000/api",
		},
	],
	components: {
		securitySchemes: {
			bearerAuth: {
				type: "http",
				scheme: "bearer",
			},
		},
		schemas: {
			authLogin: {
				type: "object",
				required: ["email", "password"],
				properties: {
					email: {
						type: "string",
					},
					password: {
						type: "string",
					},
				},
			},

			authRegister: {
				type: "object",
				required: ["email", "password", "age", "name"],
				properties: {
					name: {
						type: "string",
					},
					age: {
						type: "integer",
					},
					email: {
						type: "string",
					},
					password: {
						type: "string",
					},
				},
			},
			track: {
				type: "object",
				required: ["name", "album", "cover", "artist", "duration", "mediaId"],
				properties: {
					name: {
						type: "string",
					},
					album: {
						type: "string",
					},
					cover: {
						type: "string",
					},
					artist: {
						type: "object",
						properties: {
							name: {
								type: "string",
							},
							nickname: {
								type: "string",
							},
							nationality: {
								type: "string",
							},
						},
					},
					duration: {
						type: "object",
						properties: {
							start: {
								type: "integer",
							},
							end: {
								type: "integer",
							},
						},
					},
					mediaId: {
						type: "string",
					},
				},
			},
			storage: {
				type: "object",
				properties: {
					url: {
						type: "string",
					},
					filename: {
						type: "string",
					},
				},
			},
		},
	},
};
// ** Opciones
const options: OAS3Options = {
	swaggerDefinition: swaggerDefinition,
	apis: ["src/routes/*.js"],
};
const openApiConfiguration = swaggerJsDoc(options);

export default openApiConfiguration;
