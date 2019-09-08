import React, { ReactNode, CSSProperties } from 'react';

import './Section.scss';
import { kebabCase } from './helpers';

interface IProps {
  title: string;
  color: string;
  children: ReactNode;
}

export default function Section(props: IProps) {
  const id = kebabCase(props.title);

  return (
    <div 
      className="Section" 
      id={id}
      style={{
        '--section-color': `var(--${props.color})`
      } as CSSProperties}
    >
      <a href={`#${id}`} className="Section__title">
        {props.title}
      </a>

      <div className="Section__body">
        {props.children}
      </div>
    </div>
  )
}
