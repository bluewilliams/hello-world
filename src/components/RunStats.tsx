import type { PlayerState, Spell } from '../types';

interface Props {
  player: PlayerState;
  mana: number;
  turn: number;
  discoveredSpells: Spell[];
  bossName: string;
}

function RunStats({ player, mana, turn, discoveredSpells, bossName }: Props) {
  const discoveryCount = Math.max(0, discoveredSpells.length - 2);
  const manaPercent = Math.min(100, (mana / 8) * 100);
  const healthPercent = Math.max(6, Math.round((player.health / player.maxHealth) * 100));

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Run State</h2>
        <p className="label">{bossName} · Turn {turn}</p>
      </div>
      <div className="stat-grid">
        <article className="stat-card">
          <p className="label">Player Vitality</p>
          <div className="meter chunky">
            <div className="fill" style={{ width: `${healthPercent}%` }} />
          </div>
          <p className="hint">{player.health} / {player.maxHealth} HP · Shield {player.shield}</p>
        </article>

        <article className="stat-card">
          <p className="label">Mana Flow</p>
          <div className="meter">
            <div className="fill" style={{ width: `${manaPercent}%` }} />
          </div>
          <p className="hint">{mana} MP · +1 regen each turn</p>
        </article>

        <article className="stat-card">
          <p className="label">Combo Heat</p>
          <h3>{player.combo}×</h3>
          <p className="hint">Longer chains boost spell power.</p>
        </article>

        <article className="stat-card">
          <p className="label">Discoveries</p>
          <h3>{discoveryCount}</h3>
          <p className="hint">Fresh spells forged this run.</p>
        </article>
      </div>
    </section>
  );
}

export default RunStats;
