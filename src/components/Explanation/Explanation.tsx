import { ExplanationContent } from "./ExplanationContent";
import { Subtitle } from "../Shared/Subtitle";

type Props = {
  text: string;
};

export function Explanation({ text }: Props) {
  return (
    <article>
      <Subtitle text={"📚 Explanation"} />
      <ExplanationContent text={text} />
    </article>
  );
}
