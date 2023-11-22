import './AddItemButton.css'
import Box from '../assets/admin.svg'
import add from '../assets/add.svg'

function AddItemButton({setAddItemModal}) {
    return (
        <button onClick={() => setAddItemModal(true)}>
        <img src={add} alt="" />
        Add Item
        </button>
    )
}

export default AddItemButton