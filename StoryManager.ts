import { Scene, Choice } from '../hooks/useGameEngine';
import scenesData from '../data/scenes.json';

export class StoryManager {
  private scenes: Record<string, Scene>;

  constructor() {
    this.scenes = scenesData as Record<string, Scene>;
  }

  getScene(sceneId: string): Scene | null {
    return this.scenes[sceneId] || null;
  }

  getAllScenes(): Record<string, Scene> {
    return this.scenes;
  }

  getSceneChoices(sceneId: string): Choice[] {
    const scene = this.getScene(sceneId);
    return scene?.choices || [];
  }

  isEndScene(sceneId: string): boolean {
    const scene = this.getScene(sceneId);
    return scene?.isEndScene || false;
  }

  hasTreasure(sceneId: string): boolean {
    const scene = this.getScene(sceneId);
    return scene?.treasureFound || false;
  }

  getScenesByType(type: 'treasure' | 'danger' | 'exploration'): string[] {
    const sceneIds: string[] = [];
    
    Object.entries(this.scenes).forEach(([id, scene]) => {
      switch (type) {
        case 'treasure':
          if (scene.treasureFound) sceneIds.push(id);
          break;
        case 'danger':
          if (scene.choices.some(choice => choice.timeChange < -2)) sceneIds.push(id);
          break;
        case 'exploration':
          if (scene.choices.length > 2) sceneIds.push(id);
          break;
      }
    });

    return sceneIds;
  }

  validateStoryFlow(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    const allSceneIds = Object.keys(this.scenes);

    // Check for orphaned scenes (scenes that can't be reached)
    const reachableScenes = new Set(['start']);
    const queue = ['start'];

    while (queue.length > 0) {
      const currentScene = queue.shift()!;
      const scene = this.getScene(currentScene);
      
      if (scene) {
        scene.choices.forEach(choice => {
          if (!reachableScenes.has(choice.action)) {
            reachableScenes.add(choice.action);
            queue.push(choice.action);
          }
        });
      }
    }

    const orphanedScenes = allSceneIds.filter(id => !reachableScenes.has(id));
    if (orphanedScenes.length > 0) {
      errors.push(`Orphaned scenes found: ${orphanedScenes.join(', ')}`);
    }

    // Check for broken references
    Object.entries(this.scenes).forEach(([sceneId, scene]) => {
      scene.choices.forEach(choice => {
        if (!allSceneIds.includes(choice.action) && !this.isSpecialAction(choice.action)) {
          errors.push(`Scene "${sceneId}" references non-existent scene "${choice.action}"`);
        }
      });
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private isSpecialAction(action: string): boolean {
    const specialActions = ['treasureWin', 'gameOver', 'restart', 'escape'];
    return specialActions.includes(action);
  }

  getStoryStatistics() {
    const scenes = Object.values(this.scenes);
    const totalChoices = scenes.reduce((sum, scene) => sum + scene.choices.length, 0);
    const treasureScenes = scenes.filter(scene => scene.treasureFound).length;
    const endScenes = scenes.filter(scene => scene.isEndScene).length;

    return {
      totalScenes: scenes.length,
      totalChoices,
      treasureScenes,
      endScenes,
      averageChoicesPerScene: Math.round(totalChoices / scenes.length * 10) / 10
    };
  }

  exportStoryMap(): string {
    const map: Record<string, string[]> = {};
    
    Object.entries(this.scenes).forEach(([sceneId, scene]) => {
      map[sceneId] = scene.choices.map(choice => choice.action);
    });

    return JSON.stringify(map, null, 2);
  }
}