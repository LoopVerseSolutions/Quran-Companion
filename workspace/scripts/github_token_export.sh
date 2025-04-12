#!/bin/bash

# Script to export a Quran Companion app from Replit to GitHub using a Personal Access Token
# Usage: ./github_token_export.sh <github_repo_url> <github_token>

set -e

# Check if GitHub repository URL and token are provided
if [ -z "$1" ] || [ -z "$2" ]; then
  echo "Error: GitHub repository URL and personal access token are required"
  echo "Usage: ./github_token_export.sh <github_repo_url> <github_token>"
  exit 1
fi

GITHUB_REPO_URL=$1
GITHUB_TOKEN=$2
TEMP_DIR=$(mktemp -d)

echo "=== Quran Companion App Export Tool (GitHub Token Version) ==="
echo "This script will help you export your Replit app to GitHub using a personal access token."
echo "GitHub Repo: $GITHUB_REPO_URL"
echo "Temporary directory: $TEMP_DIR"

# Check if git is installed
if ! command -v git &> /dev/null; then
  echo "Error: git is not installed. Please install git to continue."
  exit 1
fi

# Prepare a clean export directory
echo "Creating local git repository..."
mkdir -p $TEMP_DIR
cd $TEMP_DIR
git init
git branch -M main

# Create necessary directories
mkdir -p docs
mkdir -p .github/workflows
mkdir -p scripts

# Navigate back to the Replit project root
cd /home/runner

# Copy files from the current Replit project
echo "Copying files from Replit project..."

# Detect the type of project and copy files
if [ -f "package.json" ]; then
  echo "Detected Node.js project..."
  find . -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" -o -name "*.html" -o -name "*.css" -o -name "*.json" \) -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/\.*" -exec cp --parents {} $TEMP_DIR/ \;
elif [ -f "requirements.txt" ]; then
  echo "Detected Python project..."
  find . -type f \( -name "*.py" -o -name "*.html" -o -name "*.css" -o -name "*.json" \) -not -path "*/venv/*" -not -path "*/.git/*" -not -path "*/\.*" -exec cp --parents {} $TEMP_DIR/ \;
else
  echo "Project type not recognized. Copying all non-binary files..."
  find . -type f -not -path "*/node_modules/*" -not -path "*/venv/*" -not -path "*/.git/*" -not -path "*/\.*" | grep -v -E '\.jpg$|\.png$|\.gif$|\.mp3$|\.wav$|\.pdf$|\.eot$|\.ttf$|\.woff$|\.woff2$' | xargs -I{} cp --parents {} $TEMP_DIR/
  
  # Copy the prototype directory specifically (including any binary files like images)
  if [ -d "prototype" ]; then
    echo "Copying prototype directory..."
    cp -r prototype $TEMP_DIR/
  fi
fi

# Copy documentation files
echo "Ensuring documentation files exist..."

# Create README.md if it doesn't exist in the temp directory
if [ ! -f "$TEMP_DIR/README.md" ] && [ -f "README.md" ]; then
  echo "Copying README.md"
  cp README.md $TEMP_DIR/README.md
elif [ ! -f "$TEMP_DIR/README.md" ]; then
  echo "README.md not found, will be generated"
fi

# Copy other documentation files if they exist
if [ -f "CONTRIBUTING.md" ]; then
  echo "Copying CONTRIBUTING.md"
  cp CONTRIBUTING.md $TEMP_DIR/CONTRIBUTING.md
fi

if [ -f "LICENSE" ]; then
  echo "Copying LICENSE"
  cp LICENSE $TEMP_DIR/LICENSE
fi

# Make sure the docs directory exists
mkdir -p $TEMP_DIR/docs

# Copy doc files if they exist
if [ -f "docs/ENVIRONMENT_VARIABLES.md" ]; then
  echo "Copying ENVIRONMENT_VARIABLES.md"
  cp docs/ENVIRONMENT_VARIABLES.md $TEMP_DIR/docs/ENVIRONMENT_VARIABLES.md
fi

if [ -f "docs/API_DOCUMENTATION.md" ]; then
  echo "Copying API_DOCUMENTATION.md"
  cp docs/API_DOCUMENTATION.md $TEMP_DIR/docs/API_DOCUMENTATION.md
fi

if [ -f "docs/DEPLOYMENT.md" ]; then
  echo "Copying DEPLOYMENT.md"
  cp docs/DEPLOYMENT.md $TEMP_DIR/docs/DEPLOYMENT.md
fi

# Copy GitHub workflow file if it exists
if [ -f ".github/workflows/ci.yml" ]; then
  echo "Copying CI workflow"
  mkdir -p $TEMP_DIR/.github/workflows
  cp .github/workflows/ci.yml $TEMP_DIR/.github/workflows/ci.yml
fi

# Copy .gitignore if it exists
if [ -f ".gitignore" ]; then
  echo "Copying .gitignore"
  cp .gitignore $TEMP_DIR/.gitignore
fi

# Configure Git user and commit changes
echo "Committing changes..."
cd $TEMP_DIR
git add .

# Configure Git user
git config user.email "quran.companion@example.com"
git config user.name "Quran Companion Export Tool"

# Commit with meaningful message
git commit -m "Export Quran Companion app from Replit" -m "Automatically exported using the Quran Companion Export Tool on $(date)"

# Use GitHub token for authentication
echo "Pushing to GitHub using personal access token..."
# Extract the repository name from the URL
REPO_NAME=$(echo $GITHUB_REPO_URL | sed -e 's/.*github.com\///g' -e 's/\.git//g')

# Use HTTPS with token authentication
TOKEN_URL=$(echo $GITHUB_REPO_URL | sed "s/https:\/\//https:\/\/$GITHUB_TOKEN@/g")
git remote add origin $TOKEN_URL

# Try to pull existing content first
echo "Attempting to integrate with existing repository content..."
git pull --no-edit origin main || echo "Repository may be empty or not yet initialized"

# Force push to GitHub (use with caution!)
echo "Pushing to GitHub..."
if git push -u origin main --force; then
  echo "Successfully pushed to GitHub!"
else
  echo "ERROR: Failed to push to GitHub."
  echo "Please check your token permissions and repository settings."
  exit 1
fi

echo "=== Export Complete ==="
echo "Your Quran Companion app has been successfully exported to GitHub."
echo "Repository URL: https://github.com/$REPO_NAME"
echo ""
echo "Next steps:"
echo "1. Review the exported code on GitHub"
echo "2. Set up any required environment variables"
echo "3. Configure GitHub Pages or other deployment options"
echo "4. Update the README with specific details about your app"

echo "Done!"