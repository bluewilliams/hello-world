import { useMemo, useState } from 'react';

interface Props {
  letters: string[];
  onCast: (word: string) => void;
  onReroll: () => void;
  disabled?: boolean;
}

function LetterPool({ letters, onCast, onReroll, disabled = false }: Props) {
  const [draft, setDraft] = useState('');

  const isValid = useMemo(() => draft.length >= 3, [draft]);

  return (
    <div className="letter-pool">
      <div className="letters">
        {letters.map((letter, idx) => (
          <span key={`${letter}-${idx}`} className="tile">
            {letter}
          </span>
        ))}
      </div>
      <label className="label" htmlFor="draft">Spell a word</label>
      <div className="draft">
        <input
          id="draft"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type a word using these letters"
          disabled={disabled}
        />
        <button
          className="primary"
          disabled={!isValid || disabled}
          onClick={() => {
            onCast(draft);
            setDraft('');
          }}
        >
          Cast
        </button>
      </div>
      <div className="letter-actions">
        <p className="hint">3+ letters to cast. First-time words get added to your spellbook.</p>
        <button className="ghost" onClick={onReroll} disabled={disabled}>
          Reroll letters
        </button>
      </div>
    </div>
  );
}

export default LetterPool;
