import { default as NextImage } from "next/image";
import Link from "next/link";

/**
 * These are components for custom tags defined in our Markdoc schema,
 * see `src/markdoc/schema.ts`.
 */

/** A generic content box used to highlight part of the content */
export const Callout = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-yellow px-[1rem] -mx-[1rem] py-1">{children}</div>
);

/** Custom heading component that generates an anchor to link to */
export const Heading = ({
  id,
  children,
  level,
}: {
  children: React.ReactNode;
  id: string | undefined;
  level: number;
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <Tag id={id}>
      {children}
      {id && (
        <a
          href={`#${id}`}
          className="ml-1 opacity-0 hover:opacity-20 cursor-pointer text-black no-underline"
        >
          #
        </a>
      )}
    </Tag>
  );
};

type CustomImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  link?: string;
};

/** Custom image component that supports image optimization */
export const CustomImage = ({
  src,
  alt,
  width,
  height,
  link,
}: CustomImageProps) => {
  const img = (
    <NextImage
      key={src}
      src={src}
      // This is kind of eyeballing it, can we do better?
      sizes="(min-width: 1024px) 50vw, 100vw"
      alt={alt}
      width={width}
      height={height}
      style={{
        maxWidth: "100%",
        height: "auto",
        marginTop: "25px",
        marginBottom: "25px",
      }}
    />
  );
  return link ? <Link href={link}>{img}</Link> : img;
};

export const allCustomTags = { Callout, Heading, CustomImage };
