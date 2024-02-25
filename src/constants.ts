import { colors } from "./colors";
import { OptionVariant } from "./types";

export const optionVariantToBackgroundColorMap: {
  [key in OptionVariant]: string;
} = {
  correct: colors.green,
  incorrect: colors.red,
  notAnswered: "inherit",
};
