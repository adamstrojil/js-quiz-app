import { forwardRef } from "react";

type Props = {
  text: string;
};

export const Title = forwardRef<HTMLHeadingElement, Props>(function Title(
  { text },
  ref
) {
  return (
    <h1 tabIndex={-1} ref={ref}>
      {text}
    </h1>
  );
});
