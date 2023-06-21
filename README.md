## 🚀 Run Convoy project

- Deploy locally convoy services
[`Convoy`](https://getconvoy.io/docs/deploy/install-convoy/).

# Get the code
`git clone https://github.com/frain-dev/convoy.git`

# Go to the Convoy folder
`cd convoy`

# Start services
`docker compose -f configs/local/docker-compose.yml up`

# Go to the homepage Convoy Dashboard locally
[`http://localhost:5005/login`](http://localhost:5005/login).

Use default credentials:
- Username: `superuser@default.com`
- Password: `default`

# Test sending events

- Use [`Webhook Site`](https://webhook.site/).
- Copy the URL and use to create endpoint on convoy dashboard

# Connect convoy services

- Rename `.env.example` to `.env`
- Add missing environment variables
- Get `api key`, `project id` and `endpoint id` from convoy instance

## 🚀 Run this project

- Clone this repository
- Install dependencies with `npm install`
- Init mysql container with `docker-compose up -d`
- Create prisma migrations with `npx prisma migrate dev`
- Init server with `npm run dev`

Server is running at [`localhost:4000/`](http://localhost:4000/).