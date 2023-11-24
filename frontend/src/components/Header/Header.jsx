import styles from './Header.module.css'
import box from '../../assets/box.svg'
import add from '../../assets/add.svg'
import checkout from '../../assets/checkout.svg'
import AddItemModal from '../Modals/AddItemModal.jsx'
import CheckoutModal from '../Checkout/Checkout.jsx'
import ModalButton from '../Buttons/ModalButton.jsx'
import { useState } from 'react'

function Header({onRefresh}) {
    const [itemModal, setItemModal] = useState(false)
    const [checkoutModal, setCheckoutModal] = useState(false)

    return(
        <>
        {itemModal && <AddItemModal onRefresh={onRefresh} toggleModal={setItemModal} />}
        {checkoutModal && <CheckoutModal toggleModal={setCheckoutModal}/>}
        <header className={styles.header}>
            <span className={styles.row}>
                <span className={styles.icon}>
                    <img className={styles.img} src={box} alt="" />
                </span>
                <h1 className={styles.title}>Inventory</h1>
            </span>
            <span className={styles.buttons}>
                <ModalButton text="Add Item" icon={add} toggleModal={setItemModal} />
                <ModalButton text="Checkout" icon={checkout} toggleModal={setCheckoutModal} />
            </span>
            <span className={styles.mobilebuttons}>
                <ModalButton text="" icon={add} toggleModal={setItemModal} />
                <ModalButton text="" icon={checkout} toggleModal={setCheckoutModal} />
            </span>   
        </header>
        </>

    )
}

export default Header