import styles from './Login.module.css'
import box from '../../assets/box.svg'
import { useState } from 'react'
import { useAuth } from '../../providers/AuthProvider'

function Login() {

    const [registerPage, setRegisterPage] = useState(false)
    const [auth, login, register, logout] = useAuth()

    async function submitLogin(e) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const emailAddress = formData.get("email-address");
        const password = formData.get("password");
        await login(emailAddress, password)
        
    }

    async function submitRegister(e) {
        e.preventDefault()
        console.log('submitting register')
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name")
        const username = formData.get("username")
        const email = formData.get("email")
        const password = formData.get("password")
        const result = await register(username, name, email, password)

        if(result) {
            setRegisterPage(false)
        }

    }

    if(registerPage) { // Register Page
        return (
            <>
                <header className={styles.header}>
                    <span className={styles.row}>
                        <span className={styles.icon}>
                            <img className={styles.img} src={box} alt="" />
                        </span>
                        <h1 className={styles.title}>Inventory</h1>
                    </span>
                    <p className={styles.subtitle}>The Amazon 2.0</p>
                </header>
    
                <div className={styles.container}>
                    <span className={styles.modes}>
                        <h2 onClick={() => setRegisterPage(false)} className={styles.mode} >Login</h2>
                        <h2 onClick={() => setRegisterPage(true)} className={`${styles.mode} ${styles.active}`}>Register</h2>
                    </span>
                    
                    <form onSubmit={submitRegister} className={styles.form} action="">
                        <label className={styles.label} htmlFor="">Full Name</label>
                        <input className={styles.input} name="name" type="text" />
                        <label className={styles.label} htmlFor="">Username</label>
                        <input className={styles.input} name="username" type="text" />
                        <label className={styles.label} htmlFor="">Email Address</label>
                        <input className={styles.input} name="email" type="text" />
                        <label className={styles.label} htmlFor="">Password</label>
                        <input className={styles.input} name="password" type="password" />
                        <button className={styles.btn}>Register</button>
                    </form>
                </div>
            </>
        )
    } else { // Login Page
        return (
            <>
                <header className={styles.header}>
                    <span className={styles.row}>
                        <span className={styles.icon}>
                            <img className={styles.img} src={box} alt="" />
                        </span>
                        <h1 className={styles.title}>Inventory</h1>
                    </span>
                    <p className={styles.subtitle}>The Amazon 2.0</p>
                </header>
    
                <div className={styles.container}>
                    <span className={styles.modes}>
                        <h2 onClick={() => setRegisterPage(false)} className={`${styles.mode} ${styles.active}`} >Login</h2>
                        <h2 onClick={() => setRegisterPage(true)} className={styles.mode}>Register</h2>
                    </span>
                    
                    <form onSubmit={submitLogin} className={styles.form} action="">
                        <label className={styles.label} htmlFor="">Email Address</label>
                        <input name="email-address" className={styles.input} type="text" />
                        <label className={styles.label} htmlFor="">Password</label>
                        <input name="password" className={styles.input} type="password" />
                        <button className={styles.btn}>Login</button>
                    </form>
                </div>
            </>
        )
    }


}

export default Login