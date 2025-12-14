import type { Spell } from '../types';

interface Props {
  spells: Spell[];
  onRecast: (spell: Spell) => void;
}

function Spellbook({ spells, onRecast }: Props) {
  return (
    <div className="spellbook">
      {spells.map((spell) => (
        <article key={spell.name} className="spell">
          <div>
            <p className="label">{spell.element.toUpperCase()}</p>
            <h3>{spell.name}</h3>
            <p className="hint">{spell.description}</p>
          </div>
          <div className="spell-actions">
            <p className="mana">{spell.manaCost} MP</p>
            <button className="ghost" onClick={() => onRecast(spell)}>
              Recast
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default Spellbook;
