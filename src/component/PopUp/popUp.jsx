import React, { useEffect, useRef } from 'react';
import { Transition } from '@headlessui/react';

function Popup(props) {
  const { message, bgcolor, duration } = props;
  const popupRef = useRef(null);

  useEffect(() => {
    if (popupRef.current) {
      setTimeout(() => {
        handleClosePopup();
      }, duration || 1000);
    }
  }, [duration]);

  function handleClosePopup() {
    if (popupRef.current) {
      popupRef.current.classList.remove('show');
      setTimeout(() => {}, 300);
    }
  }

  return (
    <Transition
      show={true}
      enter="transition-transform duration-500 ease-out"
      enterFrom="translate-y-2 opacity-0"
      enterTo="translate-y-0 opacity-100"
      leave="transition-transform duration-500 ease-in"
      leaveFrom="translate-y-0 opacity-100"
      leaveTo="translate-y-2 opacity-0"
    >
      <div className={`bg-${bgcolor} fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded text-white font-bold z-50 bg-opacity-80 backdrop-filter backdrop-blur-sm`}>
        <div ref={popupRef} className="rounded p-4">
          <p>{message}</p>
        </div>
      </div>
    </Transition>
  );
}

export default Popup;
