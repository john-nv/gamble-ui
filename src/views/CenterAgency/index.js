import PageTitle from "@components/PageTitle"
import TransactionListItem from "@components/Transactions/TransactionListItem"
import user from "@services/user"
import _ from "lodash"
import { useEffect, useState } from "react"
import { PaginatedList } from "react-paginated-list"
import { useAsync } from "react-use"


const CenterAgency = () => {
  const [supportInfo, setSupportInfo] = useState(null);

  useEffect(() => {
    const fetchSupportInfo = async () => {
      try {
        const response = await fetch('http://167.86.83.212:7171/config-support');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSupportInfo(data);
      } catch (error) {
        console.error('There was a problem fetching support information:', error);
      }
    };

    fetchSupportInfo();
  }, []);

  const decodedProfileSupport = supportInfo ? decodeURIComponent(supportInfo.agencySupport) : 'Đang tải thông tin...';
  
  return (
    <div className="game-transaction d-flex flex-column flex-fill">
      <div className="container flex-fill">
        <div className="row mt-2 mb-4">
          <PageTitle to="/tai-khoan/thong-tin" title="Trung tâm đại lý" />
        </div>
        <textarea
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              resize: 'none',
              width: '100%',
              height: '90%',
              overflowY: 'auto',
              color: 'white',
              outline: 'none',
              scrollbarWidth: 'thin',
              scrollbarColor: 'white transparent' 
            }}
          value={decodedProfileSupport}
          readOnly={true}
        />
      </div>
    </div>
  )
}

export default CenterAgency