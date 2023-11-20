import './checkoutButton.css'
import checkout from '../assets/checkout.svg'

function CheckoutButton() {
    return (
    <button>
        <img src={checkout} alt="" />
        Checkout
    </button>
    )
}

export default CheckoutButton