type Props = {
  label: React.ReactNode;
  children: React.ReactNode;
};

export const InfoRow = ({ label, children }: Props) => (
  <div className="flex flex-col gap-x-7 gap-y-2 border-t-[1px] border-gray py-3 align-top md:flex-row">
    <div className="typo-caption mt-1 w-[13ex] shrink-0 grow-0 uppercase">
      {label}
    </div>
    <div>{children}</div>
  </div>
);
