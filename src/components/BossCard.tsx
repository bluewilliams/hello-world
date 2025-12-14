import type { Boss } from '../types';

interface Props {
  boss: Boss;
  tell?: string;
}

function BossCard({ boss, tell }: Props) {
  const percent = Math.max(6, Math.round((boss.health / boss.maxHealth) * 100));

  return (
    <div className="boss-card" style={{ background: `radial-gradient(120% 140% at 20% 20%, ${boss.palette.glow}, ${boss.palette.base})` }}>
      <div className="boss-visual">
        <div className="sigil" style={{ boxShadow: `0 0 80px ${boss.palette.glow}` }}>
          <span>{boss.sigil}</span>
        </div>
        <div className="boss-meta">
          <p className="label">{boss.title}</p>
          <h3>{boss.name}</h3>
          <p className="lede">{boss.description}</p>
        </div>
      </div>
      <div className="boss-health">
        <div className="health-bar">
          <div className="health-fill" style={{ width: `${percent}%`, background: boss.palette.accent }} />
        </div>
        <p className="hint">Quirk: {boss.quirk}</p>
        <p className="hint">Elemental focus: {boss.element.toUpperCase()}</p>
        {tell && <p className="hint callout">Next: {tell}</p>}
      </div>
      <div className="boss-skills">
        {boss.skills.map((skill) => (
          <div key={skill.name} className="skill-chip">
            <p className="label">{skill.name}</p>
            <p className="hint">{skill.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BossCard;
