interface Props {
  entries: string[];
}

function TurnLog({ entries }: Props) {
  return (
    <ol className="turn-log">
      {entries.map((entry, index) => (
        <li key={`${entry}-${index}`}>{entry}</li>
      ))}
    </ol>
  );
}

export default TurnLog;
