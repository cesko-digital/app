import { userSeniorities, type UserSeniority } from "~/src/data/user-profile";

export type Props = {
  value?: UserSeniority;
  disabled?: boolean;
  onChange?: (value: UserSeniority) => void;
};

export const SenioritySelect = ({
  disabled,
  value,
  onChange = (_) => {},
}: Props) => (
  <div>
    <label>TBD: Nejvyšší dosažené vzdělání?</label>
    <div className="mt-1 flex flex-col gap-x-3 md:flex-row">
      {userSeniorities.map((level) => (
        <label key={level} className="mb-1 flex items-center">
          <input
            type="radio"
            className="mr-3"
            name="maxSeniority"
            disabled={disabled}
            checked={value === level}
            onChange={() => onChange(level)}
          />
          <span>{level}</span>
        </label>
      ))}
    </div>
  </div>
);
