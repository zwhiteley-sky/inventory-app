import './AddItemModal.css'
import close from '../assets/close.svg'

function EditItemModal({setEditModal}) {

    function submit(e) {
        e.preventDefault()
    }

    return (
        <div className='modal-background'>
            <div className="modal-centre">
                <div className="modal">
                    <div className="modal-header">
                        <h1 className="modal-title">Edit Item</h1>
                        <img onClick={() => setEditModal(false)} class="modal-close" src={close} alt="" />                
                    </div>
                    <div className="modal-content">
                        <form onSubmit={submit}>
                            <label>Item Name</label>
                            <input className="add-item-input" type="text" />
                            <label>Item Price</label>
                            <input className="add-item-input" type="number" />
                            <label>Item Category</label>
                            <select className="add-item-input" name="" id="">
                                <option value="">Food</option>
                                <option value="">Computer Components</option>
                                <option value="">Car Parts</option>
                            </select>
                            <label>Item Quantity</label>
                            <input className="add-item-input"  min={0} type="number" />
                            <label>Item Image URL</label>
                            <input className="add-item-input" type="text" />
                            <label>Item Description</label>
                            <textarea className='add-item-input' name="" id="" cols="30" rows="3"></textarea>
                            <button className="submit-btn">Submit Edits</button>
                        </form>

                    </div>
                    
                </div>
                
            </div>
        </div>
    )
}

export default EditItemModal;