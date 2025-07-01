export interface GameState {
  currentScene: string;
  score: number;
  timeRemaining: number;
  inventory: string[];
  gameStatus: 'active' | 'won' | 'lost' | 'completed';
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
  isHidden?: boolean;
  condition?: (gameState: GameState) => boolean;
}

export interface Scene {
  title: string;
  description: string;
  choices: Choice[];
  isEndScene?: boolean;
  treasureFound?: boolean;
  backgroundImage?: string;
  musicTrack?: string;
  specialEffects?: string[];
}

export interface Character {
  name: string;
  description: string;
  personality: string;
  catchphrases?: string[];
  dialogue?: string[];
  avatar?: string;
}

export interface Item {
  name: string;
  description: string;
  value?: number;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  location?: string;
  durability?: number;
  hint?: string;
}

export interface GameConfig {
  initialTime: number;
  tickInterval: number;
  maxScore: number;
  difficultyLevel: 'easy' | 'normal' | 'hard';
  enableHints: boolean;
  enableSaveLoad: boolean;
}

export interface SaveData {
  gameState: GameState;
  timestamp: number;
  version: string;
  playerName?: string;
  difficulty?: string;
}

export interface GameStatistics {
  totalScenes: number;
  totalChoices: number;
  treasureScenes: number;
  endScenes: number;
  averageChoicesPerScene: number;
}

export interface PerformanceRating {
  rating: string;
  description: string;
  color: string;
  icon?: string;
}

export type GameEvent = 
  | { type: 'CHOICE_MADE'; payload: { choice: Choice; scene: string } }
  | { type: 'SCENE_ENTERED'; payload: { scene: string } }
  | { type: 'ITEM_FOUND'; payload: { item: string } }
  | { type: 'TIME_WARNING'; payload: { timeRemaining: number } }
  | { type: 'GAME_WON'; payload: { finalScore: number } }
  | { type: 'GAME_LOST'; payload: { reason: string } }
  | { type: 'GAME_RESET'; payload: {} };

export interface GameEventHandler {
  onChoiceMade?: (choice: Choice, scene: string) => void;
  onSceneEntered?: (scene: string) => void;
  onItemFound?: (item: string) => void;
  onTimeWarning?: (timeRemaining: number) => void;
  onGameWon?: (finalScore: number) => void;
  onGameLost?: (reason: string) => void;
  onGameReset?: () => void;
}