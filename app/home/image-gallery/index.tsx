import * as S from "./styles";
import galleryImageData from "./galleryImageData.json";
import Image from "./image/index";
import { GALLERY_IMAGE_POSITIONS } from "./helpers";

export interface ImageProps {
  imageUrl: string;
  alt: string;
  id?: number;
  type?: string;
}

export interface ImageGalleryPositions {
  colStart: number;
  colEnd: number;
  rowStart: number;
  rowEnd: number;
  position: number;
}

const ImageGallery: React.FC = () => (
  <S.Container>
    <S.Grid>
      {galleryImageData.map((imageItem: ImageProps) => {
        const positions = GALLERY_IMAGE_POSITIONS.find(
          ({ position }: ImageGalleryPositions) => position === imageItem.id
        );
        return (
          positions && (
            <Image
              key={imageItem.id}
              {...imageItem}
              positions={positions}
              alt=""
            />
          )
        );
      })}
    </S.Grid>
  </S.Container>
);

export default ImageGallery;
