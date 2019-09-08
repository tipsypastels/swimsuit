import React, { ReactNode } from 'react'

import './Project.scss';
import Icon from './Icon';
import { kebabCase } from './helpers';

interface IProps {
  title: string;
  github?: string;
  site?: string;
  children: ReactNode;
  techs: string[];
}

export default function Project(props: IProps) {
  return (
    <div className="Project" id={kebabCase(props.title)}>
      <div className="Project__heading">
        <a className="Project__title" href={props.site || props.github || '#'}>
          {props.title} 
        </a>

        <div className="Project__techs">
          ({props.techs.join(', ')})
        </div>

      </div>

      <div className="Project__body">
        {props.children}
      </div>

      <div className="Project__links">
        {props.site && (
          <a href={props.site}>
            <Icon name="long-arrow-alt-right" /> visit the site
          </a>
        )}
        
        {props.github && (
          <a href={props.github}>
            <Icon name="long-arrow-alt-right" /> check it out on github
          </a>
        )}
      </div>
    </div>
  )
}
