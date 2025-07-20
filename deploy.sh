#!/bin/bash

cp _redirects dist/_redirects

# === AnchorStack Deploy Script ===
# Builds the site and pushes to Netlify (Production)

# Step 1: Clean build
printf "\n🔧 Building site...\n"
npm run build || {
  echo "❌ Build failed. Check errors above.";
  exit 1;
}

# Step 2: Deploy to Netlify Production
printf "\n🚀 Deploying to Netlify...\n"
npx netlify deploy --prod --dir=dist || {
  echo "❌ Deploy failed. Check Netlify output.";
  exit 1;
}

# Step 3: Success
printf "\n✅ Vault successfully deployed to production!\n"
