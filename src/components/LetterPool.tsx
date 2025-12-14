import { useMemo, useState } from 'react';

interface Props {
  letters: string[];
  onCast: (word: string) => void;
}

function LetterPool({ letters, onCast }: Props) {
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
        />
        <button
          className="primary"
          disabled={!isValid}
          onClick={() => {
            onCast(draft);
            setDraft('');
          }}
        >
          Cast
        </button>
      </div>
      <p className="hint">3+ letters to cast. First-time words get added to your spellbook.</p>
    </div>
  );
}

export default LetterPool;
