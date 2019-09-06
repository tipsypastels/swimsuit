import React from 'react';

import './Navbar.scss';
import { Link } from 'react-router-dom';

const LINKS = {
  'Home': '/',
  'About': '/about',
  'Web Design': '/web',
  'Discord Bots': '/bots',
  'Contact': '/contact',
}

export default function Navbar() {
  return (
    <div className="Navbar">
      {Object.keys(LINKS).map(name => {
        const path = LINKS[name];

        return (
          <div key={path} className="Navbar__item">
            <Link 
              to={path} 
              className={`
              Navbar__link
              ${window.location.pathname === path 
                ? 'active' : ''} 
            `}
            >
              {name}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
