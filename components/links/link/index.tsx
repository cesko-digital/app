import * as S from "./styles";
import { ButtonSize } from "components/buttons";
import { isExternalURL } from "lib/utils";

export interface StyledLinkProps {
  disabled?: boolean;
  size: ButtonSize;
}

export interface LinkProps extends Partial<StyledLinkProps> {
  to: string;
  children: React.ReactNode;
  language?: string;
}

const Link: React.FC<LinkProps> = ({
  children,
  size = ButtonSize.Normal,
  to: url,
  ...rest
}: LinkProps) => {
  const href = rest.disabled ? "" : url;
  const props = { size, ...rest };

  if (isExternalURL(href)) {
    return (
      <S.ExternalLink href={href} {...props}>
        {children}
      </S.ExternalLink>
    );
  }
  return (
    <S.InternalLink href={href} {...props}>
      {children}
    </S.InternalLink>
  );
};

export default Link;
