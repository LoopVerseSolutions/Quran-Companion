# Environment Variables

This document describes the environment variables required to run the Quran Companion application.

## Required Environment Variables

| Variable Name | Description | Example Value |
|---------------|-------------|--------------|
| API_KEY | API key for the Quran API service | `your_api_key_here` |
| DATABASE_URL | Connection string for the database | `mongodb://username:password@host:port/database` |
| JWT_SECRET | Secret key for JWT authentication | `your_jwt_secret_here` |

## Optional Environment Variables

| Variable Name | Description | Default Value | Example Value |
|---------------|-------------|--------------|--------------|
| PORT | Port for the server to listen on | `8000` | `3000` |
| NODE_ENV | Environment (development, production, test) | `development` | `production` |
| LOG_LEVEL | Level of logging | `info` | `debug` |
| CORS_ORIGIN | CORS allowed origins | `*` | `https://yourfrontend.com` |

## Setting Up Environment Variables

### Local Development

Create a `.env` file in the root directory of the project with the following format:

