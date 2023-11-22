import './Header.css'
import box from '../assets/box.svg'
import admin from '../assets/admin.svg'
import add from '../assets/add.svg'
import AddItemButton from './AddItemButton'
import CheckoutButton from '../components/CheckoutButton'
import AddItemModal from './AddItemModal.jsx'
import { useState } from 'react'

function Header() {
    const [addItemModal, setAddItemModal] = useState(false)

    return(
        <>
        {addItemModal && <AddItemModal setAddItemModal={setAddItemModal} />}
        <header>
            <span className="header">
                <span className="icon">
                    <img src={box} alt="" />
                </span>
                <h1>Inventory</h1>
            </span>
            <span className="buttons">
                <AddItemButton setAddItemModal={setAddItemModal}/>
                <CheckoutButton />
            </span>    
        </header>
        </>

    )
}

export default Header