"use client"
import { useParamsStore } from '@/hooks/useParamsStore'
import React, { useState } from 'react'
import {FaSearch} from "react-icons/fa"
import {usePathname, useRouter} from "next/navigation";

const Search = () => {
    const setParams = useParamsStore(state=>state.setParams)
    const setSearchValue = useParamsStore(state=>state.setSearchValue)
    const searchValue = useParamsStore(state=>state.searchValue)
    const pathname = usePathname()
    const router = useRouter()

    function onChange (e: React.ChangeEvent<HTMLInputElement>){
        setSearchValue(e.target.value)
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            search();
        }
    }

    function search(){
        if(pathname !== "/") router.push("/")
        setParams({
            searchTerm:searchValue
        })
    }

  return (
    <div 
        className='flex w-[50%] items-center border-2 rounded-full py-2 shadow-sm'
    >
        <input 
            type='text'
            placeholder='Search for cars by make, model or color'
            className='
             flex-grow
             pl-5
             bg-transparent
             border-transparent
             focus:border-transparent
             focus:outline-none
             focus:ring-0
             text-sm
             text-gray-600
            '
            value={searchValue}
            onChange={(e)=>onChange(e)}
            onKeyDown={(e)=>{handleKeyDown(e)}}
        />
        <button 
            className='flex justify-center content-center'
            onClick={()=>{search()}}
        >
            <FaSearch
             size={34}
              className="bg-red-400 text-white rounded-full p-2 cursor-pointer mx-2 hover:shadow-md"  />
        </button>

    </div>
  )
}

export default Search