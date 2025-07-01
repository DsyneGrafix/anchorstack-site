# Treasure Hunt Story Flow Map

## Story Structure Overview

The treasure hunt follows a branching narrative structure where player choices determine the path through the adventure. Each decision affects the score, time remaining, and available future options.

## Main Story Paths

### 🏖️ Starting Point: Beach
**Scene**: `start`
**Description**: Player washes ashore and must choose initial exploration direction
**Time Limit**: 10 minutes (600 seconds)

```
START (Beach)
├── 🕳️ Cave Path
├── 🏔️ Cliff Path  
└── 🌿 Jungle Path
```

---

## 🕳️ Cave Path Branch

### Cave Entrance → Deep Exploration
```
cave
├── 🔥 Light Torch → deepCave
│   ├── 🏛️ Ancient Chamber → ancientChamber → 🏆 TREASURE WIN
│   └── 🌊 Underground River → undergroundRiver → Escape Route
└── 👋 Feel Walls → hiddenPassage
    ├── 📜 Study Maps → mapDiscovery → 🏆 TREASURE WIN  
    └── 💰 Quick Escape → quickEscape → Moderate Success
```

**Key Outcomes:**
- **Best Path**: Light Torch → Ancient Chamber (50 points, major treasure)
- **Alternative Win**: Feel Walls → Study Maps (20 points, maps treasure)
- **Safe Path**: Quick Escape (15 points, guaranteed survival)

---

## 🏔️ Cliff Path Branch

### Lighthouse Route → High Ground Advantage
```
cliff
├── 🗼 Lighthouse → lighthouse
│   ├── 🔦 Signal Help → signalHelp → Rescue Attempt
│   └── 🏃‍♂️ Hidden Cove → hiddenCove → 🏆 TREASURE WIN
└── 🪨 Rocky Outcrop → rockyOutcrop
    └── 👁️ Spot Pirates → pirateWarning → Strategic Advantage
```

**Key Outcomes:**
- **Best Path**: Lighthouse → Hidden Cove (15 points, coastal treasure)
- **Safe Path**: Signal for Help (10 points, potential rescue)
- **Intel Path**: Rocky Outcrop (5 points, pirate locations)

---

## 🌿 Jungle Path Branch

### Ancient Ruins → Archaeological Discovery
```
jungle
├── 🛤️ Well-worn Path → villageRuins
│   ├── 🏛️ Intact Building → treasureVault → 🏆 TREASURE WIN
│   └── 🕳️ Old Wells → hiddenWells → Minor Treasure
└── 🗡️ Stone Structures → ancientRuins
    ├── 🧩 Solve Puzzle → templeTreasure → 🏆 LEGENDARY WIN
    └── 🔍 Search Exterior → templeExterior → Alternative Entry
```

**Key Outcomes:**
- **Best Path**: Stone Structures → Temple Puzzle (40 points, legendary treasure)
- **Good Path**: Village → Treasure Vault (25 points, stored treasure)
- **Safe Path**: Old Wells (10 points, minor finds)

---

## 🏆 Victory Conditions

### Treasure Win Scenarios
1. **Ancient Chamber** (Cave → Torch → Chamber): Blackbeard's main treasure
2. **Map Discovery** (Cave → Walls → Maps): Pirate navigation charts
3. **Hidden Cove** (Cliff → Lighthouse → Cove): Coastal treasure cache
4. **Treasure Vault** (Jungle → Village → Vault): Stored community treasure
5. **Temple Treasure** (Jungle → Ruins → Puzzle): Ancient ceremonial treasure

### Scoring System
- **Base Score**: Points from choices and discoveries
- **Time Bonus**: Remaining time × 0.1
- **Exploration Bonus**: Unique locations × 5
- **Efficiency Bonus**: Fewer choices to win = higher bonus

---

## ⏰ Time Management Strategy

### Time Costs by Action Type
- **Quick Actions**: -1 minute (feeling walls, quick searches)
- **Standard Actions**: -2 minutes (most exploration choices)
- **Complex Actions**: -3 to -4 minutes (puzzles, detailed exploration)

### Optimal Time Paths
1. **Speed Run**: Cave → Walls → Quick Escape (4 minutes, 15 points)
2. **Balanced**: Jungle → Village → Vault (5 minutes, 25 points)
3. **High Risk**: Jungle → Ruins → Puzzle (7 minutes, 40 points)

---

## 🎯 Strategic Decision Points

### Critical Choice Moments
1. **Initial Path Selection**: Determines available treasure types
2. **Cave Light Decision**: Risk/reward for major treasure
3. **Temple Puzzle**: Highest reward but highest time cost
4. **Lighthouse Signal**: Safety vs. continued exploration

### Risk Assessment
- **Low Risk**: Village ruins, lighthouse signaling
- **Medium Risk**: Cave exploration, cliff climbing  
- **High Risk**: Temple puzzles, deep cave exploration

---

## 🔄 Replayability Features

### Multiple Endings
- **Victory**: Found major treasure before pirates arrive
- **Partial Success**: Found minor treasure, escaped safely
- **Defeat**: Pirates arrived before treasure found
- **Rescue**: Signaled for help successfully

### Hidden Content
- **Secret Passages**: Discovered through careful exploration
- **Alternative Routes**: Multiple ways to reach same treasures
- **Easter Eggs**: Special descriptions for thorough explorers

---

## 📊 Story Statistics

- **Total Scenes**: 15+ unique locations
- **Decision Points**: 30+ meaningful choices
- **Possible Endings**: 8 different outcomes
- **Treasure Locations**: 5 major treasure finds
- **Average Playthrough**: 6-8 minutes
- **Completion Paths**: 12+ different successful routes

This branching structure ensures that each playthrough can feel unique while maintaining clear progression toward meaningful goals and outcomes.