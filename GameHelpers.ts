import { GameState } from '../hooks/useGameEngine';

export const GameHelpers = {
  // Calculate final score based on multiple factors
  calculateFinalScore: (gameState: GameState): number => {
    let finalScore = gameState.score;
    
    // Time bonus - more time remaining = higher bonus
    const timeBonus = Math.floor(gameState.timeRemaining / 10);
    finalScore += timeBonus;
    
    // Exploration bonus - visiting more scenes = higher bonus
    const explorationBonus = gameState.visitedScenes.length * 5;
    finalScore += explorationBonus;
    
    // Efficiency bonus - fewer choices to reach treasure = higher bonus
    if (gameState.gameStatus === 'won') {
      const efficiencyBonus = Math.max(0, 100 - gameState.playerChoices.length * 10);
      finalScore += efficiencyBonus;
    }
    
    return Math.max(0, finalScore);
  },

  // Get performance rating based on score
  getPerformanceRating: (score: number): { rating: string; description: string; color: string } => {
    if (score >= 400) {
      return {
        rating: 'Legendary Treasure Hunter',
        description: 'You are a master of treasure hunting! The pirates fear your name.',
        color: 'text-yellow-400'
      };
    } else if (score >= 300) {
      return {
        rating: 'Expert Explorer',
        description: 'Your skills are impressive. You found treasure with time to spare!',
        color: 'text-orange-400'
      };
    } else if (score >= 200) {
      return {
        rating: 'Skilled Adventurer',
        description: 'Well done! You successfully found treasure before the pirates arrived.',
        color: 'text-green-400'
      };
    } else if (score >= 100) {
      return {
        rating: 'Novice Treasure Seeker',
        description: 'You found some treasure, but there was more to discover.',
        color: 'text-blue-400'
      };
    } else {
      return {
        rating: 'Unlucky Explorer',
        description: 'The island kept its secrets this time. Try again!',
        color: 'text-gray-400'
      };
    }
  },

  // Generate game summary for sharing or saving
  generateGameSummary: (gameState: GameState): string => {
    const finalScore = GameHelpers.calculateFinalScore(gameState);
    const rating = GameHelpers.getPerformanceRating(finalScore);
    const timeUsed = 600 - gameState.timeRemaining;
    
    return `🏴‍☠️ Treasure Hunt Results 🏴‍☠️
    
Status: ${gameState.gameStatus === 'won' ? '🏆 Victory!' : gameState.gameStatus === 'lost' ? '💀 Defeated' : '🤔 Incomplete'}
Rating: ${rating.rating}
Final Score: ${finalScore} points
Time Used: ${Math.floor(timeUsed / 60)}:${(timeUsed % 60).toString().padStart(2, '0')}
Locations Explored: ${gameState.visitedScenes.length}
Choices Made: ${gameState.playerChoices.length}

${rating.description}`;
  },

  // Save game state to localStorage
  saveGameState: (gameState: GameState, slotName: string = 'default'): boolean => {
    try {
      const saveData = {
        gameState,
        timestamp: Date.now(),
        version: '1.0'
      };
      localStorage.setItem(`treasureHunt_save_${slotName}`, JSON.stringify(saveData));
      return true;
    } catch (error) {
      console.error('Failed to save game state:', error);
      return false;
    }
  },

  // Load game state from localStorage
  loadGameState: (slotName: string = 'default'): GameState | null => {
    try {
      const saveData = localStorage.getItem(`treasureHunt_save_${slotName}`);
      if (!saveData) return null;
      
      const parsed = JSON.parse(saveData);
      return parsed.gameState;
    } catch (error) {
      console.error('Failed to load game state:', error);
      return null;
    }
  },

  // Get all save slots
  getSaveSlots: (): Array<{ name: string; timestamp: number; gameState: GameState }> => {
    const saves: Array<{ name: string; timestamp: number; gameState: GameState }> = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('treasureHunt_save_')) {
        try {
          const saveData = JSON.parse(localStorage.getItem(key)!);
          const slotName = key.replace('treasureHunt_save_', '');
          saves.push({
            name: slotName,
            timestamp: saveData.timestamp,
            gameState: saveData.gameState
          });
        } catch (error) {
          console.error(`Failed to parse save slot ${key}:`, error);
        }
      }
    }
    
    return saves.sort((a, b) => b.timestamp - a.timestamp);
  },

  // Delete save slot
  deleteSaveSlot: (slotName: string): boolean => {
    try {
      localStorage.removeItem(`treasureHunt_save_${slotName}`);
      return true;
    } catch (error) {
      console.error('Failed to delete save slot:', error);
      return false;
    }
  },

  // Format timestamp for display
  formatTimestamp: (timestamp: number): string => {
    return new Date(timestamp).toLocaleString();
  },

  // Check if game can be continued (not ended)
  canContinueGame: (gameState: GameState): boolean => {
    return gameState.gameStatus === 'active' && gameState.timeRemaining > 0;
  },

  // Get hint based on current scene and game state
  getHint: (currentScene: string, gameState: GameState): string | null => {
    const hints: Record<string, string> = {
      'start': 'Look for clues about where pirates might hide treasure. Caves and high places are often good choices.',
      'cave': 'Light sources can reveal hidden details, but moving carefully might uncover secrets.',
      'cliff': 'High vantage points can reveal distant treasures, but don\'t ignore what\'s nearby.',
      'jungle': 'Ancient civilizations often built near jungles. Look for stone structures.',
      'deepCave': 'Large chambers often held important ceremonies. Water sources might lead to exits.',
      'lighthouse': 'Lighthouses were used for navigation. Check for charts or signals.',
      'villageRuins': 'Villages had storage areas. Look for the most intact buildings.'
    };

    // Only give hints if player is struggling (low score, many scenes visited)
    if (gameState.score < 20 && gameState.visitedScenes.length > 3) {
      return hints[currentScene] || null;
    }

    return null;
  }
};