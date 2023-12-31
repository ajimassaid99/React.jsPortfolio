import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getuser } from '../../App/feature/auth/actions';
import { getAddress,deleteAddress } from '../../App/feature/addresses/actions';
import Loading from '../loading/loading';
import AddAddressPage from '../../page/inputaddres';
import { faBuilding, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EmptyAddress from '../address/emptyAddress';

function Profile() {
  const dispatch = useDispatch();
  const { auth, address } = useSelector((state) => state);
  const [showAddAddressPopup, setShowAddAddressPopup] = useState(false);

  useEffect(() => {
    dispatch(getuser());
    dispatch(getAddress());
  }, [dispatch]);

  const handleAddAddress = () => {
    setShowAddAddressPopup(!showAddAddressPopup);
  };

  const handleEditAddress = (id) => {
    // Logika untuk mengedit alamat dengan ID tertentu
    // ...
  };

  const handleDeleteAddress = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this address?");
    if (confirmDelete) {
      dispatch(deleteAddress(id)).then(() => {
        dispatch(getAddress());
      });
    }
  };
  const handleSubmit = ()=>{
    dispatch(getAddress());
  }
  const handleForm = (value)=>{
    setShowAddAddressPopup(value);
  }
  

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 min-h-screen h-full">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      {auth.isLoading && <Loading color={'gray'}/>}
      <div className="bg-white shadow-sm rounded-lg p-6">
        {auth.user && <div className="mb-4">
          <h2 className="text-xl font-bold">Personal Information</h2>
          <p className="text-gray-600">Nama: {auth.user.full_name}</p>
          <p className="text-gray-600">Email: {auth.user.email}</p>
        </div>}
        <div>
          <h2 className="text-xl font-bold">Addresses</h2>
          <ul className="mt-4">
            {address.addresses && address.addresses.length <1 && <EmptyAddress />}
            {address.addresses && address.addresses.map((address) => (
              <li key={address.id} className="border-b border-gray-300 py-2">
                <div>
                 {address.nama === 'Rumah' && <div className='bg-gray-800 flex w-28 text-center text-white py-1 p-2 rounded-full'><FontAwesomeIcon icon={faHome} className="text-white mt-1 mx-2" /> {address.nama}</div>  }
                 {address.nama !== 'Rumah' && <div className='bg-gray-800 flex w-28 text-center text-white py-1 p-2 rounded-full'><FontAwesomeIcon icon={faBuilding} className="text-white mt-1 mx-2" /> {address.nama}</div> }
                </div>
                <p className="text-gray-600">{address.detail} {address.kelurahan},{address.kecamatan}</p>
                <p className="text-gray-600">{address.kabupaten}, {address.provinsi}</p>
                <div className="flex mt-2">
                  <button
                    className="text-white bg-gray-500 rounded-full py-1 px-4 hover:bg-gray-800 mr-2"
                    onClick={() => handleEditAddress(address._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-white bg-red-500 rounded-full py-1 px-4 hover:bg-red-800"
                    onClick={() => handleDeleteAddress(address._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            className="text-white bg-gray-500 rounded-full py-1 px-4 hover:bg-gray-800 mt-4"
            onClick={handleAddAddress}
          >
            {showAddAddressPopup? 'Close form Address':'Add address'}
          </button>
        </div>
        {showAddAddressPopup && <AddAddressPage setPopup={handleForm} onSubmit={handleSubmit}/>}
      </div>
    </div>
  );
}

export default Profile;