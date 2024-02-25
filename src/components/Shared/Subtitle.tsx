export function Subtitle({ text }: { text: string; }) {
  const styles = {
    textAlign: "left",
    width: "63ch",
    margin: "3rem auto 1rem auto",
    fontSize: "1.17rem",
  } as const;

  return <h2 style={styles}>{text}</h2>;
}
