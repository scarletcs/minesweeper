import React from 'react';
import './Icon.scss';

type Props = {
  src: string;
  alt?: string;
};

export const Icon = ({ src, alt }: Props) => {
  
  const image = `url('${src}')`;
  const style: React.CSSProperties = {
    maskImage: image,
    WebkitMaskImage: image,
  };

  return (
    <div className="Icon" role="image" style={style} aria-label={alt}></div>
  );
};
