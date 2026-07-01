import type { SelectHTMLAttributes } from "react";
import { EVENT_TYPE_GROUPS } from "@/lib/event-types";

type EventTypeSelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export default function EventTypeSelect({ className, ...props }: EventTypeSelectProps) {
  return (
    <select className={className} {...props}>
      {EVENT_TYPE_GROUPS.map((group) => (
        <optgroup key={group.label} label={group.label}>
          {group.types.map((type) => (
            <option key={type.value} value={type.value}>
              {type.value}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}
