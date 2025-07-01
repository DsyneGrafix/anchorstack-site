# Treasure Hunt Roleplay Chat

A fully immersive pirate-themed treasure hunting roleplay chat game built with React, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment to Netlify

#### Option 1: Drag & Drop
1. Run `npm run build`
2. Drag the `dist/` folder to [Netlify Drop](https://app.netlify.com/drop)

#### Option 2: Git Integration
1. Push code to GitHub/GitLab
2. Connect repository in Netlify dashboard
3. Set build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18 or higher

#### Option 3: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

## 🎮 Game Architecture

### Game State Management
The game uses React's `useState` and `useEffect` hooks for state management:

- **Current Scene**: Tracks player's location in the story
- **Score**: Player's treasure hunting progress
- **Timer**: Countdown until pirates arrive
- **Inventory**: Items collected during the adventure
- **Game Status**: Active, won, lost, or completed states

### Story Engine
The story system is built around:
- **Scene-based navigation**: Each location is a separate scene
- **Choice-driven progression**: Player decisions determine story flow
- **Dynamic content**: Messages and choices change based on game state
- **Timer mechanics**: Creates urgency and affects available choices

### Adding New Scenes/Choices

1. **Add new scene data** in `src/data/scenes.json`:
```json
{
  "newLocation": {
    "title": "New Location",
    "description": "Description of the new area",
    "choices": [
      {
        "text": "Choice 1",
        "action": "nextScene",
        "scoreChange": 10,
        "timeChange": -5
      }
    ]
  }
}
```

2. **Update scene transitions** in `TreasureHuntChat.tsx`:
```typescript
case 'newLocation':
  // Add handling for new scene
  break;
```

3. **Add any new game mechanics** in the choice handler functions.

## 📁 Project Structure

```
src/
├── components/
│   └── TreasureHuntChat.tsx    # Main game component
├── data/
│   ├── scenes.json             # All story scenes and choices
│   ├── characters.json         # Character data and dialogue
│   └── items.json              # Game items and descriptions
├── hooks/
│   └── useGameEngine.ts        # Game logic and state management
├── utils/
│   ├── StoryManager.ts         # Story progression utilities
│   └── GameHelpers.ts          # Helper functions
├── types/
│   └── GameTypes.ts            # TypeScript type definitions
└── styles/
    └── animations.css          # Custom animations and effects
```

## 🔧 Dependencies

### Core Dependencies
- **React 18.3.1**: UI framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling framework
- **Lucide React**: Icons

### Development Dependencies
- **Vite**: Build tool and dev server
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixes

### No External APIs
This project runs entirely client-side with no external API dependencies, making it perfect for offline use.

## 🎯 Game Features

- **Interactive Story**: Branching narrative with multiple paths
- **Time Pressure**: Pirates arrive in 10 minutes, creating urgency
- **Score System**: Points for successful treasure hunting
- **Multiple Endings**: Different outcomes based on player choices
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Atmospheric UI**: Pirate-themed design with animations

## 🔄 Story Flow Map

```
Start (Beach) 
├── Explore Cave
│   ├── Light Torch → Deep Cave
│   │   ├── Ancient Chamber → Treasure Found (WIN)
│   │   └── Underground River → Escape Route
│   └── Feel Along Walls → Hidden Passage
│       └── Secret Room → Ancient Treasure (WIN)
├── Climb Cliff
│   ├── Lighthouse → Signal for Help
│   └── Rocky Outcrop → Pirate Ship Spotted
└── Search Jungle
    ├── Follow Path → Village Ruins
    │   └── Explore Ruins → Hidden Vault (WIN)
    └── Machete Through → Waterfall Cave
        └── Behind Waterfall → Crystal Cavern (WIN)
```

## 🚀 Performance Optimizations

- **Code Splitting**: Components loaded on demand
- **Image Optimization**: Responsive images with proper sizing
- **CSS Purging**: Unused Tailwind classes removed in production
- **Bundle Analysis**: Optimized chunk sizes for fast loading

## 🔒 Security Notes

- No user data collection or storage
- No external API calls or data transmission
- Client-side only execution
- No authentication or user accounts required

## 🎨 Customization

### Themes
Modify the color scheme in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      'pirate-gold': '#D4AF37',
      'ocean-blue': '#1e40af',
      // Add custom colors
    }
  }
}
```

### Animations
Custom animations are defined in `src/styles/animations.css` and can be extended or modified.

## 📱 Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Common Issues
1. **Build fails**: Ensure Node.js 16+ is installed
2. **Styles not loading**: Check Tailwind CSS configuration
3. **TypeScript errors**: Run `npm run lint` to identify issues

### Development Tips
- Use React DevTools for debugging game state
- Check browser console for any runtime errors
- Test on multiple screen sizes for responsive design

## 📄 License

This project is open source and available under the MIT License.