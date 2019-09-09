import React, { useRef } from 'react';
import Icon from './Icon';
import { PhotoState, PhotoAction } from './App';

import './PhotoModal.scss';

interface IProps {
  photoState: PhotoState;
  photoDispatch: (action: PhotoAction) => void;
}

export default function PhotoModal(props: IProps) {
  const { photoList, photoIndex } = props.photoState;

  const modalRef = useRef<HTMLDivElement>(null);

  if (photoIndex === null) {
    return null;
  }

  return (
    <div className="PhotoModal" ref={modalRef} onClick={e => {
      if (e.target === modalRef.current) {
        props.photoDispatch({ type: 'close' });
      }
    }}>
      <div className="PhotoModal__body">
        {photoList.length > 1 && (
          <div
            onClick={() => props.photoDispatch({ type: 'prev' })}
            className="PhotoModal__control PhotoModal__control--prev"
          >
            <Icon name="angle-left" />
          </div>
        )}

        <img src={photoList[photoIndex]} alt="" />

        {photoList.length > 1 && (
          <div 
            onClick={() => props.photoDispatch({ type: 'next' })}
            className="PhotoModal__control PhotoModal__control--next"
          >
            <Icon name="angle-right" />
          </div>
        )}
      </div>
    </div>
  )
}
