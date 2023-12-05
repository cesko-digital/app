import React from "react";
import { default as NextImage } from "next/image";
import Link from "next/link";

import Markdoc from "@markdoc/markdoc";

import { customMarkdownConfig } from "~/src/markdoc/schema";

/**
 * These are components for custom tags defined in our Markdoc schema,
 * see `src/markdoc/schema.ts`.
 */

/** A generic content box used to highlight part of the content */
const Callout = ({ children }: { children: React.ReactNode }) => (
  <div className="-mx-[1rem] bg-yellow px-[1rem] py-1">{children}</div>
);

/** Custom heading component that generates an anchor to link to */
const Heading = ({
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
          className="ml-1 cursor-pointer text-black no-underline opacity-0 hover:opacity-20"
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
const CustomImage = ({ src, alt, width, height, link }: CustomImageProps) => {
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

const allCustomTags = { Callout, Heading, CustomImage };

/**
 * Render our custom Markdown content
 *
 * The Markdown source may contain extra tags defined in `src/markdoc/schema`,
 * they will be rendered using our custom components defined above.
 *
 * Styling the content is an interesting problem in a Tailwind environment.
 * So far we mark the embedded Markdown content with a special class
 * (`embedded-markdown`) and style using CSS rules stored in `global.css`.
 */
export const MarkdownContent = ({ source }: { source: string }) => {
  const syntaxTree = Markdoc.parse(source);
  const renderableNode = Markdoc.transform(syntaxTree, customMarkdownConfig);
  const renderedContent = Markdoc.renderers.react(renderableNode, React, {
    components: allCustomTags,
  });
  return <div className="embedded-markdown max-w-prose">{renderedContent}</div>;
};
