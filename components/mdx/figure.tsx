interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
}

export function Figure({ src, alt, caption }: FigureProps) {
  return (
    <figure className="my-8 not-prose">
      {/* eslint-disable-next-line */}
      <img
        src={src}
        alt={alt}
        className="w-full rounded-xl border border-border bg-secondary/50"
        loading="lazy"
      />
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
