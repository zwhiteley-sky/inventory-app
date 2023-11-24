import close from '../../assets/close.svg'
import styles from './Modal.module.css'

function DescriptionModal({card, toggleModal}) {

    return (
        <>
        <div onClick={() => toggleModal(false)} className={styles.background}></div>
        <div className={styles.centre}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{card.name} Description</h1>
                    <img className={styles.close} onClick={() => toggleModal(false)}  src={close} alt="" />                
                </div>
                <div className={styles.content}>
                    <p className={styles.category}>Category: {card.category.name}</p>
                    <p className={styles.text}>
                        {card.description}
                    </p>
                </div>
            </div>
        </div>
        </>
    )
}

export default DescriptionModal;