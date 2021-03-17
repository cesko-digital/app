import React from 'react'
import * as S from './styles'
import Item from './item'
import Img from './img'

const imageTreeTest = [
  {
    type: 'col',
    subset: [
      {
        type: 'row',
        subset: [
          {
            type: 'img',
            url: 'https://via.placeholder.com/2000x1200',
            alt: '...',
            ratio: 66,
          },
          {
            type: 'img',
            url: 'https://via.placeholder.com/500',
            alt: '...',
            ratio: 33,
          },
        ],
      },
      {
        type: 'row',
        subset: [
          {
            type: 'img',
            url: 'https://via.placeholder.com/15',
            alt: '...',
            ratio: 33,
          },
          {
            type: 'img',
            url: 'https://via.placeholder.com/1110',
            alt: '...',
            ratio: 66,
          },
        ],
      },
    ],
  },
  {
    type: 'col',
    subset: [
      {
        type: 'img',
        url: 'https://via.placeholder.com/365x500',
        alt: '...',
      },
    ],
  },
  {
    type: 'col',
    subset: [
      {
        type: 'row',
        subset: [
          {
            type: 'img',
            url: 'https://via.placeholder.com/1500',
            alt: '...',
            ratio: 33,
          },
          {
            type: 'img',
            url: 'https://via.placeholder.com/1500',
            alt: '...',
            ratio: 66,
          },
        ],
      },
      {
        type: 'row',
        subset: [
          {
            type: 'img',
            url: 'https://via.placeholder.com/1500',
            alt: '...',
            ratio: 2,
          },
          {
            type: 'img',
            url: 'https://via.placeholder.com/1500',
            alt: '...',
            ratio: 1,
          },
        ],
      },
    ],
  },
]

const ImageGallery: React.FC = () => {
  const ratioTotal = imageTreeTest.reduce(
    (total, set) => total + set.ratio || 0,
    0
  )
  return (
    <S.Container>
      <S.ContainerCentered>
        {imageTreeTest.map((set, key) => {
          set.ratio =
            (100 / ratioTotal) * set.ratio || 100 / imageTreeTest.length // Set even size if ratio is not defined
          if (set.type === 'row') {
            return (
              <S.Row ratio={set.ratio}>
                <Item {...set} key={key} />
              </S.Row>
            )
          }
          if (set.type === 'col') {
            return (
              <S.Col ratio={set.ratio}>
                <Item {...set} key={key} />
              </S.Col>
            )
          }
          if (set.type === 'img') {
            return <Img {...set} key={key} />
          }

          return null // Unknown type - nothing will be rendered
        })}
      </S.ContainerCentered>
    </S.Container>
  )
}

export default ImageGallery
