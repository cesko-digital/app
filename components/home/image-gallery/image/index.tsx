import * as S from "./styles";
import { ImageGalleryPositions, ImageProps } from "../index";

interface ImageItemProps extends ImageProps {
  positions: ImageGalleryPositions;
}

const Image: React.FC<ImageItemProps> = ({ imageUrl, alt, positions }) => {
  return (
    <S.GalleryImageItem
      src={imageUrl}
      alt={alt}
      position={positions?.position}
      colStart={positions?.colStart}
      colEnd={positions?.colEnd}
      rowStart={positions?.rowStart}
      rowEnd={positions?.rowEnd}
      loading="lazy"
    />
  );
};

export default Image;
