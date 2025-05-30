'use client'

import React, { FC } from 'react'
import { LoginType } from './Login.type'
import styles from "@/components/styles/Login.module.css"
import { motion as m } from 'framer-motion';
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from 'next/image';

const LoginView: FC<LoginType> = ({
  handleLogin,
  setUsername,
  setPassword,
  error,
  username,
  password
}) => {
  return (
    <>
      <m.div
        className={styles.background}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      />

      <m.div
        className={styles.loginContainer}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "0", opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Image
          src="/images/UPK/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="mx-auto mb-4"
        />

        <h2>Persatuan Guru</h2>
        <p>Republik Indonesia</p>
        <h2>SMP PGRI 6 MALANG</h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            name="user_username"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ color: 'black' }}
          />

          <input
            type="password"
            placeholder="Password"
            name="user_password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ color: 'black' }}
          />

          <button className={styles.button}>Login</button>
        </form>

        <p className={styles.footer}>
          Jl. Kolonel Sugiono III No.82, Ciptomulyo, Kec. Sukun, Kota Malang, Jawa Timur 65148
        </p>

        {error && (
          <Alert variant="destructive" className="bg-red-600 text-white mt-4 text-center flex justify-center">
            <div className="flex flex-col items-center gap-1">
              <AlertCircle className="h-5 w-5" />
              <div>
                <AlertTitle>Error Login</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </div>
            </div>
          </Alert>
        )}
      </m.div>
    </>
  )
}

export default LoginView
