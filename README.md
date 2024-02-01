## Business requirements

Specification #3 (better for senior)
We need a Frontend + Backend application that allows you to post and visualize metrics.
Each metric will have: Timestamp, name, and value.
The metrics will be shown in a timeline and must show averages per minute/hour/day.
The metrics will be persisted in the database.

# Video

[![Loom video](https://cdn.loom.com/sessions/thumbnails/0daf9b006636473fb6775046f1c81cc4-with-play.gif)](https://www.loom.com/share/0daf9b006636473fb6775046f1c81cc4?sid=1236adfb-9434-4e3d-8682-187623e8ffe3 "Loom video")

# Installation

## Requirements

- Docker. [Install docker](https://docs.docker.com/get-docker/)
- NodeJS `version >= 20.x`
- pnpm `version = 8.x` [pnpm install documentation](https://pnpm.io/installation)

## How install the right versions

- If you installed something with the wrong version, delete the repo. Deleting node_module + lock will not work.
- Install pnpm: `brew install pnpm@8.12.1` + `brew info pnpm` + `brew switch pnpm 8.12.1`
- Install node 20: `pnpm env use --global 20`
- Enable corepack: `corepack enable`
- Install pnpm: `corepack prepare pnpm@7.3.0 --activate`
- Install dependencies: `pnpm i`
- Start: `pnpm run start`

# How to run
- Start docker demon 
- Start docker compose `docker-compose up -d`. This will:
    - Start influxdb. https://www.influxdata.com/
- Setup the database explained in docker-compose.yml
- Start api `pnpm run dev` + with the envs (api/.env.dev)
- Start web `pnpm run dev`
- Go to http://localhost:3000

```shell
# Api

### Generate api doc
    
```shell
pnpm tsoa routes
pnpm tsoa spec
```

### Generate typescript client

```shell
npx swagger-typescript-api -p ./api/docs/swagger.json -o ./web/src/app/_api -n metrics-api.ts
```




# Docs

# Post

Request

```shell
curl --location --request POST 'localhost:7070/api/v1/metrics' \
--header 'Content-Type: application/json' \
--data '{
    "value": 10,
    "timestamp": "2023-12-18T17:00-03:00",
    "name": "temperature"
}'
```

Response

```json
{
  "tags": {},
  "fields": {
    "value": "10"
  },
  "name": "temperature",
  "time": "2023-12-18T20:00:00.000Z"
}
```

# Get

Request

```shell
curl --location --request GET 'localhost:7070/api/v1/metrics?from=2023-12-18T18%3A00%3A00Z&to=2023-12-18T21%3A00%3A00Z&name=temperature'
```

Reponse

```json
[
  {
    "value": 10,
    "timestamp": "2023-12-18T20:00:00Z",
    "name": "temperature"
  }
]
```

# Next steps
- Share the 'metric selector' between the form and the chart.
- Test suite. Unit + integration.
- Adapt to UI mobile first.
- Use hexagonal architecture instead of layers.
- Error handling in backend and frontend.