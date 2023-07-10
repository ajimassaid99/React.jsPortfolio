import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faHome } from '@fortawesome/free-solid-svg-icons';

const EmptyAddress = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-center mb-4">
        <FontAwesomeIcon icon={faHome} className="text-gray-400 text-4xl mr-2" />
        <h2 className="text-gray-400 font-semibold text-lg">Tidak ada alamat tersimpan</h2>
      </div>
      <p className="text-gray-500 text-center">Anda belum menyimpan alamat saat ini. Silakan tambahkan alamat Anda.</p>
    </div>
  );
};

export default EmptyAddress;