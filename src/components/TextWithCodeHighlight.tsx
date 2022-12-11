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
          <span className="inline-code">
            <Highlight key={index} className="javascript">
              {text}
            </Highlight>
          </span>
        ) : (
          <div
            style={{ display: "inline" }}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        );
      })}
    </>
  );
}
