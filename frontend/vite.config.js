// vite.config.js
import { defineConfig } from "vite";

const BACKEND_LOCATION = process.env.BACKEND_LOCATION;
const FRONTEND_PORT = process.env.FRONTEND_PORT;

export default defineConfig({
	server: {
		host: '0.0.0.0', // make it accessible to the outside
		port: FRONTEND_PORT,
		// proxy api requests to the nodejs backend
		proxy: {
			"/backend": {
				target: `${BACKEND_LOCATION}`,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/backend/, ""),
			}
		}
	},
});