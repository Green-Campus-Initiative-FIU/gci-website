// Colors one word of a headline mint, if the (editable) headline still contains it.
export function Emphasize({ text, word }) {
  const i = word ? text.toLowerCase().lastIndexOf(word.toLowerCase()) : -1;
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <em>{text.slice(i, i + word.length)}</em>
      {text.slice(i + word.length)}
    </>
  );
}
