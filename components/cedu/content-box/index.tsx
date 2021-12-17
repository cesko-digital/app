import * as Typography from "components/typography";
import {
  PortalVideoCredit,
  PortalVideoResource,
  PortalVideoSegment,
} from "lib/cedu";
import {
  BoxWrapper,
  CreditsCell,
  ResourceCell,
  TableOfContentCell,
} from "./styles";

interface TableOfContentBoxProps {
  segments: PortalVideoSegment[];
}

export const TableOfContentBox: React.FC<TableOfContentBoxProps> = ({
  segments,
}) => {
  return (
    <BoxWrapper>
      <h2>Obsah</h2>
      {segments.map((segment, index) => {
        return (
          <TableOfContentCell key={index} href={"?start=" + segment.start}>
            <span>{segment.title}</span>
            <span>{segment.time}</span>
          </TableOfContentCell>
        );
      })}
    </BoxWrapper>
  );
};

interface ResourcesBoxProps {
  resources: PortalVideoResource[];
}

export const ResourceBox: React.FC<ResourcesBoxProps> = ({ resources }) => {
  return (
    <BoxWrapper>
      <h2>Zdroje</h2>
      {resources.map((resource, index) => {
        return (
          <ResourceCell key={index} href={resource.url} target="_blank">
            <Typography.BodyBig>{resource.title}</Typography.BodyBig>
            <Typography.BodySmall>{resource.url}</Typography.BodySmall>
          </ResourceCell>
        );
      })}
    </BoxWrapper>
  );
};

interface CreditsBoxProps {
  credits: PortalVideoCredit[];
}

export const CreditsBox: React.FC<CreditsBoxProps> = ({ credits }) => {
  return (
    <BoxWrapper>
      <h2>Vytvořili</h2>
      {credits.map((credit, index) => {
        return (
          <CreditsCell key={index}>
            <Typography.BodySmall>{credit.title}</Typography.BodySmall>
            <Typography.BodyBig>{credit.names}</Typography.BodyBig>
          </CreditsCell>
        );
      })}
    </BoxWrapper>
  );
};
