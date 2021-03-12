# How to run locally

```bash
npm --prefix functions run serve
open http://localhost:5001/cuegenerator/us-central1/api
```

# How to build and deploy

```bash
npm --prefix functions run deploy
open https://us-central1-cuegenerator.cloudfunctions.net/api
```

# How to develop
## API protocol

### Obtain token
Make a request to obtain a JSON web token

**Request**

```
GET /
```

**Response**

```
{"token": "..."}
```

### Send data
Submit cue and bump the counter

**Request**

```
POST /

Content-Type: application/json
Authorization: Bearer <token>

{"cue": "<string>"}
```

**Response**

```
{"counter": "<number>"}
```
