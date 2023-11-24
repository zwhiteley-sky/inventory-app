import close from '../../assets/close.svg'
import styles from './Modal.module.css'
import { useAuth } from '../../providers/AuthProvider'
import { useEffect, useState } from 'react'

function AddItemModal({onRefresh, toggleModal}) {

    const [auth] = useAuth()

    const [categories, setCategories] = useState([])

    useEffect(() => {
        (async function () {
            const response = await fetch('http://localhost:4000/category')
            const list = await response.json()
            setCategories(list)
        })()
    }, [])

    async function submit(e) {
        console.log('submit')
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name");
        const price = formData.get("price");
        const select = formData.get("select");
        const quantity = formData.get("quantity");
        const image = formData.get("image");
        const description = formData.get("description");

        const response = await fetch(`http://localhost:4000/product`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${auth.token}`
            },
            body: JSON.stringify({name, price, categoryId: select, quantity, description})
        }) 
        onRefresh()
        toggleModal(false)
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
                        <input name="name" className={styles.input} type="text" />
                        <label>Item Price</label>
                        <input name="price" className={styles.input} step=".01" min="0" max="1000" type="number" />
                        <label>Item Category</label>
                        <select name="select" className={styles.input} id="">
                            {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                        </select>
                        <label>Item Quantity</label>
                        <input name="quantity" className={styles.input}  min={0} type="number" />
                        <label>Item Image URL</label>
                        <input name="image" className={styles.input} type="text" />
                        <label>Item Description</label>
                        <textarea name="description" className={styles.input} id="" cols="30" rows="3"></textarea>
                        <button className={styles.submit}>Submit New Item</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default AddItemModal;