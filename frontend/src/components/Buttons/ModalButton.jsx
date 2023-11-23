import styles from './Button.module.css'

function ModalButton({text, icon, toggleModal}) {
    return (
        <button className={styles.btn} onClick={() => toggleModal(true)}>
        <img className={styles.icon} src={icon} alt="" />
        {text}
        </button>
    )
}

export default ModalButton