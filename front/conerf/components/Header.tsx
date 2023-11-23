'use client'

import CreateJobDialog from '@/components/CreatJobDialog'

const Header = () => {
  return (
    <header className='h-36 w-full '>
      <div className='h-full w-4/5 m-auto flex items-center justify-between'>
        <div className='text-4xl flex items-center'>
          <div className='h-20 w-20 mr-4'>
            <img
              src='/conerf_logo_icon.png'
              alt=''
              className='w-full h-full object-cover'
            />
          </div>
          CoNeRF Job List
        </div>
        <div>
          <CreateJobDialog />
        </div>
      </div>
    </header>
  )
}

export default Header
