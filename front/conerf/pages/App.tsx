import React from 'react'
import { useEffect, useState } from 'react'

const App = () => {
  const [jobs, setJobs] = useState([])

  const getJobs = async () => {
    const res = await fetch('/api/getjobs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    console.log(data)
    setJobs(data)
  }

  useEffect(() => {
    getJobs()
  }, [])

  return (
    <main className='w-full h-full'>
      <div className='m-auto pt-36 w-4/5'>
        <div className='w-full h-10 rounded-full border border-gray-700 flex items-center px-8 text-gray-700'>
          Sample....
        </div>
        <div className='text-3xl mt-5'>Your Jobs</div>
        <div className='mt-5 flex flex-wrap justify-between'>
          {jobs.map((job) => {
            return (
              <div className='w-1/4 '>
                <a href='/job' className='block w-full rounded-3xl pt-[100%] bg-gray-700'></a>
                <div className='mt-3'>{job.title}</div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}

export default App
