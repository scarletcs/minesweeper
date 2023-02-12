import classNames from 'classnames';
import React from 'react';
import './Icon.scss';

type Props = {
  src: string;
  alt?: string;
  className?: string | string[];
};

export const Icon = ({ src, className, alt }: Props) => {
  
  const image = `url('${src}')`;
  const style: React.CSSProperties = {
    maskImage: image,
    WebkitMaskImage: image,
  };

  return (
    <div className={classNames('Icon', className)} role="image" style={style} aria-label={alt}></div>
  );
};
