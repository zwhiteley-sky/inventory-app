import close from '../../assets/close.svg'
import styles from './Modal.module.css'

function AddItemModal({toggleModal}) {

    function submit(e) {
        console.log('submit')
        e.preventDefault()
    }

    return (
        <>
        <div onClick={() => toggleModal(false)} className={styles.background}></div>
        <div className={styles.centre}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Add New Item</h1>
                    <img className={styles.close} onClick={() => toggleModal(false)}  src={close} alt="" />                
                </div>
                <div className={styles.content}>
                    <form className={styles.form} onSubmit={submit}>
                        <label>Item Name</label>
                        <input className={styles.input} type="text" />
                        <label>Item Price</label>
                        <input className={styles.input} type="number" />
                        <label>Item Category</label>
                        <select className={styles.input} name="" id="">
                            <option value="">Food</option>
                            <option value="">Computer Components</option>
                            <option value="">Car Parts</option>
                        </select>
                        <label>Item Quantity</label>
                        <input className={styles.input}  min={0} type="number" />
                        <label>Item Image URL</label>
                        <input className={styles.input} type="text" />
                        <label>Item Description</label>
                        <textarea className={styles.input} name="" id="" cols="30" rows="3"></textarea>
                        <button className={styles.submit}>Submit New Item</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default AddItemModal;