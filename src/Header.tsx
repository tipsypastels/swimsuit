import React from 'react';

import './Header.scss';

export default function Header() {
  return (
    <div className="Header">
      <div className="Header__logo">
        <span>d</span>
        <span>k</span>
        <span>t</span>
      </div>

      <div className="Header__bar">
        <div className="Header__name">
          Dakota Sankey
        </div>

        <div className="Header__spacer" />

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
