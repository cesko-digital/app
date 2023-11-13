import clsx from "clsx";

export type Props = {
  text: string;
  inverted?: boolean;
};

/** Simple text container with a color background */
export const TextPill = ({ text, inverted = false }: Props) => (
  <span
    className={clsx(
      "inline-block rounded-lg px-2 py-1 mr-2 mb-2",
      inverted ? "bg-gravel" : "bg-gray"
    )}
  >
    {text}
  </span>
);
