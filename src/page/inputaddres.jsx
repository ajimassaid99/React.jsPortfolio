import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormInput from '../component/FormValidation/formInput';
import { addAddress } from '../App/feature/addresses/actions';
import { useDispatch } from 'react-redux';
const AddAddressPage = ({ onSubmit, setPopup }) => {
    const dispatch = useDispatch();
    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [subDistricts, setSubDistricts] = useState([]);
    const [selectedSubDistrict, setSelectedSubDistrict] = useState('');
    const [detail, setDetail] = useState('');
    const [selectedProvinceName, setSelectedProvinceName] = useState('');
    const [selectedCityName, setSelectedCityName] = useState('');
    const [selectedDistrictName, setSelectedDistrictName] = useState('');
    const [selectedSubDistrictName, setSelectedSubDistrictName] = useState('');
    const [selectedType, setSelectedType] = useState('');
  
    useEffect(() => {
      const fetchProvinces = async () => {
        try {
          const response = await axios.get('https://dev.farizdotid.com/api/daerahindonesia/provinsi');
          setProvinces(response.data.provinsi);
        } catch (error) {
          console.error('Error fetching provinces:', error);
        }
      };
  
      fetchProvinces();
    }, []);
  
    const handleTypeChange = (event) => {
      setSelectedType(event.target.value);
    };
  
    const handleProvinceChange = async (event) => {
      const provinceId = event.target.value;
      const provinceName = event.target.options[event.target.selectedIndex].text;
      setSelectedProvince(provinceId);
      setSelectedProvinceName(provinceName);
      setSelectedCity('');
      setSelectedDistrict('');
      setSelectedSubDistrict('');
  
      try {
        const response = await axios.get(`http://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${provinceId}`);
        setCities(response.data.kota_kabupaten);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
  
    const handleCityChange = async (event) => {
      const cityId = event.target.value;
      const cityName = event.target.options[event.target.selectedIndex].text;
      setSelectedCity(cityId);
      setSelectedCityName(cityName);
      setSelectedDistrict('');
      setSelectedSubDistrict('');
  
      try {
        const response = await axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${cityId}`);
        setDistricts(response.data.kecamatan);
      } catch (error) {
        console.error('Error fetching districts:', error);
      }
    };
  
    const handleDistrictChange = async (event) => {
      const districtId = event.target.value;
      const districtName = event.target.options[event.target.selectedIndex].text;
      setSelectedDistrict(districtId);
      setSelectedDistrictName(districtName);
      setSelectedSubDistrict('');
  
      try {
        const response = await axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${districtId}`);
        setSubDistricts(response.data.kelurahan);
      } catch (error) {
        console.error('Error fetching sub-districts:', error);
      }
    };
  
    const handleSubDistrictChange = (event) => {
      const subDistrictId = event.target.value;
      const subDistrictName = event.target.options[event.target.selectedIndex].text;
      setSelectedSubDistrict(subDistrictId);
      setSelectedSubDistrictName(subDistrictName);
    };
  
    function handledetailChange(event) {
      const value = event.target.value;
      setDetail(value);
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      let newAddress = {
        nama: selectedType,
        provinsi: selectedProvinceName,
        kabupaten: selectedCityName,
        kecamatan: selectedDistrictName,
        kelurahan: selectedSubDistrictName,
        detail: detail
      };
      dispatch(addAddress(newAddress));
      setSelectedType('');
      setSelectedProvince('');
      setSelectedCity('');
      setSelectedDistrict('');
      setSelectedSubDistrict('');
      setDetail('');
      onSubmit();
      setPopup(false);
    };
  
    const handleClose = () => {
      setPopup(false);
    };
  
    return (
      <>
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-96">
            <h1 className="text-3xl font-bold mb-6">Add Address</h1>
            
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div>
          <label htmlFor="province" className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            id="tipe"
            name="tipe"
            className="mt-1 block w-full px-3 py-2 border border-gray-300rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            value={selectedType}
            onChange={handleTypeChange}
          >
            <option value="">-- Select Type --</option>
            <option value="Rumah">Rumah</option>
            <option value="Kantor">Kantor</option>
          </select>
        </div>
        <div>
          <label htmlFor="province" className="block text-sm font-medium text-gray-700">
            Province
          </label>
          <select
            id="province"
            name="province"
            className="mt-1 block w-full px-3 py-2 border border-gray-300rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            value={selectedProvince}
            onChange={handleProvinceChange}
          >
            <option value="">-- Select Province --</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.nama}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <select
            id="city"
            name="city"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            value={selectedCity}
            onChange={handleCityChange}
            disabled={!selectedProvince}
          >
            <option value="">-- Select City --</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.nama}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="district" className="block text-sm font-medium text-gray-700">
            District
          </label>
          <select
            id="district"
            name="district"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            value={selectedDistrict}
            onChange={handleDistrictChange}
            disabled={!selectedCity}
          >
            <option value="">-- Select District --</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.nama}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sub-district" className="block text-sm font-medium text-gray-700">
            Sub-district
          </label>
          <select
            id="sub-district"
            name="sub-district"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            value={selectedSubDistrict}
            onChange={handleSubDistrictChange}
            disabled={!selectedDistrict}
          >
            <option value="">-- Select Sub-district --</option>
            {subDistricts.map((subDistrict) => (
              <option key={subDistrict.id} value={subDistrict.id}>
                {subDistrict.nama}
              </option>
            ))}
          </select>
        </div>
        <div>
          <FormInput
            label="Detail"
            name="detail"
            type="text"
            value={detail}
            onChange={handledetailChange}
            required
          />
        </div>
       <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleClose}
              >
                Close
              </button>
              <button
                type="submit"
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded ml-2"
                disabled={!selectedSubDistrict || !detail}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddAddressPage;