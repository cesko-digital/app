import clsx from "clsx";

export type Props = {
  text: string;
  inverted?: boolean;
};

/** Simple text container with a color background */
export const TextPill = ({ text, inverted = false }: Props) => (
  <span
    className={clsx(
      "mb-2 mr-2 inline-block rounded-lg px-2 py-1",
      inverted ? "bg-gravel" : "bg-gray",
    )}
  >
    {text}
  </span>
);
