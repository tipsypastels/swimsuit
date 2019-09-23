import React from 'react';

import me from './images/me.png';
import './Header.scss';

export default function Header() {
  return (
    <div className="Header">
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

          <span style={{ color: 'var(--sexercise)' }}>
            dakota#0001
          </span>
        </nav>
      </div>
    </div>
  );
}
