import Highlight from "react-highlight";

type Props = {
  text: string;
};

export function TextWithCodeHighlight({ text }: Props) {
  return (
    <>
      {text.split("`").map((text: string, index) => {
        if (index % 2 === 0) {
          return <span dangerouslySetInnerHTML={{__html: text}}></span>
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
