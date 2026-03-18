"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const DEFAULT_AVATAR_SRC = "/default-avatar.svg";

export default function AvatarImage({
  src,
  alt,
  width,
  height,
  className,
  sizes,
  priority = false,
}) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  const resolvedSrc = !src || hasError ? DEFAULT_AVATAR_SRC : src;

  return (
    <Image
      src={resolvedSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      priority={priority}
      onError={() => setHasError(true)}
    />
  );
}
