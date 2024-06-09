import PageTitle from "@components/PageTitle"
import TransactionListItem from "@components/Transactions/TransactionListItem"
import user from "@services/user"
import _ from "lodash"
import numeral from "numeral"
import { PaginatedList } from "react-paginated-list"
import { useSelector } from "react-redux"
import { useAsync } from "react-use"
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import toast from "@services/toast";

// const apiNodeSupport = () => 'http://localhost:7171'
const apiNodeSupport = () => 'http://167.86.83.212:7171'

const WithdrawHistory = () => {
  const [passOld, setPassOld] = useState('');
  const [passNew, setPassNew] = useState('');
  const passOldRef = useRef(null);
  const passNewRef = useRef(null);
  let passOldDB = ''
  const { currentUser } = useSelector(state => state.session)
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
      setDisplayPhoneNumber(response.data.PhoneNumber);
    } catch (error) {
      console.error('Error fetching phone number:', error);
    }
  };
  
  const getWithDrawPassworkUser = async (userName) => {
    try {
        if (userName.length < 1) return null
        const response = await axios.get(`${apiNodeSupport()}/get-withdrawPassword-user?userName=${userName}`);
        passOldDB = response.data.WithdrawPassword || ''
        return
    } catch (error) {
        console.error('Lỗi khi gửi yêu cầu:', error.message);
        return null;
    }
  };

  const changePassNew = async () => {
    const passOldValue = passOldRef.current.value;
    const passNewValue = passNewRef.current.value;

    await getWithDrawPassworkUser(currentUser.userName);
    if(passOldDB != passOldValue) return toast.error('Mật khẩu cũ không chính xác');

    await setWithDrawPassworkUser(currentUser.userName, passNewValue)
  };

  const setWithDrawPassworkUser = async (userName, withdrawPassword) => {
    try {
        try {
            const params = new URLSearchParams();
            params.append('userName', userName);
            params.append('withdrawPassword', withdrawPassword);

            const response = await axios.post(
                apiNodeSupport() + '/set-withdrawPassword-user',
                params.toString(),
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            );

            if(response.status === 200){
              toast.sucess('Thay đổi thành công');
            } else {
              toast.error('Thay đổi thất bại');
            }
        } catch (error) {
            return 0
        }
    } catch (error) {
        console.error('Lỗi khi gửi yêu cầu:', error);
        return null;
    }
};

  return (
    <div className="game-transaction d-flex flex-column flex-fill">
      <div className="container flex-fill">
        <div className="row mt-2 mb-4">
          <PageTitle to="/tai-khoan/thong-tin" title="Trung tâm cá nhân" />
        </div>
        <div>
        <div>
          <span className="text-light fw-bold" style={{ marginRight: '10px' }}>Gmail :</span>
          <span className="text-light">{currentUser.email}</span>
        </div>
        <div>
          <span className="text-light fw-bold" style={{ marginRight: '10px' }}>Tên đăng nhập :</span>
          <span className="text-light">{currentUser.userName}</span>
        </div>
        <div>
          <span className="text-light fw-bold" style={{ marginRight: '10px' }}>Số điện thoại :</span>
          <span className="text-light">{displayPhoneNumber || 'Chưa cập nhật'}</span>
        </div>
        </div>
        <hr/>
        <h5>Thay đổi mật khẩu rút tiền</h5>
        <label className="mb-2 mt-2">Mật khẩu cũ</label>
          <input
            type="password"
            className="form-control passOld"
            ref={passOldRef}
            onChange={(e) => setPassOld(e.target.value)}
          />
          <label className="mb-2 mt-2">Mật khẩu Mới</label>
          <input
            type="password"
            className="form-control passNew"
            ref={passNewRef}
            onChange={(e) => setPassNew(e.target.value)}
          />
          <div className="mt-2 mb-3 d-flex justify-content-center">
            <button type="button" onClick={changePassNew} className="btn btn-primary">Lưu</button>
          </div>
      </div>
    </div>
  )
}

export default WithdrawHistory