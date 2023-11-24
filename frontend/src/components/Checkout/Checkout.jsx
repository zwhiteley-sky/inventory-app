import close from '../../assets/close.svg'
import styles from './Checkout.module.css'
import Item from './Item.jsx'

function Checkout({toggleModal}) {

    return (
        <>
        <div onClick={() => toggleModal(false)} className={styles.background}></div>
        <div className={styles.centre}>
            <div className={styles.modal}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>Checkout</h1>
                        <img className={styles.close} onClick={() => toggleModal(false)}  src={close} alt="" />                
                    </div>
                    <div className={styles.content}>
                        <Item />
                        <Item />
                        <Item />
                    </div>
                    <button class={styles.pay}>Pay £20</button>
                </div>

            </div>
        </div>
        </>
    )
}

export default Checkout;