import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';
import { FaFacebook, FaWhatsapp, FaInstagram } from 'react-icons/fa';

export default function FooterC() {
  return (
    <MDBFooter style={{ height: 'auto', marginTop: '101px' }} bgColor='dark' className='text-center text-lg-left'>
      <div className='text-center p-3'>
        <p className='text-light'>
          ComplaintCare
        </p>
        <p className='text-light'>&copy; {new Date().getFullYear()}</p>
      </div>
      <div className='text-center'>
        <h5 className='text-light'>Contact Us</h5>
        <p className='text-light mb-1'>Email: <a href="mailto:resolvex07@gmail.com" className='text-light'>resolvex07@gmail.com</a></p>
        <p className='text-light mb-3'>Phone: <a href="tel:9876543210" className='text-light'>9876543210</a></p>
        <div className='d-flex justify-content-center'>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className='text-light mx-2'>
            <FaFacebook size={24} />
          </a>
          <a href="https://wa.me/9876543210" target="_blank" rel="noopener noreferrer" className='text-light mx-2'>
            <FaWhatsapp size={24} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className='text-light mx-2'>
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </MDBFooter>
  );
}
