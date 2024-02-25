import { colors } from "../../colors";
import { TextWithCodeHighlight } from "../Shared/TextWithCodeHighlight";

export function ExplanationContent({ text }: { text: string }) {
  const styles = {
    backgroundColor: colors.gray,
    padding: "1rem",
    borderRadius: "0.8rem",
    margin: "auto auto 1.5rem auto",
    width: "75ch",
    textAlign: "justify",
  } as const;

  return (
    <div style={styles}>
      <TextWithCodeHighlight text={text} />
    </div>
  );
}
