import React from 'react';

import me from './images/me.png';
import './Header.scss';

export default function Header() {
  return (
    <div className="Header">
      <div className="Header__logo" aria-hidden="true">
        <span>d</span>
        <span>k</span>
        <span>t</span>
      </div>

      <img 
        src={me} 
        className="Header__img"
        alt=""
      />

      <div className="Header__bar">
        <div className="Header__name">
          Dakota Sankey
        </div>

        <nav className="Header__nav">
          <a href="https://github.com/tipsypastels">
            Github
          </a>

          <a href="https://twitter.com/tipsypastels">
            Twitter
          </a>
        </nav>
      </div>
    </div>
  );
}
