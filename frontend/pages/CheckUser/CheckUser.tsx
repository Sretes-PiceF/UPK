"use client";

import React, { useEffect, useState } from 'react'
import CheckUserView from './CheckUser.view';
import { AxiosError } from 'axios';
import client from '@/lib/axiosConfig';
import { UserType } from './CheckUser.type';

export default function CheckUser() {
    const nama = "fajar";
    const [user, setUser] = useState<UserType | null>(null);
    const getUser = async () => {
        try {
            const res: UserType = await ((await client.get("/api/user")).data);
            setUser(res);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.message);
            }
        }
    }

    useEffect(() => {
        getUser();
    }, [])
    return <CheckUserView nama={nama} user={user} />
}
