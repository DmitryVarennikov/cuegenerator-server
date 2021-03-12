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

{"counter": "<number>", "cue": "<string>"}
```

**Response**

```
{"cue": "<string>"}
```
