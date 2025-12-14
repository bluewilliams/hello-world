import type { Boss, BossSkill, Element, WordResolution, WordTrait } from '../types';

const archetypes: Array<
  Omit<Boss, 'name' | 'title' | 'health' | 'maxHealth' | 'skills'> & {
    baseHealth: number;
    signatureSkills: BossSkill[];
  }
> = [
  {
    title: 'The Leximancer',
    description: 'A flaming tome that consumes vowels every third turn.',
    quirk: 'Removes vowels; vulnerable to long words.',
    weakness: 'fire',
    element: 'fire',
    sigil: '📕',
    palette: { base: '#120808', glow: '#ff4d2e', accent: '#ffb347' },
    letterBias: 'FLARE',
    baseHealth: 220,
    signatureSkills: [
      { name: 'Vowel Burn', description: 'Consumes vowels from your pool.', tell: 'Pages ignite; vowels smolder.' },
      { name: 'Incinerate', description: 'Heavy hit if you played short words.', tell: 'Spits embers at close range.' }
    ]
  },
  {
    title: 'Queen Anagramma',
    description: 'She scrambles learned spells, forcing improvisation.',
    quirk: 'Scrambles spell names each round.',
    weakness: 'arcane',
    element: 'arcane',
    sigil: '🕸️',
    palette: { base: '#0c0a17', glow: '#6f62ff', accent: '#c0b7ff' },
    letterBias: 'AEIOQNRST',
    baseHealth: 200,
    signatureSkills: [
      { name: 'Scramble', description: 'Shuffles discovered spells.', tell: 'Threads weave; your book rattles.' },
      { name: 'Mirror Bite', description: 'Copies your last element.', tell: 'Reflective glyphs shimmer.' }
    ]
  },
  {
    title: 'The Silent Editor',
    description: 'Rejects typos and punishes sloppy spelling.',
    quirk: 'Invalid words trigger backlash.',
    weakness: 'void',
    element: 'void',
    sigil: '✒️',
    palette: { base: '#050608', glow: '#0cf2c9', accent: '#7fffe0' },
    letterBias: 'EDTIRN',
    baseHealth: 210,
    signatureSkills: [
      { name: 'Red Pen', description: 'Backlash on invalid words.', tell: 'Ink drips—don’t misspell.' },
      { name: 'Silence', description: 'Weakens repeated spells.', tell: 'The air hushes ominously.' }
    ]
  }
];

const bossAdjectives = ['Elder', 'Glitched', 'Astral', 'Volatile', 'Primordial', 'Gilded', 'Runic'];
const bossSuffixes = ['of the Stack', 'of Ruin', 'of Echoes', 'of Cinders', 'of Frost', 'of Static'];

function sample<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function rollSkills(signatureSkills: BossSkill[]): BossSkill[] {
  const remix: BossSkill[] = [...signatureSkills];
  const extra: BossSkill[] = [
    { name: 'Phase Shift', description: 'Gains shield every third turn.', tell: 'Reality blurs around the boss.' },
    { name: 'Echo Pulse', description: 'Repeats the previous attack at half damage.', tell: 'A second wave builds.' },
    { name: 'Mana Siphon', description: 'Reduces your mana if you play short words.', tell: 'Runes drain the arena.' }
  ];
  remix.push(sample(extra));
  return remix;
}

export function pickBoss(): Boss {
  const archetype = sample(archetypes);
  const adjective = sample(bossAdjectives);
  const suffix = sample(bossSuffixes);
  const variantHealth = archetype.baseHealth + Math.round(Math.random() * 35);
  const name = `${adjective} ${archetype.title}`;

  return {
    ...archetype,
    name,
    title: suffix,
    description: `${archetype.description} This variant is ${adjective.toLowerCase()} and ${suffix.toLowerCase()}.`,
    health: variantHealth,
    maxHealth: variantHealth,
    skills: rollSkills(archetype.signatureSkills)
  };
}

const letterBag = 'AABCDEEEFGHIIIJKLMNOOPQRSTUUVXYZ';
const elementBias: Record<Element, string> = {
  fire: 'FIR',
  ice: 'ICE',
  void: 'VOD',
  arcane: 'ARC',
  storm: 'STO'
};

export function generateLetters(count: number, focus?: Element, biasLetters?: string): string[] {
  const output: string[] = [];
  const biasPool = `${biasLetters ?? ''}${focus ? elementBias[focus] : ''}`;
  const pool = `${letterBag}${biasPool}`;
  for (let i = 0; i < count; i += 1) {
    const index = Math.floor(Math.random() * pool.length);
    output.push(pool[index]);
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
