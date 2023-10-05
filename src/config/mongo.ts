import "dotenv/config";
import { connect } from "mongoose";

const NODE_ENV = process.env.NODE_ENV;

async function dbConnect(): Promise<void> {
	const {
		DB_URI_PROV,
		DB_URI_PROV_TEST,
		DB_USER,
		DB_PASSWORD,
		DB_HOST,
		DB_NAME,
		DB_URI,
		DB_URI_TEST,
	} = process.env;

	//console.log("🚀 ~ dbConnect ~ DB_URI_PROV:", typeof DB_URI_PROV);
	//console.log("🚀 ~ dbConnect ~ DB_URI:", DB_URI)

	//const URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`

	const url: string = <string>DB_URI_PROV;

	await connect(url);
}

export default dbConnect;
