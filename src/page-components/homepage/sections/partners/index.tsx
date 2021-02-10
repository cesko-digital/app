/* eslint-disable prettier/prettier */
import React from 'react'
import * as S from './styles'
import Logo from './logo'

const Partners: React.FC = () => {

    const data =[{"name":"citivizor","website":"website","url":"https://via.placeholder.com/400x200","altUrl":"citivizor"},{"name":"citivizor","website":"website","url":"https://via.placeholder.com/400x200","altUrl":"citivizor"},
    {"name":"citivizor","website":"website","url":"https://via.placeholder.com/400x200","altUrl":"citivizor"},{"name":"citivizor","website":"website","url":"https://via.placeholder.com/400x200","altUrl":"citivizor"},{"name":"citivizor","website":"website","url":"https://via.placeholder.com/400x200","altUrl":"citivizor"},{"name":"citivizor","website":"website","url":"https://via.placeholder.com/400x200","altUrl":"citivizor"},];
  
    return (
      <div>
        <h4>Spolupracujeme s</h4>
        <S.Row>
         <S.Column>
        { data.map((d) => <Logo key={d.name}
              website={d.website}
              name={d.name}
              url={d.url} 
              alturl={d.altUrl}/>)}
         </S.Column>
        </S.Row>
        </div>
    );
    }

export default Partners
