"use client"
import { useParamsStore } from '@/hooks/useParamsStore'
import React from 'react'
import {AiOutlineCar} from 'react-icons/ai'
import {usePathname, useRouter} from "next/navigation";

const Logo = () => {
    const reset = useParamsStore(state=>state.reset)
    const pathName = usePathname()
    const ruter = useRouter()

    const doReset = () => {
        if(pathName !== "/"){
            ruter.push("/")
        }
        reset()
    }

  return (
    <div onClick={doReset} className='flex cursor-pointer items-center gap-2 text-3xl font-semibold text-red-500' >
    <AiOutlineCar size={34} />
    <div>Carsties Auctions</div>
</div>
  )
}

export default Logo