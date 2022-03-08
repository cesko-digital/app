interface Props {
  date: Date;
  style?: "date-only" | "date-and-time";
}

const dateFormatter = new Intl.DateTimeFormat("cs-CZ", {
  day: "numeric",
  month: "numeric",
});

const dateAndTimeFormatter = new Intl.DateTimeFormat("cs-CZ", {
  day: "numeric",
  month: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

/** Format date according to Czech locale */
const DateTime: React.FC<Props> = ({ date, style = "date-only" }) => {
  const fmt = style === "date-only" ? dateFormatter : dateAndTimeFormatter;
  return <span title={date.toUTCString()}>{fmt.format(date)}</span>;
};

export default DateTime;
