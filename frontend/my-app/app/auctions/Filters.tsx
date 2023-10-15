import { Button } from 'flowbite-react'
import ButtonGroup from 'flowbite-react/lib/esm/components/Button/ButtonGroup'
import React from 'react'

type Props = {
    pageSize:number,
    setPageSize: (size:number)=>void
}

const pageSizeButtons = [4,8,12]

const Filters = ({pageSize,setPageSize}:Props) => {
  return (
    <div className='flex justify-between items-center mb-4' >
            <span  className='uppercase text-sm text-gray-500 mr-2' >
                Page size
            </span>
            <ButtonGroup>
                {pageSizeButtons.map((value, index)=>{
                    return <Button
                                 key={index}
                                  onClick={()=>setPageSize(value)}
                                  color={`${pageSize === value ? "red" : "gray"}`}
                                  className='focus:ring-0'
                            >
                                {value}
                            </Button>
                })}
            </ButtonGroup>
    </div>
  )
}

export default Filters