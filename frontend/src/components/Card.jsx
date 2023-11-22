import information from '../assets/information.svg'
import pencil from '../assets/pencil.svg'
import trash from '../assets/trash.svg'
import pineapple from '../assets/pineapple.png'
import DescriptionModal from './DescriptionModal'
import EditItemModal from './EditItemModal'
import './Card.css'
import { useState } from 'react'

function Card() {
    const [descriptionModal, setDescriptionModal] = useState(false)
    const [editModal, setEditModal] = useState(false)

    return(
        <>
            {descriptionModal && <DescriptionModal setDescriptionModal={setDescriptionModal} />}
            {editModal && <EditItemModal setEditModal={setEditModal} />}
            <div className="card">
                <span className="card-header">
                    <h2 className="card-title">Pineapple</h2>
                    <h3 className="card-price">£0.65</h3>
                </span>
                <img className="card-image" src={pineapple} alt="" />
                <div className="card-footer">
                    <div className="card-icons">
                        <img onClick={() => setDescriptionModal(true)} className="card-info" src={information} alt="" />
                        <img onClick={() => setEditModal(true)} className="card-info" src={pencil} alt="" />
                        <img onClick={() => console.log("delete")} className="card-info" src={trash} alt="" />
                    </div>
                    
                    <h4 className="card-quantity">732x</h4>
                </div>
            </div>
        </>

    )
}

export default Card;
