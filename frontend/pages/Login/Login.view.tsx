'use client'
import React, { FC } from 'react'
import { LoginType } from './Login.type'
import styles from '@/components/styles/Login.module.css';
import { motion as m } from 'framer-motion';
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const LoginView: FC<LoginType> = ({
  handleLogin,
  setUsername,
  setPassword,
  error,
  username,
  password
  // {
  //   username: string;
  //   password: string;
  //   error: string | null; // Ubah tipe data error menjadi string | null
  //   setUsername: (value: string) => void;
  //   setPassword: (value: string) => void;
  //   handleLogin: (e: React.FormEvent) => void;
}) => {
  return (
    <>
      <m.div
        className={styles.background}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 0.5, delay: 0.8 }} />

      <m.div
        className={styles.loginContainer}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "0", opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}>

        <img src="/images/UPK/logo.png" alt="Logo" />
        <h2>Persatuan Guru</h2>
        <p>Republik Indonesia</p>
        <h2>SMP PGRI 6 MALANG</h2>
        <form onSubmit={handleLogin}>
          <input type="text" style={{ color: 'black' }} placeholder="Username" name="user_username" className={styles.input} value={username} onChange={(e) => setUsername(e.target.value)} required />

          <input type="password" style={{ color: 'black' }} placeholder="Password" name="user_password" className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} required />
          {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
          <button className={styles.button}>Login</button>
        </form>
        <p className={styles.footer}>
          Jl. Kolonel Sugiono III No.82, Ciptomulyo, Kec. Sukun, Kota Malang, Jawa Timur 65148
        </p>

        {error && (
          <Alert variant="destructive" className='bg-red-700'>
            <AlertCircle className="h-4 w-4" color='white' />
            <AlertTitle className='ml-[-40px] text-cyan-50'>Error Login</AlertTitle>
            <AlertDescription className='ml-[-40px] text-cyan-50'>
              {error}
            </AlertDescription>
          </Alert>
        )}
      </m.div>
    </>
  )
}

export default LoginView
