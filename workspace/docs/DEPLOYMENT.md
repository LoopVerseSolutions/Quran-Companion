# Deployment Guide

This document provides instructions for deploying the Quran Companion application to various environments.

## Prerequisites

Before deployment, ensure you have:

1. A GitHub account
2. Necessary environment variables ready (see [Environment Variables](ENVIRONMENT_VARIABLES.md))
3. Access to your chosen hosting platform
4. Domain name (optional but recommended for production)

## Deployment Options

### Option 1: Vercel (Recommended for JavaScript/React/Next.js applications)

1. Fork the repository to your GitHub account
2. Sign up for a [Vercel account](https://vercel.com/) if you don't have one
3. In Vercel dashboard, click "New Project"
4. Import your GitHub repository
5. Configure the project:
   - Set the framework preset if not auto-detected
   - Configure build settings if needed
   - Add environment variables
6. Click "Deploy"

### Option 2: Netlify (Good for static sites or JAMstack applications)

1. Fork the repository to your GitHub account
2. Sign up for a [Netlify account](https://www.netlify.com/) if you don't have one
3. In Netlify dashboard, click "New site from Git"
4. Choose GitHub as your Git provider
5. Select your repository
6. Configure build settings:
   - Build command: `npm run build` (or your specific build command)
   - Publish directory: `build` or `dist` (depending on your build output)
7. Add environment variables under "Advanced build settings"
8. Click "Deploy site"

### Option 3: Heroku (For full-stack applications)

1. Fork the repository to your GitHub account
2. Sign up for a [Heroku account](https://www.heroku.com/) if you don't have one
3. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
4. Log in to Heroku CLI:
   ```
   heroku login
   