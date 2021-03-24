# How to run locally

```bash
npm run serve
open http://localhost:5001/cuegenerator/us-central1/api
```

# How to build and deploy

Automatic deployments use GitHub Actions and are triggered on push to the `main` branch if commit contains "(release):" string. To make a release run `npm run release`. That's it! `standard-version` will run the `postrelease` script in the `package.json` which will take care about the rest.

A manual deployment can be run

```bash
npm run deploy
open https://us-central1-cuegenerator.cloudfunctions.net/api
```

# How to develop

## API protocol

### Obtain token

Make a request to obtain a JSON web token to use in all subsequent requests. **Note** the expiration time is set to one hour.

**Request**

```
GET /
```

**Response**

```
{"token": "..."}
```

### Get counter value

**Request**

```
GET /counter
Authorization: Bearer <token>
```

**Response**

```
{"counter": "<number>"}
```

### Send data

Submit cue and bump up the counter

**Request**

```
POST /counter

Content-Type: application/json
Authorization: Bearer <token>

{
	"performer": "<string>",
	"title": "<string>",
	"fileName": "<string>",
	"cue": "<string>"
}
```

**Response**

```
{"counter": "<number>"}
```
