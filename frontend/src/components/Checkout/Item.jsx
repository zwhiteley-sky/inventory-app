import styles from './Item.module.css'
import trash from '../../assets/trash.svg'



function Item() {
    return(
        <div className={styles.item}>
            <div className={styles.header}>
                <h4 className={styles.title}> {<p className={styles.amount}>4x</p>}Pineapple {<p className={styles.price}>(£3.10)</p>}</h4>
                <img className={styles.img} src={trash} alt="" />
            </div>
        </div>
    )
}


export default Item