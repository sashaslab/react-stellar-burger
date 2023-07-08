import style from './orderDetails.module.css'
import done from "../../images/done.svg"

function OrderDetails() {
    return (
        <div className={`${style.content} pt-30 pb-30 pl-10 pr-10`}>
            <p className="text text_type_digits-large">034536</p>
            <p className="text text_type_main-medium pt-8">идентификатор заказа</p>
            <img src={done} className="pt-15" />
            <p className="text text_type_main-default pt-15">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive pt-2">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails