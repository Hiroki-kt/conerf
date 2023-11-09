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
      <div className='m-auto pt-14 w-4/5'>
        <div className='text-xl mt-5'>ジョブ一覧</div>
        <div className='mt-5'>
          {jobs.map((job) => {
            return <div>{job.title}</div>
          })}
        </div>
      </div>
    </main>
  )
}

export default App
