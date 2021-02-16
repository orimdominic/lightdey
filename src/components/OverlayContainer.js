import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export const OverlayContainer = ({ children }) => {
  const elRef = useRef(null);

  if (!elRef.current) {
    const div = document.createElement('div');
    elRef.current = div;
  }

  useEffect(() => {
    const overlayRoot = document.getElementById('overlay');
    overlayRoot.appendChild(elRef.current);

    return () => {
      overlayRoot.removeChild(elRef.current);
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-10 h-screen my-auto bg-black opacity-50">
      {children}
    </div>,
    elRef.current
  );
};
