/* eslint-disable prettier/prettier */
import React from 'react'
import * as S from './styles'

interface Props {
    key : string
    name: string
    website:string
    url: string
    alturl: string
  }

const Logo: React.FC<Props> = ({ key,url,alturl }) => {

    return (
     <S.Img key={key} src={url} alt={alturl} ></S.Img>
    );
    }

export default Logo