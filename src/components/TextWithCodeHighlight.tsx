import Highlight from "react-highlight";

type Props = {
  text: string;
};

export function TextWithCodeHighlight({ text }: Props) {
  //TODO support _x_ and **x**
  return (
    <>
      {text.split("`").map((text, index) => {
        if (index % 2 === 0) {
          return (
            <div
              style={{ display: "inline" }}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          );
        } else {
          return (
            <span className="inline-code">
              <Highlight key={index} className="javascript">
                {text}
              </Highlight>
            </span>
          );
        }
      })}
    </>
  );
}
