import Chip from "@components/Chip"
import AppButton from "@components/Controls/AppButton"
import CustomChip from "@components/CustomChip"
import _ from "lodash"
import { useEffect, useState } from "react"

const Bet = ({ chips, onChange, onCancel, value, loading, allowSubmit, waitingFor, bets }) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    if (_.some(chips?.items)) {
      setItems(chips.items)
    }
  }, [chips])

  const handleOnChangeCustomChip = chipSelected => {
    onChange?.(chipSelected)
  }

  if (!allowSubmit) return null
  if (Boolean(waitingFor)) return null

  return (
    <>
      <div style={{ height: 200 }}></div>
      <div className="game-bet d-flex py-2 pb-5">
        <div className="container flex-fill d-flex justify-content-center">
          <div className="flex-fill justify-content-center align-items-center"> {/* d-flex  */}
            <div className="flex-fill  d-flex justify-content-center">
              {_.map(items, (item, idx) => {
                if (item.name === 'custom')
                  return <CustomChip chipItem={item} onChange={handleOnChangeCustomChip} chipSelected={value} />

                return <Chip chipItem={item} key={idx} active={value?.id === item.id} onClick={() => onChange?.({ ...item })} />
              })}
            </div>
            <div className=" d-flex justify-content-center pb-3">
              <button className="btn btn-danger me-2 btn-sm" disabled={!_.some(bets)} type="reset" onClick={onCancel}>Huỷ</button>
              <AppButton className="btn btn-primary btn-sm" disabled={!_.some(bets)} loading={loading} type="submit">Xác nhận</AppButton>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Bet