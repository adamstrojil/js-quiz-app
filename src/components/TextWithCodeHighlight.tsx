import Highlight from "react-highlight";

type Props = {
  text: string;
};

//TODO support _x_ and **x**
export function TextWithCodeHighlight({ text }: Props) {
  return (
    <>
      {text.split("`").map((text, index) => {
        const isCode = index % 2 === 1;

        return isCode ? (
          <span key={index} className="inline-code">
            <Highlight className="javascript">{text}</Highlight>
          </span>
        ) : (
          <span
            key={index}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        );
      })}
    </>
  );
}
