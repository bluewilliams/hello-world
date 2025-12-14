import type { Boss } from '../types';

const bosses: Boss[] = [
  {
    name: 'The Leximancer',
    description: 'A flaming tome that consumes vowels every third turn.',
    health: 220,
    maxHealth: 220,
    quirk: 'Removes vowels; vulnerable to long words.',
    weakness: 'fire'
  },
  {
    name: 'Queen Anagramma',
    description: 'She scrambles learned spells, forcing improvisation.',
    health: 180,
    maxHealth: 180,
    quirk: 'Scrambles spell names each round.',
    weakness: 'arcane'
  },
  {
    name: 'The Silent Editor',
    description: 'Rejects typos and punishes sloppy spelling.',
    health: 200,
    maxHealth: 200,
    quirk: 'Invalid words trigger backlash.',
    weakness: 'void'
  }
];

export function pickBoss(): Boss {
  return bosses[Math.floor(Math.random() * bosses.length)];
}

const letterBag = 'AABCDEEEFGHIIIJKLMNOOPQRSTUUVXYZ';

export function generateLetters(count: number): string[] {
  const output: string[] = [];
  for (let i = 0; i < count; i += 1) {
    const index = Math.floor(Math.random() * letterBag.length);
    output.push(letterBag[index]);
  }
  return output;
}
