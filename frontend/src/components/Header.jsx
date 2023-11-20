import './Header.css'
import box from '../assets/box.svg'
import admin from '../assets/admin.svg'
import add from '../assets/add.svg'
import Button from '../components/Button'
import CheckoutButton from '../components/CheckoutButton'
import { useState } from 'react'

function Header() {
    return(
        <header>
            <span className="header">
                <span className="icon">
                    <img src={box} alt="" />
                </span>
                <h1>INVENTORY</h1>
            </span>
            <span className="buttons">
                <Button text="Add Item" icon={add}/>
                <CheckoutButton />
            </span>    
        </header>
    )
}

export default Header