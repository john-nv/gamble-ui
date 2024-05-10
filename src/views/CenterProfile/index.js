import PageTitle from "@components/PageTitle"
import TransactionListItem from "@components/Transactions/TransactionListItem"
import user from "@services/user"
import _ from "lodash"
import numeral from "numeral"
import { PaginatedList } from "react-paginated-list"
import { useSelector } from "react-redux"
import { useAsync } from "react-use"


const WithdrawHistory = () => {
  const { currentUser } = useSelector(state => state.session)
  console.log(currentUser)
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
            <span className="text-light">{currentUser.phoneNumber || 'Chưa cập nhật'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WithdrawHistory