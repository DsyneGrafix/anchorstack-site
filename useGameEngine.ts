import { useState, useEffect, useCallback } from 'react';

export interface GameState {
  currentScene: string;
  score: number;
  timeRemaining: number;
  inventory: string[];
  gameStatus: 'active' | 'won' | lost' | \'completed';
  visitedScenes: string[];
  playerChoices: Array<{
    scene: string;
    choice: string;
    timestamp: number;
  }>;
}

export interface Choice {
  text: string;
  action: string;
  scoreChange: number;
  timeChange: number;
  description: string;
  requiresItem?: string;
  addsItem?: string;
}

export interface Scene {
  title: string;
  description: string;
  choices: Choice[];
  isEndScene?: boolean;
  treasureFound?: boolean;
}

const INITIAL_TIME = 600; // 10 minutes in seconds
const GAME_TICK_INTERVAL = 1000; // 1 second

export const useGameEngine = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentScene: 'start',
    score: 0,
    timeRemaining: INITIAL_TIME,
    inventory: [],
    gameStatus: 'active',
    visitedScenes: ['start'],
    playerChoices: []
  });

  // Game timer
  useEffect(() => {
    if (gameState.gameStatus !== 'active') return;

    const timer = setInterval(() => {
      setGameState(prev => {
        if (prev.timeRemaining <= 1) {
          return {
            ...prev,
            timeRemaining: 0,
            gameStatus: 'lost'
          };
        }
        return {
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        };
      });
    }, GAME_TICK_INTERVAL);

    return () => clearInterval(timer);
  }, [gameState.gameStatus]);

  const makeChoice = useCallback((choice: Choice, sceneName: string) => {
    setGameState(prev => {
      const newScore = Math.max(0, prev.score + choice.scoreChange);
      const newTime = Math.max(0, prev.timeRemaining + choice.timeChange);
      const newInventory = choice.addsItem 
        ? [...prev.inventory, choice.addsItem]
        : prev.inventory;
      
      const newVisitedScenes = prev.visitedScenes.includes(choice.action)
        ? prev.visitedScenes
        : [...prev.visitedScenes, choice.action];

      const newPlayerChoices = [
        ...prev.playerChoices,
        {
          scene: prev.currentScene,
          choice: choice.text,
          timestamp: Date.now()
        }
      ];

      // Check win conditions
      let newGameStatus = prev.gameStatus;
      if (choice.action === 'treasureWin' || choice.action === 'templeTreasure') {
        newGameStatus = 'won';
      } else if (newTime <= 0) {
        newGameStatus = 'lost';
      }

      return {
        ...prev,
        currentScene: choice.action,
        score: newScore,
        timeRemaining: newTime,
        inventory: newInventory,
        gameStatus: newGameStatus,
        visitedScenes: newVisitedScenes,
        playerChoices: newPlayerChoices
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      currentScene: 'start',
      score: 0,
      timeRemaining: INITIAL_TIME,
      inventory: [],
      gameStatus: 'active',
      visitedScenes: ['start'],
      playerChoices: []
    });
  }, []);

  const formatTime = useCallback((seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  const getGameProgress = useCallback((): number => {
    const totalScenes = 15; // Approximate total scenes in the game
    return (gameState.visitedScenes.length / totalScenes) * 100;
  }, [gameState.visitedScenes.length]);

  const canMakeChoice = useCallback((choice: Choice): boolean => {
    if (choice.requiresItem) {
      return gameState.inventory.includes(choice.requiresItem);
    }
    return true;
  }, [gameState.inventory]);

  return {
    gameState,
    makeChoice,
    resetGame,
    formatTime,
    getGameProgress,
    canMakeChoice
  };
};