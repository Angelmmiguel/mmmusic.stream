#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

# Configure git
echo "Configuring git"
git config user.name "mmmusic bot"
git config user.email "bot@mmmusic.stream"

# Decrypt
openssl aes-256-cbc -K $encrypted_74ab3a7c3726_key -iv $encrypted_74ab3a7c3726_iv -in rsa.enc -out rsa -d
chmod 600 rsa
eval `ssh-agent -s`
ssh-add rsa

# Run the channels cleanup
yarn run channels:clean

if [[ `git status --porcelain` ]]; then
  # Commit the changes
  echo "Pushing the changes"
  git add channels.json
  git commit -m "Automatically clean channels"
  git push
fi
