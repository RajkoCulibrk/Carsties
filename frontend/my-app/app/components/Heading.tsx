import React from 'react'

type Props = {
    title: string,
    subtitle?: string,
    center?: boolean
}

const Heading = ({subtitle,title,center}:Props) => {
  return (
    <div
        className={center ? "text-center" : ""}
    >
        <div className='text-2xl font-bold'>
            {title}
        </div>
        <div className='font-light text-neutral-500  mt-2'>
            {subtitle}
        </div>
        
    </div>
  )
}

export default Heading