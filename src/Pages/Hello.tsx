import React, { useEffect } from 'react';

import './Hello.scss';

export const LAST_VISIT_KEY = 'dkt_portfolio_lastvisit';
export function bumpLastVisit() {
  localStorage.setItem(LAST_VISIT_KEY, new Date().toString());
}

export default function Hello() {
  useEffect(bumpLastVisit);

  return (
    <div className="Hello">
      Hello.
    </div>
  );
}
