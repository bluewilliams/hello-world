export type Element = 'fire' | 'ice' | 'void' | 'arcane' | 'storm';

export interface Boss {
  name: string;
  description: string;
  health: number;
  maxHealth: number;
  quirk: string;
  weakness: Element;
}

export interface Spell {
  name: string;
  description: string;
  manaCost: number;
  element: Element;
}
