import { useState, useEffect } from "react";

export function useFormInput<T>(initial: T, placeholder?: string) {
  const [value, setValue] = useState<T>(initial);
  
  function onChange(e) {
    setValue(e.target.value);
  }

  return { 
    value, 
    onChange, 
    placeholder,
    className: 'FormInput',
  };
}

export function useMousePosition(): { left: number, top: number } {
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);

  function onMouseMove(event) {
    setLeft(event.pageX);
    setTop(event.pageY);
  }

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  });

  return { left, top };
}