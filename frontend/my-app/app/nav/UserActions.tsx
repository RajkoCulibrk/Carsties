'use client'
import { Dropdown } from 'flowbite-react';
import { signIn, signOut } from 'next-auth/react'
import React from 'react'
import {User} from 'next-auth'
import {HiCog, HiUser} from 'react-icons/hi2'
import Link from 'next/link';
import { AiFillCar, AiFillTrophy, AiOutlineLogout } from 'react-icons/ai';

type Props =  {
    user: Partial<User>
}


const UserActions = ({user}:Props) => {

    
  return (
    <Dropdown label={`${user.name}`} dismissOnClick={false} >
         <Dropdown.Item icon={HiUser} >
            <Link href='/'>
                My Auctions
            </Link>
         </Dropdown.Item>

         <Dropdown.Item icon={AiFillTrophy} >
            <Link href='/'>
                Auctions won
            </Link>
         </Dropdown.Item>

         <Dropdown.Item icon={AiFillCar} >
            <Link href='/'>
                Sell my car
            </Link>
         </Dropdown.Item>

         <Dropdown.Item icon={HiCog} >
            <Link href='/session'>
                Session
            </Link>
         </Dropdown.Item>

         <Dropdown.Divider />

         <Dropdown.Item icon={AiOutlineLogout} onClick={()=>{signOut({callbackUrl:"/"})}} >
                Sign out
         </Dropdown.Item>


    </Dropdown>
  )
}

export default UserActions