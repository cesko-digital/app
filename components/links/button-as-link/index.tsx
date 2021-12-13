import { StyledButtonProps } from "components/buttons/button";
import { ButtonSize } from "components/buttons";
import * as S from "./styles";
import { isExternalURL } from "lib/utils";

/**
 * The component is used where we need to have
 * a Button which behaves AS a Link
 */
export interface ButtonAsLinkProps extends Partial<StyledButtonProps> {
  to: string;
  children: React.ReactNode;
  language?: string;
}

const ButtonAsLink: React.FC<ButtonAsLinkProps> = ({
  children,
  size = ButtonSize.Normal,
  to: url,
  inverted,
  ...rest
}: ButtonAsLinkProps) => {
  const href = rest.disabled ? "" : url;

  const props = {
    $inverted: inverted,
    size,
    ...rest,
  };

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

export default ButtonAsLink;
