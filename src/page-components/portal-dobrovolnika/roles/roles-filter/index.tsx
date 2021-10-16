import React, { FC } from 'react'
import styled from 'styled-components'
import { Input } from 'components/inputs'
import Select from 'components/select'

interface RolesFilterProps {
  data: any
}

const RolesFilterDiv = styled.div`
  border: 1px solid pink;
  height: 56px;
`
const RolesFilterLeft = styled.div`
  float: left;
  width: 29%;
  border: 1px solid blue;
`
const RolesFilterRight = styled.div`
  float: left;
  width: 70%;
  border: 1px solid green;
`

const RolesFilter: FC<RolesFilterProps> = ({}) => {
  return (
    <RolesFilterDiv>
      <RolesFilterLeft>
        <Select></Select>
      </RolesFilterLeft>
      <RolesFilterRight>
        <Input width="100%"></Input>
      </RolesFilterRight>
    </RolesFilterDiv>
  )
}

export default RolesFilter
