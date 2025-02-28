'use client';
import styles from './styles/Login.module.css';
import { motion } from 'framer-motion';

const Login = () => {
    return (
        <div className={styles.background} >

    
        <div className={styles.loginContainer}>
            <img src="/images/UPK/logo.png" alt="Logo" />
            <motion.h2
                animate={{ y: "0", opacity: 1 }} // opacity: 1 (terlihat)
                initial={{ y: "1000", opacity: 0 }} // opacity: 0 (tidak terlihat di awal)
                transition={{ duration: 0.8 }}
            >
                Persatuan Guru
            </motion.h2>
            <p>Republik Indonesia</p>   
            <h2>SMP PGRI 6 MALANG</h2>
            <input type="text" placeholder="Username" className={styles.input} required />
            <input type="password" placeholder="Password" className={styles.input} required />
            <button className={styles.button}>Login</button>
            <p className={styles.footer}>
                Jl. Kolonel Sugiono III No.82, Ciptomulyo, Kec. Sukun, Kota Malang, Jawa Timur 65148
            </p>
        </div>
        </div>
    );
};

export default Login;