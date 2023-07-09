import React from 'react';

function Invoice({ invoice }) {
  const {
    delivery_address,
    total,
    payment_status,
    user,
    order,
  } = invoice;
  const formattedTotal = total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });


  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Invoice</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Massaid's Store</p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className={`mt-1 text-sm ${payment_status === 'paid' ? 'text-green-600' : 'text-gray-900'} sm:col-span-2 sm:mt-0`}>{payment_status}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Order ID</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{order._id}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Total Amount</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{formattedTotal}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Billed to</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <p className="font-bold">{user.full_name}</p>
                <p>{user.email}</p> <br />
                <p>{` ${delivery_address.detail} ${delivery_address.kelurahan}  ${delivery_address.kecamatan},  ${delivery_address.kabupaten},  ${delivery_address.provinsi}.`}</p>
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Payment to</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <p>Massaid</p>
                <p>rmassaid@gmail.com</p>
                <p>Mandiri</p>
                <p>xxx-xxxx-333-44</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="grid my-16">
        <a href="/home" className="text-center text-md font-semibold text-amber-500">&larr; Back to home</a>
      </div>
    </div>
  );
}

export default Invoice;
