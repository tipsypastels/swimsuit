import React from 'react';
import { useFormInput } from '../customHooks';

import './Contact.scss';

export default function Contact() {
  const email = useFormInput('', 'Your Email');
  const message = useFormInput('', 'Your Message');

  return (
    <div className="Contact">
      <div className="Contact__title">
        Msg me
      </div>

      <input {...email} autoFocus type="email" />
      <textarea {...message} />

      <button className="Button" type="submit">
        Ok go
      </button>
    </div>
  )
}
