import React, { useEffect, useState } from 'react';
import PageTitle from "@components/PageTitle";
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from "@services/toast";

// const apiNodeSupport = () => 'http://localhost:7171'
const apiNodeSupport = () => 'http://167.86.83.212:7171'

const PhoneNumberUser = () => {
  const { currentUser } = useSelector(state => state.session);
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [displayPhoneNumber, setDisplayPhoneNumber] = useState('');

  useEffect(() => {
    if (currentUser && currentUser.userName) {
      fetchPhoneNumber(currentUser.userName);
    }
  }, [currentUser]);

  const fetchPhoneNumber = async (userName) => {
    try {
      const params = new URLSearchParams();
      params.append('userName', userName);

      const response = await axios.post(`${apiNodeSupport()}/getPhoneNumberUser`, 
        params.toString(),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
      console.log('Phone number response:', response.data.PhoneNumber);
      setPhoneNumber(response.data.phoneNumber);
      setDisplayPhoneNumber(response.data.PhoneNumber);
    } catch (error) {
      console.error('Error fetching phone number:', error);
    }
  };

  const handleSave = async () => {
    try {
      const params = new URLSearchParams();
      params.append('userName', currentUser.userName);
      params.append('phoneNumber', newPhoneNumber);
      
      const response = await axios.post(`${apiNodeSupport()}/setPhoneNumberUser`, 
        params.toString(),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
      console.log('Success:', response.data);
      toast.sucess('Cập nhật thành công')
      setPhoneNumber(newPhoneNumber);
      setDisplayPhoneNumber(newPhoneNumber);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Cập nhật không thành công')
    }
  };

  return (
    <div className="game-transaction d-flex flex-column flex-fill">
      <div className="container flex-fill">
        <div className="row mt-2 mb-4">
          <PageTitle to="/tai-khoan/thong-tin" title="Số điện thoại" />
        </div>
        <span>Số điện thoại : <b>{displayPhoneNumber || 'Đang tải...'}</b></span>
        <hr/>
        <div className="form-group">
          <label className="mb-2">Đổi điện thoại mới</label>
          <input
            type="text"
            className="form-control"
            value={newPhoneNumber}
            onChange={(e) => setNewPhoneNumber(e.target.value)}
          />
        </div>
        <div className="mt-2 mb-3 d-flex justify-content-center">
          <button type="button" className="btn btn-primary" onClick={handleSave}>Lưu</button>
        </div>
      </div>
    </div>
  );
};

export default PhoneNumberUser;
