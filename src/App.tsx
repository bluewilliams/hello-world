import { useMemo, useState } from 'react';
import BossCard from './components/BossCard';
import LetterPool from './components/LetterPool';
import Spellbook from './components/Spellbook';
import TurnLog from './components/TurnLog';
import RunStats from './components/RunStats';
import type { Boss, PlayerState, Spell } from './types';
import { generateLetters, pickBoss, resolveWord } from './logic/core';

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

const initialPlayer: PlayerState = {
  health: 120,
  maxHealth: 120,
  shield: 10,
  combo: 0
};

function App() {
  const [boss, setBoss] = useState<Boss>(pickBoss());
  const [letters, setLetters] = useState(generateLetters(9));
  const [spellbook, setSpellbook] = useState<Spell[]>(initialSpellbook);
  const [log, setLog] = useState<string[]>(['Battle initiated.']);
  const [mana, setMana] = useState(3);
  const [turn, setTurn] = useState(1);
  const [player, setPlayer] = useState<PlayerState>(initialPlayer);

  const manaHint = useMemo(() => {
    if (mana <= 1) return 'Low mana—improvise with letters!';
    if (mana >= 4) return 'High mana—chain learned spells.';
    return 'Balance improvisation with planned casts.';
  }, [mana]);

  const encounterActive = boss.health > 0 && player.health > 0;

  const bossTell = useMemo(() => {
    const cycle = turn % 3;
    if (cycle === 0) return 'Charged strike incoming—shields help.';
    if (cycle === 1) return 'Studying you—damage slightly reduced.';
    return 'Quick jab; push your combo!';
  }, [turn]);

  const resolveBossTurn = (projectedTurn: number, projectedBossHealth: number) => {
    setTurn(projectedTurn);
    setMana((prev) => Math.min(8, prev + 1));

    if (projectedBossHealth <= 0) {
      setLog((prev) => ['Boss defeated! Forge an upgrade and push deeper.', ...prev]);
      return;
    }

    setPlayer((prev) => {
      const attack = Math.round(12 + projectedTurn * 1.3 + Math.max(0, prev.combo - 2));
      const blocked = Math.min(prev.shield, attack);
      const remaining = Math.max(0, attack - blocked);
      const nextShield = Math.max(0, prev.shield - attack);
      const nextHealth = Math.max(0, prev.health - remaining);
      const resetCombo = remaining > 0 ? 0 : prev.combo;

      setLog((prevLog) => [
        `${boss.name} strikes for ${attack}. Shield blocked ${blocked}. (${remaining} damage)`,
        ...prevLog
      ]);

      return {
        ...prev,
        shield: nextShield,
        health: nextHealth,
        combo: resetCombo
      };
    });
  };

  const handleCastWord = (word: string) => {
    if (!encounterActive) {
      setLog((prev) => ['Encounter over—start a new boss.', ...prev]);
      return;
    }

    const upper = word.toUpperCase();
    const exists = spellbook.find((spell) => spell.name === upper);
    const resolution = resolveWord(upper, boss.weakness, player.combo);

    const newBossHealth = Math.max(0, boss.health - resolution.damage);

    setLog((prev) => [
      `${upper} erupts for ${resolution.damage} ${resolution.element} damage. Traits: ${
        resolution.traits.join(', ') || 'improvised'
      }.`,
      ...prev
    ]);
    setBoss((prev) => ({ ...prev, health: newBossHealth }));
    setLetters(generateLetters(9));
    setMana((prev) => Math.min(8, prev + resolution.manaBonus));
    setPlayer((prev) => ({
      ...prev,
      combo: prev.combo + 1,
      shield: Math.min(prev.shield + resolution.shieldBonus, 20)
    }));

    if (!exists) {
      const newSpell: Spell = {
        name: upper,
        description: 'Freshly discovered incantation. Tune it in the Forge.',
        manaCost: Math.max(1, Math.floor(word.length / 2)),
        element: resolution.element
      };
      setSpellbook((prev) => [newSpell, ...prev]);
      setLog((prev) => [`New spell discovered: ${upper}.`, ...prev]);
    }

    resolveBossTurn(turn + 1, newBossHealth);
  };

  const handleRecast = (spell: Spell) => {
    if (!encounterActive) {
      setLog((prev) => ['Encounter over—start a new boss.', ...prev]);
      return;
    }

    if (mana < spell.manaCost) {
      setLog((prev) => ['Not enough mana to recast.', ...prev]);
      return;
    }

    const weaknessBonus = spell.element === boss.weakness ? 1.15 : 1;
    const damage = Math.round((spell.manaCost * 14 + player.combo * 4) * weaknessBonus);
    const newBossHealth = Math.max(0, boss.health - damage);

    setMana((prev) => Math.max(0, prev - spell.manaCost));
    setBoss((prev) => ({ ...prev, health: newBossHealth }));
    setLog((prev) => [
      `${spell.name} reverberates for ${damage} damage (${spell.manaCost} MP).`,
      ...prev
    ]);
    setPlayer((prev) => ({ ...prev, combo: prev.combo + 1 }));

    resolveBossTurn(turn + 1, newBossHealth);
  };

  const handleNewRun = () => {
    setBoss(pickBoss());
    setLetters(generateLetters(9));
    setSpellbook(initialSpellbook);
    setLog(['New encounter.']);
    setMana(3);
    setTurn(1);
    setPlayer(initialPlayer);
  };

  const handleReroll = () => {
    if (!encounterActive) return;
    setLetters(generateLetters(9));
    setLog((prev) => ['Letter pool rerolled.', ...prev]);
  };

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">Word Wizards · Vertical Slice</p>
          <h1>Spell words. Break bosses.</h1>
          <p className="lede">
            Draft words from the letter pool to improvise spells. Recast discovered spells with mana and
            sustain your combo to exploit boss weaknesses. This slice focuses on an upgraded encounter
            loop you can drop into Capacitor builds.
          </p>
          <div className="hero-actions">
            <button className="primary" onClick={handleNewRun}>New Boss</button>
            <button className="ghost">Roadmap · Slice 2</button>
          </div>
        </div>
        <div className="stat-card">
          <p className="label">Mana</p>
          <div className="meter">
            <div className="fill" style={{ width: `${Math.min(100, (mana / 8) * 100)}%` }} />
          </div>
          <p className="hint">{manaHint}</p>
          <p className="label">Shield</p>
          <p className="value">{player.shield}</p>
        </div>
      </header>

      <main className="grid">
        <section className="panel">
          <div className="panel-head">
            <h2>Boss Arena</h2>
            <p className="label">Slice-ready encounter</p>
          </div>
          <BossCard boss={boss} tell={bossTell} />
          <LetterPool letters={letters} onCast={handleCastWord} onReroll={handleReroll} disabled={!encounterActive} />
        </section>

        <RunStats
          player={player}
          mana={mana}
          turn={turn}
          discoveredSpells={spellbook}
          bossName={boss.name}
        />

        <section className="panel">
          <div className="panel-head">
            <h2>Spellbook</h2>
            <p className="label">Discovered incantations</p>
          </div>
          <Spellbook spells={spellbook} onRecast={handleRecast} disabled={!encounterActive} manaAvailable={mana} />
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
