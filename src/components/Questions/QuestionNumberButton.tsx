import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { OptionVariant, Optional } from "../../types";
import { optionVariantToBackgroundColorMap } from "../../constants";

type PublicProps = {
  children: ReactNode;
  hasFocus: boolean;
  onClick: () => void;
  variant?: OptionVariant;
};

type NativeButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type Props = PublicProps & NativeButtonProps;

export function QuestionNumberButton({
  onClick,
  children,
  hasFocus,
  variant = "notAnswered",
  ...nativeButtonProps
}: Props) {
  const buttonRef = useRef<Optional<HTMLButtonElement>>(null);

  useEffect(() => {
    hasFocus && buttonRef.current?.focus();
  }, [hasFocus]);

  const styles = {
    backgroundColor: optionVariantToBackgroundColorMap[variant],
    padding: "0.6em",
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      style={styles}
      {...nativeButtonProps}
    >
      {children}
    </button>
  );
}
