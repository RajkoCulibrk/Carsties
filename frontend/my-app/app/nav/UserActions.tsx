'use client'
import {Dropdown} from 'flowbite-react';
import {signIn, signOut} from 'next-auth/react'
import React from 'react'
import {User} from 'next-auth'
import {HiCog, HiUser} from 'react-icons/hi2'
import Link from 'next/link';
import {AiFillCar, AiFillTrophy, AiOutlineLogout} from 'react-icons/ai';
import {usePathname, useRouter} from "next/navigation";
import {useParamsStore} from "@/hooks/useParamsStore";

type Props = {
    user: User
}


const UserActions = ({user}: Props) => {

    const router = useRouter()
    const pathname = usePathname()
    const setParams = useParamsStore(state => state.setParams)

    const setWinner = () => {
        setParams({winner: user.username, seller: undefined})
        if (pathname !== "/") {
            router.push("/")
        }
    }

    const setSeller = () => {
        setParams({winner: undefined, seller: user.username})
        if (pathname !== "/") {
            router.push("/")
        }
    }

    return (
        <Dropdown label={`${user.name}`} dismissOnClick={false}>
            <Dropdown.Item icon={HiUser} onClick={() => {
                setSeller()
            }}>
                My Auctions
            </Dropdown.Item>

            <Dropdown.Item icon={AiFillTrophy} onClick={() => {
                setWinner()
            }}>
                Auctions won
            </Dropdown.Item>

            <Dropdown.Item icon={AiFillCar}>
                <Link href='/auctions/create'>
                    Sell my car
                </Link>
            </Dropdown.Item>

            <Dropdown.Item icon={HiCog}>
                <Link href='/session'>
                    Session
                </Link>
            </Dropdown.Item>

            <Dropdown.Divider/>

            <Dropdown.Item icon={AiOutlineLogout} onClick={() => {
                signOut({callbackUrl: "/"})
            }}>
                Sign out
            </Dropdown.Item>


        </Dropdown>
    )
}

export default UserActions