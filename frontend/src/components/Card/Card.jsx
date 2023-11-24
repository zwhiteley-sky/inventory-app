import information from '../../assets/information.svg'
import pencil from '../../assets/pencil.svg'
import trash from '../../assets/trash.svg'
import pineapple from '../../assets/pineapple.png'
import DescriptionModal from '../Modals/DescriptionModal'
import EditItemModal from '../Modals/EditItemModal'
import styles from './Card.module.css'
import { useState } from 'react'
import { useAuth } from '../../providers/AuthProvider'

function Card({onRefresh, card}) {
    const [descriptionModal, setDescriptionModal] = useState(false)
    const [editModal, setEditModal] = useState(false)

    const [auth] = useAuth()

    function testCard(e) {
        console.log('clicked')
    }

    function handleDescription(e) {
        e.stopPropagation()
        setDescriptionModal(true)
    }

    function handleEdit(e) {
        e.stopPropagation()
        setEditModal(true)
    }

    async function handleDelete(e) {
        e.stopPropagation()
        const response = await fetch(`http://localhost:4000/product/${card.id}`, {
            headers: {
                "Authorization": `Bearer ${auth.token}`
            },
            method: 'DELETE'
        }) 
        onRefresh()
    }

    return(
        <>
            {descriptionModal && <DescriptionModal card={card} toggleModal={setDescriptionModal} />}
            {editModal && <EditItemModal onRefresh={onRefresh} card={card} toggleModal={setEditModal} />}
            <div onClick={testCard} className={styles.card}>
                <span className={styles.header}>
                    <h2 className={styles.title}>{card.name}</h2>
                    <h3 className={styles.price}>£{(card.price).toFixed(2)}</h3>
                </span>
                <img className={styles.img} src={pineapple} alt="" />
                <div className={styles.footer}>
                    <div className={styles.icons}>
                        <img onClick={handleDescription} className={styles.icon} src={information} alt="" />
                        <img onClick={handleEdit} className={styles.icon} src={pencil} alt="" />
                        <img onClick={handleDelete} className={styles.icon} src={trash} alt="" />
                    </div>
                    
                    <h4 className={styles.quantity}>{card.quantity}</h4>
                </div>
            </div>
        </>

    )
}

export default Card;
