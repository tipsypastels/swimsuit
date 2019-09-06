import React, { ReactNode } from 'react';

import './Presentable.scss';

interface IProps {
  children: ReactNode;
  image: string;
  color: string;
  title: string;
  github?: string;
}

export default function Presentable(props: IProps) {
  const style = {
    backgroundColor: `var(--${props.color})`,
  };

  return (
    <div className="Presentable">
      <div className="Presentable__image">
        <img src={props.image} alt="" />
      </div>

      <div className="Presentable__content" style={style}>
        <div className="Presentable__title" style={style}>
          {props.title}
        </div>

        {props.children}
      </div>
    </div>
  )
}
