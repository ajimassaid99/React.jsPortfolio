import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';

function EmptyProduct() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <FontAwesomeIcon icon={faBoxOpen} className="text-gray-400 text-6xl mx-auto mb-4" />
        <p className="text-gray-600 text-lg mb-2">Tidak ada produk yang ditemukan</p>
      </div>
    </div>
  );
}

export default EmptyProduct;