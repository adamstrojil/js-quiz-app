import { forwardRef, HTMLProps, ReactNode } from "react";

type PublicProps = {
  children: ReactNode;
  onClick: () => void;
  variant?: "normal" | "small";
  type?: "submit" | "button" | "reset";
};

type Props = PublicProps & HTMLProps<HTMLButtonElement>;

const variantToStyleMap = {
  small: { marginRight: "8px", fontSize: ".7em" },
  normal: {},
};

export const Button = forwardRef(function Button(
  { onClick, children, variant = "normal", type = "button", ...rest }: Props,
  ref: any
) {
  return (
    <button
      style={variantToStyleMap[variant]}
      ref={ref}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
});
