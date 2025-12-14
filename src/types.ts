export type Element = 'fire' | 'ice' | 'void' | 'arcane' | 'storm';

export type WordTrait =
  | 'lengthy'
  | 'rare-letter'
  | 'repeater'
  | 'palindrome'
  | 'weakness-hit';

export interface BossSkill {
  name: string;
  description: string;
  tell: string;
}

export interface Boss {
  name: string;
  title: string;
  description: string;
  health: number;
  maxHealth: number;
  quirk: string;
  weakness: Element;
  element: Element;
  sigil: string;
  palette: {
    base: string;
    glow: string;
    accent: string;
  };
  skills: BossSkill[];
  letterBias?: string;
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
