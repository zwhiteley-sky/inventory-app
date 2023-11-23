import close from '../../assets/close.svg'
import styles from './Modal.module.css'

function DescriptionModal({toggleModal}) {

    return (
        <>
        <div onClick={() => toggleModal(false)} className={styles.background}></div>
        <div className={styles.centre}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h1 className={styles.title}>(name) Description</h1>
                    <img className={styles.close} onClick={() => toggleModal(false)}  src={close} alt="" />                
                </div>
                <div className={styles.content}>
                    <p className={styles.category}>Category: [category]</p>
                    <p className={styles.text}>
                        Hello, this is the description field where many describable activites can take place of describing the items that we purport to be selling.
                    </p>
                </div>
            </div>
        </div>
        </>
    )
}

export default DescriptionModal;