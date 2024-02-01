## Business requirements

Specification #3 (better for senior)
We need a Frontend + Backend application that allows you to post and visualize metrics.
Each metric will have: Timestamp, name, and value.
The metrics will be shown in a timeline and must show averages per minute/hour/day.
The metrics will be persisted in the database.

# Installation

## Requirements

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