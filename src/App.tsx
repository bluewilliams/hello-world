import { useMemo, useState } from 'react';
import BossCard from './components/BossCard';
import LetterPool from './components/LetterPool';
import Spellbook from './components/Spellbook';
import TurnLog from './components/TurnLog';
import type { Boss, Spell } from './types';
import { generateLetters, pickBoss } from './logic/core';

const initialSpellbook: Spell[] = [
  {
    name: 'EMBER',
    description: 'A quick flicker of flame that scorches lightly.',
    manaCost: 1,
    element: 'fire'
  },
  {
    name: 'AURA',
    description: 'A steady wave of force that steadies your footing.',
    manaCost: 2,
    element: 'arcane'
  }
];

function App() {
  const [boss, setBoss] = useState<Boss>(pickBoss());
  const [letters, setLetters] = useState(generateLetters(9));
  const [spellbook, setSpellbook] = useState<Spell[]>(initialSpellbook);
  const [log, setLog] = useState<string[]>(['Battle initiated.']);
  const [mana, setMana] = useState(3);
  const [turn, setTurn] = useState(1);

  const manaHint = useMemo(() => {
    if (mana <= 1) return 'Low mana—improvise with letters!';
    if (mana >= 4) return 'High mana—chain learned spells.';
    return 'Balance improvisation with planned casts.';
  }, [mana]);

  const handleCastWord = (word: string) => {
    const upper = word.toUpperCase();
    const exists = spellbook.find((spell) => spell.name === upper);
    const manaCost = Math.max(1, Math.floor(word.length / 2));

    setLog((prev) => [
      `${upper} erupts for ${word.length * 5} damage.`,
      ...prev
    ]);
    setBoss((prev) => ({ ...prev, health: Math.max(0, prev.health - word.length * 5) }));
    setLetters(generateLetters(9));
    setTurn((prev) => prev + 1);

    if (!exists) {
      const newSpell: Spell = {
        name: upper,
        description: 'Freshly discovered incantation. Tune it in the Forge.',
        manaCost,
        element: 'arcane'
      };
      setSpellbook((prev) => [newSpell, ...prev]);
      setLog((prev) => [`New spell discovered: ${upper}.`, ...prev]);
    } else {
      setMana((prev) => Math.max(0, prev - manaCost));
    }
  };

  const handleRecast = (spell: Spell) => {
    if (mana < spell.manaCost) {
      setLog((prev) => ['Not enough mana to recast.', ...prev]);
      return;
    }
    setMana((prev) => prev - spell.manaCost);
    setBoss((prev) => ({ ...prev, health: Math.max(0, prev.health - spell.manaCost * 12) }));
    setLog((prev) => [`${spell.name} reverberates for ${spell.manaCost * 12} damage.`, ...prev]);
    setTurn((prev) => prev + 1);
  };

  const handleNewRun = () => {
    setBoss(pickBoss());
    setLetters(generateLetters(9));
    setSpellbook(initialSpellbook);
    setLog(['New encounter.']);
    setMana(3);
    setTurn(1);
  };

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">Word Wizards · Vertical Slice</p>
          <h1>Spell words. Break bosses.</h1>
          <p className="lede">
            Draft words from the letter pool to improvise spells. Recast discovered spells with mana to
            exploit boss weaknesses. This slice focuses on one quick encounter loop you can drop into
            Capacitor builds.
          </p>
          <div className="hero-actions">
            <button className="primary" onClick={handleNewRun}>New Boss</button>
            <button className="ghost">Roadmap · Slice 2</button>
          </div>
        </div>
        <div className="stat-card">
          <p className="label">Mana</p>
          <div className="meter">
            <div className="fill" style={{ width: `${Math.min(100, (mana / 6) * 100)}%` }} />
          </div>
          <p className="hint">{manaHint}</p>
          <p className="label">Turn</p>
          <p className="value">{turn}</p>
        </div>
      </header>

      <main className="grid">
        <section className="panel">
          <div className="panel-head">
            <h2>Boss Arena</h2>
            <p className="label">Slice-ready encounter</p>
          </div>
          <BossCard boss={boss} />
          <LetterPool letters={letters} onCast={handleCastWord} />
        </section>

        <section className="panel">
          <div className="panel-head">
            <h2>Spellbook</h2>
            <p className="label">Discovered incantations</p>
          </div>
          <Spellbook spells={spellbook} onRecast={handleRecast} />
        </section>

        <section className="panel">
          <div className="panel-head">
            <h2>Turn Log</h2>
            <p className="label">Recent events</p>
          </div>
          <TurnLog entries={log} />
        </section>
      </main>
    </div>
  );
}

export default App;
