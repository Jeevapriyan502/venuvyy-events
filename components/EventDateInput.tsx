import type { InputHTMLAttributes } from "react";
import { minEventDateInput, toDateInputValue } from "@/lib/event-date";

type EventDateInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "min" | "defaultValue"
> & {
  defaultValue?: string | null;
};

export default function EventDateInput({
  defaultValue,
  value,
  name = "eventDate",
  required,
  className,
  ...props
}: EventDateInputProps) {
  const isControlled = value !== undefined;

  return (
    <input
      {...props}
      type="date"
      name={name}
      required={required}
      min={minEventDateInput()}
      className={className}
      {...(isControlled
        ? { value }
        : defaultValue !== undefined
          ? { defaultValue: toDateInputValue(defaultValue) }
          : {})}
    />
  );
}
