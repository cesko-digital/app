import React from 'react'
import * as S from './styles'
import Img from './img'

interface Item {
  ratio: number
  subset: Item[]
}

const Item: React.FC = (set) => {
  const subset = set.subset
  const ratioTotal = subset.reduce((total, set) => total + set.ratio || 0, 0)
  return (
    <>
      {subset.map((set, key) => {
        set.ratio = 100 / ratioTotal * set.ratio || 100 / subset.length // Set even size if ratio is not defined 
        if (set.type === "row") {
          return <S.Row ratio={set.ratio}><Item {...set} /></S.Row>
        }
        if (set.type === "col") {
          return <S.Col ratio={set.ratio}><Item {...set} /></S.Col>
        }
        if (set.type === "img") {
          return <Img {...set} key={key} />
        }
        return null // Unknown type - nothing will be rendered
      })}
    </>
  )
}

export default Item