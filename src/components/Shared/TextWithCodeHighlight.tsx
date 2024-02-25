import Highlight from "react-highlight";
import { splitCodeFromText } from "../../utils/codeHighlight";

type Props = {
  text: string;
};

export function TextWithCodeHighlight({ text }: Props) {
  const textAndCodeChunks = splitCodeFromText(text);

  return (
    <>
      {textAndCodeChunks.map(({ content, contentType, id }) => {
        return contentType === "code" ? (
          <span key={id} className="inline-code">
            <Highlight className="javascript">{content}</Highlight>
          </span>
        ) : (
          <span key={id} dangerouslySetInnerHTML={{ __html: content }} />
        );
      })}
    </>
  );
}
