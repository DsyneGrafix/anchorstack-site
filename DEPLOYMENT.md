# Deployment Guide

## Netlify Deployment

### Method 1: Drag & Drop (Quickest)
1. Build the project: `npm run build`
2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag the `dist/` folder to the deployment area
4. Your site will be live in seconds!

### Method 2: Git Integration (Recommended for ongoing updates)
1. Push your code to GitHub, GitLab, or Bitbucket
2. Log in to [Netlify](https://app.netlify.com)
3. Click "New site from Git"
4. Choose your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18 (set in Environment variables)
6. Click "Deploy site"

### Method 3: Netlify CLI
```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Build the project
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

### Environment Variables for Netlify
If you need to set environment variables in Netlify:

1. Go to your site dashboard in Netlify
2. Navigate to Site settings > Environment variables
3. Add any variables from `.env.example` that you need

Common variables:
- `NODE_ENV=production`
- `VITE_APP_TITLE=Treasure Hunt Adventure`
- `VITE_GAME_DIFFICULTY=normal`

### Custom Domain Setup
1. In Netlify dashboard, go to Domain settings
2. Click "Add custom domain"
3. Follow the DNS configuration instructions
4. SSL certificate will be automatically provisioned

### Performance Optimizations for Production
The build process automatically includes:
- CSS minification and purging
- JavaScript bundling and minification
- Asset optimization
- Gzip compression
- Cache headers for static assets

### Monitoring and Analytics
- Netlify provides built-in analytics
- You can add Google Analytics by setting `VITE_ANALYTICS_ID`
- Error monitoring can be added with Sentry using `VITE_SENTRY_DSN`

### Troubleshooting Deployment Issues

**Build fails with "command not found":**
- Ensure Node.js version is set to 18 in environment variables
- Check that all dependencies are listed in `package.json`

**Site loads but shows blank page:**
- Check browser console for JavaScript errors
- Verify all assets are loading correctly
- Ensure environment variables are set if required

**Routing issues (404 on refresh):**
- The `netlify.toml` file includes redirects for SPA routing
- Ensure this file is in your repository root

**Slow loading:**
- Enable Netlify's asset optimization features
- Consider implementing code splitting if bundle size is large
- Use Netlify's CDN for faster global delivery