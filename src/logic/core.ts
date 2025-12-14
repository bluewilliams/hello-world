import type { Boss, Element, WordResolution, WordTrait } from '../types';

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

function detectElement(word: string): Element {
  const upper = word.toUpperCase();
  if (upper.includes('ICE')) return 'ice';
  if (upper.includes('FIRE') || upper.includes('FLAME')) return 'fire';
  if (upper.includes('VOID') || upper.includes('HEX')) return 'void';
  if (upper.includes('STORM') || upper.includes('SHOCK')) return 'storm';
  return 'arcane';
}

const rareLetters = new Set(['Q', 'Z', 'X', 'J']);

export function resolveWord(word: string, weakness: Element, combo: number): WordResolution {
  const upper = word.toUpperCase();
  const element = detectElement(upper);
  const traits: WordTrait[] = [];

  const lengthBonus = upper.length >= 7 ? 10 : 0;
  if (lengthBonus) traits.push('lengthy');

  let rareBonus = 0;
  for (const char of upper) {
    if (rareLetters.has(char)) {
      rareBonus += 8;
      if (!traits.includes('rare-letter')) traits.push('rare-letter');
    }
  }

  const uniqueLetters = new Set(upper);
  const repeatBonus = upper.length - uniqueLetters.size > 1 ? 6 : 0;
  if (repeatBonus) traits.push('repeater');

  const isPalindrome = upper === upper.split('').reverse().join('');
  if (isPalindrome) traits.push('palindrome');

  const weaknessMultiplier = element === weakness ? 1.2 : 1;
  if (weaknessMultiplier > 1) traits.push('weakness-hit');

  const baseDamage = upper.length * 6;
  const comboBonus = combo * 3;
  const damage = Math.round((baseDamage + lengthBonus + rareBonus + repeatBonus + comboBonus) * weaknessMultiplier);

  const manaBonus = traits.includes('lengthy') ? 1 : 0;
  const shieldBonus = isPalindrome ? 6 : 0;

  return { damage, element, traits, manaBonus, shieldBonus };
}
