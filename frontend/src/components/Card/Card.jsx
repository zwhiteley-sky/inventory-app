import information from '../../assets/information.svg'
import pencil from '../../assets/pencil.svg'
import trash from '../../assets/trash.svg'
import pineapple from '../../assets/pineapple.png'
import DescriptionModal from '../Modals/DescriptionModal'
import EditItemModal from '../Modals/EditItemModal'
import styles from './Card.module.css'
import { useState } from 'react'

function Card() {
    const [descriptionModal, setDescriptionModal] = useState(false)
    const [editModal, setEditModal] = useState(false)

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

    function handleDelete(e) {
        e.stopPropagation()
        console.log('delete')
    }

    return(
        <>
            {descriptionModal && <DescriptionModal toggleModal={setDescriptionModal} />}
            {editModal && <EditItemModal toggleModal={setEditModal} />}
            <div onClick={testCard} className={styles.card}>
                <span className={styles.header}>
                    <h2 className={styles.title}>Pineapple</h2>
                    <h3 className={styles.price}>£0.65</h3>
                </span>
                <img className={styles.img} src={pineapple} alt="" />
                <div className={styles.footer}>
                    <div className={styles.icons}>
                        <img onClick={handleDescription} className={styles.icon} src={information} alt="" />
                        <img onClick={handleEdit} className={styles.icon} src={pencil} alt="" />
                        <img onClick={handleDelete} className={styles.icon} src={trash} alt="" />
                    </div>
                    
                    <h4 className={styles.quantity}>732x</h4>
                </div>
            </div>
        </>

    )
}

export default Card;
