import * as S from "./styles";
import { ButtonSize } from "components/buttons";
import { isExternalURL } from "lib/utils";

export interface StyledLinkProps {
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
  const props = { size, ...rest };

  if (isExternalURL(url)) {
    return (
      <S.ExternalLink href={url} {...props}>
        {children}
      </S.ExternalLink>
    );
  }
  return (
    <S.InternalLink href={url} {...props}>
      {children}
    </S.InternalLink>
  );
};

export default Link;
