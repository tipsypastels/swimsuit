import React, { ReactNode } from 'react';
import Navbar from '../Navbar';

import './Page.scss';

interface IProps {
  children: ReactNode;
}

export default function Page(props: IProps) {
  return (
    <div className="Page">
      <div className="Page__content">
        {props.children}
      </div>

      <div className="Page__nav">
        <Navbar />
      </div>
    </div>
  )
}
