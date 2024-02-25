import Highlight from "react-highlight";

type Props = { code?: string };

const containerStyles = {
  margin: "0 auto 2rem auto",
  width: "60vw",
  textAlign: "left",
} as const;

export function CodeArea({ code }: Props) {
  if (!code) {
    return null;
  }

  return (
    <div style={containerStyles}>
      <Highlight className="typescript">{code}</Highlight>
    </div>
  );
}
