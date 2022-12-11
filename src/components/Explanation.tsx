import { TextWithCodeHighlight } from "./TextWithCodeHighlight";

type Props = {
  text: string;
};

export function Explanation({ text }: Props) {
  return (
    <article>
      <h2
        style={{
          textAlign: "left",
          width: "63ch",
          margin: "3rem auto 1rem auto",
          fontSize: "1.17rem"
        }}
      >
        📚 Explanation
      </h2>
      <p
        style={{
          backgroundColor: " hsl(223deg 11% 16%)",
          padding: "1rem",
          borderRadius: "0.8rem",
          margin: "auto auto 1.5rem auto",
          width: "75ch",
          textAlign: "justify",
        }}
      >
        <TextWithCodeHighlight text={text} />
      </p>
    </article>
  );
}
