import type { Boss } from '../types';

interface Props {
  boss: Boss;
}

function BossCard({ boss }: Props) {
  const percent = Math.max(6, Math.round((boss.health / boss.maxHealth) * 100));

  return (
    <div className="boss-card">
      <div className="boss-meta">
        <p className="label">Boss</p>
        <h3>{boss.name}</h3>
        <p className="lede">{boss.description}</p>
      </div>
      <div className="boss-health">
        <div className="health-bar">
          <div className="health-fill" style={{ width: `${percent}%` }} />
        </div>
        <p className="hint">Quirk: {boss.quirk}</p>
        <p className="hint">Weakness: {boss.weakness.toUpperCase()}</p>
      </div>
    </div>
  );
}

export default BossCard;
