#!/bin/bash

# ✅ Check and display current working directory
echo "📂 Current working directory: $(pwd)"

# Check if inside a git repo
if [ ! -d .git ]; then
  echo "❌ Not inside a Git repository."
  exit 1
fi

# Prompt for commit message if not provided
if [ -z "$1" ]; then
  read -p "Enter commit message: " COMMIT_MESSAGE
else
  COMMIT_MESSAGE="$1"
fi

# Use current branch name
BRANCH=$(git rev-parse --abbrev-ref HEAD)

git add .
git commit -m "$COMMIT_MESSAGE"
git push origin "$BRANCH"
echo "✅ Changes committed and pushed to branch '$BRANCH'."