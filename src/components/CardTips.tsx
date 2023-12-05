'use client'
import { useRoot } from "./RootContext"

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

function CardTips() {
    const { total, handleChangeTip, totalTip, tipPercent } = useRoot()
    return (
        <div className={"card__content"}>
            <h3>TIPS CALCULATOR</h3>
            <div className="tips__total">
                <span>Total</span>
                <p>{formatter.format(total)}</p>
            </div>
            <div className="tips__total">
                <span>Tip</span>
                <input placeholder={"Tip"} type="number" className='input' value={tipPercent || ''} autoFocus onChange={handleChangeTip} max="100" />
                <p>{formatter.format(totalTip)}</p>
            </div>

        </div>
    )
}

export default CardTips