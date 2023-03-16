import * as S from "./styles";
import { Link } from "components/links";
import { areCrumbsValid, transformCrumbs } from "./helpers";
import { Fragment } from "react";

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
      <S.ListItem key="home">
        <Link variant="smallDark" to={homeLink}>
          {homeLabel}
        </Link>
      </S.ListItem>
      {firstCrumbs.map((crumb, index) => (
        <Fragment key={index}>
          <S.Separator>/</S.Separator>
          <S.ListItem>
            {crumb.path ? (
              <Link variant="smallDark" to={crumb.path}>
                {crumb.label}
              </Link>
            ) : (
              <S.Current>{crumb.label}</S.Current>
            )}
          </S.ListItem>
        </Fragment>
      ))}
      <>
        <S.Separator key="sep-last">/</S.Separator>
        <S.ListItem key="current">
          <S.Current>{lastCrumb.label}</S.Current>
        </S.ListItem>
      </>
    </S.OrderedList>
  );
};

export default Breadcrumb;
