import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Transition } from '@headlessui/react';

function EmptyCart() {

  return (
    <div className="flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <FontAwesomeIcon icon={faShoppingCart} className="mb-4" style={{ fontSize: '10vw', color:'gray' }} />
      <p className="text-lg mb-4 text-gray-500">Your cart is empty.</p>
      <Transition
        show={true}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200 transform"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <a
          href="home"
          className="bg-gray-700 mb-24 text-white py-2 px-4 rounded-full hover:bg-gray-600 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          Back to shopping
        </a>
      </Transition>
    </div>
  );
}

export default EmptyCart;
