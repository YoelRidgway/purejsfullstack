import 'dotenv/config'; // Load environment variables from .env file
import express from "express";
import cors from "cors";
import { createProxyMiddleware } from 'http-proxy-middleware';

// check that required env variables are set
const { BACKEND_PORT } = process.env

if (!BACKEND_PORT) {
	exitMissingVar("Please add \"BACKEND_PORT\" to the environemnt before starting the app");
}

// setup express and router
const app = express();
const router = express.Router();

// create proxy middleware to call other apis
const simpleProxy = createProxyMiddleware({
	target: 'https://api.api.com',
	changeOrigin: true,
	pathRewrite: function (path, req) {
		return `/api${path}?apikey=${BACKEND_PORT}`;
	}
});

// Health check route
app.get(['/healthCheck', '/healthcheck', '/health'], (req, res) => {
	res.status(200).json({ status: 'UP', message: 'Service is running smoothly!' });
});

// allow cors from all origins... remember to limit origins in production!
app.use(cors());

// root route
app.get('/', (req, res) => {
	res.redirect('/apitest');
});

// use router without auth middleware
app.use('/', router);

// gip mapmatching proxy
router.get("/apitest", async (req, res) => {

	const result = process.env;

	res.send(result);
});

function exitMissingVar(msg) {
	console.error("ERROR: Missing Environment Variables");
	exitError(msg);
}

function exitError(msg) {
	console.error(msg);
	console.error("exiting...");
	process.exit(1);
}

app.listen(BACKEND_PORT, () => {
	console.log(`Server running on port ${BACKEND_PORT}`);
});