import styles from './Item.module.css'



function Item() {
    return(
        <div className={styles.item}>
            <div className={styles.header}>
                <h4 className={styles.title}>Pineapple</h4>
            </div>
            
        </div>
    )
}


export default Item