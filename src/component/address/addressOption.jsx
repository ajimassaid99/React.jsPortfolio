import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function AddressOption({ address, selected, onSelect }) {
    const location = `${address.kelurahan}, ${address.kecamatan}, ${address.kabupaten}`;
    return (
      <div
        className={`p-4 border-2 rounded-lg ${selected ? 'border-green-500' : 'border-gray-300'}`}
        onClick={() => onSelect(address._id)}
      >
        <div className="flex items-center">
          {selected && (
            <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />
          )}
          <div>
            <p className="text-lg font-bold">{address.detail}</p>
            <p className="text-gray-500">{location}, {address.provinsi}</p>
          </div>
        </div>
      </div>
    );
  }

  export default AddressOption;