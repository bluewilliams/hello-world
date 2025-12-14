export type Element = 'fire' | 'ice' | 'void' | 'arcane' | 'storm';

export type WordTrait =
  | 'lengthy'
  | 'rare-letter'
  | 'repeater'
  | 'palindrome'
  | 'weakness-hit';

export interface Boss {
  name: string;
  description: string;
  health: number;
  maxHealth: number;
  quirk: string;
  weakness: Element;
}

export interface PlayerState {
  health: number;
  maxHealth: number;
  shield: number;
  combo: number;
}

export interface Spell {
  name: string;
  description: string;
  manaCost: number;
  element: Element;
}

export interface WordResolution {
  damage: number;
  element: Element;
  traits: WordTrait[];
  manaBonus: number;
  shieldBonus: number;
}
