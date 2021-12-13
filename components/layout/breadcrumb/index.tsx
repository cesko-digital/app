import * as S from "./styles";
import { Link } from "components/links";
import { ButtonSize } from "components/buttons";
import { areCrumbsValid, transformCrumbs } from "./helpers";

export interface Crumb {
  label: string;
  path?: string;
}

export interface BreadcrumbProps {
  crumbs: Crumb[];
  homeLabel?: string;
  homeLink?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  crumbs,
  homeLabel = "Homepage",
  homeLink = "/",
}: BreadcrumbProps) => {
  if (!areCrumbsValid(crumbs)) {
    return null;
  }

  const { firstCrumbs, lastCrumb } = transformCrumbs(crumbs);

  return (
    <S.OrderedList>
      <S.ListItem>
        <Link size={ButtonSize.Small} to={homeLink}>
          {homeLabel}
        </Link>
      </S.ListItem>
      {firstCrumbs.map((crumb) => (
        <>
          <S.Separator>/</S.Separator>
          <S.ListItem>
            {crumb.path ? (
              <Link size={ButtonSize.Small} to={crumb.path}>
                {crumb.label}
              </Link>
            ) : (
              <S.Current>{crumb.label}</S.Current>
            )}
          </S.ListItem>
        </>
      ))}
      <>
        <S.Separator>/</S.Separator>
        <S.ListItem>
          <S.Current>{lastCrumb.label}</S.Current>
        </S.ListItem>
      </>
    </S.OrderedList>
  );
};

export default Breadcrumb;
