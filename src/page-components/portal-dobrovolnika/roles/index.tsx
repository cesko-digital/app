import { Layout, SectionContent, Section } from 'components/layout'
import * as Typography from 'components/typography'
import React from 'react'
import { PortalDobrovolnikaPageQuery } from '../../../generated/graphql-types'
//import {  } from '../types'
import * as S from '../styles'

interface RolesProps {
    data: any;
}

const Roles: React.FC<RolesProps> = (props) => {
    return <h1>Portal dobrovolnika role</h1>;
}

export default Roles;