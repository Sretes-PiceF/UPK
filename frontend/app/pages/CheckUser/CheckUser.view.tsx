import React, { FC } from 'react'
import { CheckUser } from './CheckUser.type'

const CheckUserView: FC<CheckUser> = ({ user, nama }) => {
    return (
        <div>
            <div className="">{nama}</div>
            <pre className="">{user ? JSON.stringify(user, null, 2) : "Belum login"}</pre>
        </div>
    )
}

export default CheckUserView
