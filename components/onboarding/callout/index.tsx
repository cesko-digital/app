import * as S from "./styles";

export interface Props {
  type: "success" | "error";
}

const Callout: React.FC<Props> = ({ children, ...props }) => {
  return (
    <S.CalloutBox type={props.type} role="alert">
      {children}
    </S.CalloutBox>
  );
};

export default Callout;
