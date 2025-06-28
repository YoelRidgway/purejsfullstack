# Fullstack PureJs Template
This is a template repository to simplify the creation of full stack web projects using a minimal pure js environment.
- Tech Stack:
	- Node/Express => Backend/API
	- Vite => Dev server/Frontend builder
	- WebComponents => PureJs frontend "framework"
	- Nginx (Optional) => Production server
	- Docker (Optional) => Easy build and run on any environment

## Quick Start
### Development
When in development mode, [ViteJs](https://github.com/vitejs/vite) will serve the frontend with live hot reloading on code changes and [NodeJs](https://github.com/nodejs/node) + [ExpressJs](https://github.com/expressjs/express) will power the backend using [Nodemon](https://github.com/remy/nodemon) to automaticaly restart the server on code changes.
```bash
# dev server will run on http://localhost:5173
docker compose -f docker-compose.dev.yaml up --build
```
This will create two [Docker](https://www.docker.com/) containers based on the Node image. `frontend` will serve the frontend files using Vite, and `backend` will be the API using ExpressJs.
### Production
In production, Vite will build the static files and [Nginx](https://github.com/nginx/nginx) will serve them from a 
```bash
# production server will run on http://localhost:80
docker compose up --build
```
Like development mode, this will create two containers (`frontend` and `backend`) with one running Express, but the other container will now build the frontend code using Vite and serve them using Nginx. This is because Nginx is better adapted and more performant when serving static files, it also decouples the backend and the frontend allowing the frontend and backend containers to be run on seperate environments.

### No Docker and Nginx
If you would like to build the application without using Docker, it can be done using the following steps:
1. `cd ./backend`
2. `npm run dev` or `npm start` in production
3. go to another terminal
4. `cd ./frontend`
5. `npm run dev` or `npm run build` to build files for production serving

It is up to you how you serve the static files after running these steps. They will be available in the [./frontend/build/](./frontend/build/) folder.

### Requirements
#### If using Docker: 
Only Docker!
#### Otherwise:
NodeJs + something to serve static files (e.g. Nginx)

## Architecture
This diagram is a bit useless and overcomplicates things but I spent time making it so keeping it here lol ;)
```mermaid
graph TD
	subgraph Development
		subgraph Docker container
			ViteDev -->|Serves| Clients
		end
		subgraph Docker container
			ExpressDev <-->|API| ViteDev
		end
	end

	subgraph Production
		subgraph Docker build step
			Vite -->|Builds| StatFiles["Static Files"]
		end
		subgraph Docker container
			StatFiles -->|Served By| Nginx
		end
		subgraph Docker container
			Express <-->|API| Nginx
		end
		Nginx --> Users
	end
```