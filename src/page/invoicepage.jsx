import React, { useEffect } from 'react';
import Invoice from '../component/invoice/invoice';
import { useDispatch, useSelector } from 'react-redux';
import { getInvoice } from '../App/feature/invoice/actions';
import { useParams } from 'react-router-dom';
function InvoicePage() {
    const dispatch = useDispatch();
    const {  invoice } = useSelector((state) => state);
    const { id } = useParams();
   
    useEffect(() => {
    dispatch(getInvoice(id));    
  }, [dispatch,id]);
  return (
    <div>
      {invoice.invoiceData === [] && <div>Data Salah</div> }
      {invoice.invoiceData && <Invoice invoice={invoice.invoiceData} />}
    </div>
  );
}

export default InvoicePage;
