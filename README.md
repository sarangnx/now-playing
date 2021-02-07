<p align="center">
    <h2 align="center">Now Playing</h2>
    <p align="center">Showcase what you're listening to on your github README.</p>
</p>

---

## Setting up for development

For dynamodb, install [localstack](https://github.com/localstack/localstack).

```bash
# starting localstack with just dynamodb

SERVICES=dynamodb localstack start
```

Required Evnironment variables 

```bash
NODE_ENV=development

AWS_ENDPOINT=http://0.0.0.0:4566
DYNAMODB_ACCESS_KEY_ID=testkey
DYNAMODB_SECRET_ACCESS_KEY=test
DYNAMODB_REGION=ap-south-1

# get a soptify developer account
# https://developer.spotify.com/
SPOTIFY_CLIENT_ID=spot-id
SPOTIFY_CLIENT_SECRET=spot-secret
REDIRECT_URI=http://localhost:3000/api/callback

ENC_KEY=32-character-string
```

```bash
# install dependencies
yarn

# start
yarn dev
```


## Deploy Your Own

Deloy your own instance on vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/sarangnx/spotify-now-playing)
