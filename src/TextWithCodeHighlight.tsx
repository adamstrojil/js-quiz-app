import { useState } from "react";
import Highlight from "react-highlight";
import { Answer } from "./App";
import "./App.css";

type Props = {
  text: string;
};

export function TextWithCodeHighlight({ text }: Props) {
  return (
    <>
      {text.split("`").map((text: string, index) => {
        if (index % 2 === 0) {
          return text;
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
