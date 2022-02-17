interface Props {
  name: string;
}

const TestingComponent: React.FC<Props> = ({ name }) => {
  return <p className="nice">{name}</p>;
};

export default TestingComponent;
