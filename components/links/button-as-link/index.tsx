import { StyledButtonProps } from "components/buttons/button";
import { ButtonSize } from "components/buttons";
import { default as NextLink } from "next/link";
import * as S from "./styles";

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

  return (
    <NextLink href={href} passHref>
      <S.StyledLink {...props}>{children}</S.StyledLink>
    </NextLink>
  );
};

export default ButtonAsLink;
