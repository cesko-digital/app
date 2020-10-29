import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 370px;

  height: 570px;

  display: flex;

  flex-direction: column;

  border: 2px solid '#EDEDEF';

  border-radius: 8px;
`

export const Title = styled.h3`
  color: ${(props) => props.color};
`
export const Description = styled.p`
  color: ${(props) => props.color};
`
