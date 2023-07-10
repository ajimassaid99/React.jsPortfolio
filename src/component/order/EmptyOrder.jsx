import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';

const EmptyOrder = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-center mb-4">
        <FontAwesomeIcon icon={faFileAlt} className="text-gray-400 text-4xl mr-2" />
        <h2 className="text-gray-400 font-semibold text-lg">Tidak ada data order</h2>
      </div>
      <p className="text-gray-500 text-center">Anda belum memiliki data order saat ini. Silakan lakukan transaksi terlebih dahulu.</p>
    </div>
  );
};

export default EmptyOrder;