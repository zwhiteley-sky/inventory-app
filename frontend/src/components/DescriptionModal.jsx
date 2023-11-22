import './DescriptionModal.css'
import close from '../assets/close.svg'

function DescriptionModal({setDescriptionModal}) {
    return (
        <div className='modal-background'>
            <div className="modal-centre">
                <div className="modal">
                    <div className="modal-header">
                        <h1 className="modal-title">Description</h1>
                        <img onClick={() => setDescriptionModal(false)} class="modal-close" src={close} alt="" />                
                    </div>
                    <div className="modal-content">
                        <p className='modal-text'>Hello, this is the description field where many describable activites can take place of describing the items that we purport to be selling </p>
                    </div>
                    
                </div>
                
            </div>
        </div>
    )
}

export default DescriptionModal;