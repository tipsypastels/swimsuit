import React from 'react';

interface IProps {
  name: string;
  group?: string;
  className?: string;
}

export default function Icon(props: IProps) {
  return (
    <i className={`
      ${props.group || 'fas'}
      fa-${props.name}
      icon
      ${props.className}
    `} />
  );
}
