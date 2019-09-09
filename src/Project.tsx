import React, { ReactNode } from 'react'
import { PhotoAction } from './App';

import Icon from './Icon';
import { kebabCase } from './helpers';

import './Project.scss';

interface IProps {
  title: string;
  children: ReactNode;
  techs: string[];

  github?: string;
  site?: string;
  photos?: {
    list: string[];
    dispatch: (action: PhotoAction) => void;
  }
}

export default function Project(props: IProps) {
  function openPhotos() {
    props.photos.dispatch({ 
      type: 'open', 
      photos: props.photos.list,
    });
  }

  return (
    <article className="Project" id={kebabCase(props.title)}>
      <div className="Project__heading">
        <a 
          className="Project__title" 
          href={props.site || props.github || '#'}
        >
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
        {props.photos && (
          <div className="Project__links__link" onClick={openPhotos}>
            <Icon name="long-arrow-alt-right" /> view photos
          </div>
        )}

        {props.site && (
          <a className="Project__links__link" href={props.site}>
            <Icon name="long-arrow-alt-right" /> visit the site
          </a>
        )}
        
        {props.github && (
          <a className="Project__links__link" href={props.github}>
            <Icon name="long-arrow-alt-right" /> check it out on github
          </a>
        )}
      </div>
    </article>
  )
}
