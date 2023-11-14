'use client'

import React from 'react'
import { useEffect, useState } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

import JobStatus from '@/components/JobStatus'

type JobProps = {
  id: string
}

const Job = (props: JobProps) => {
  const [job, setJob] = useState([])

  const getJob = async () => {
    const url = `/api/job/${props.id}`
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    console.log(data)
    setJob(data)
  }

  useEffect(() => {
    getJob()
  }, [])

  return (
    <main className='w-full h-full'>
      <div className='m-auto w-4/5'>
        <div className='flex mt-7 mb-7 items-center'>
          <a href='/'>
            <ArrowBackIosNewIcon />
          </a>
          <div className='text-xl ml-3'>{job.title}</div>
        </div>
        {job.length != 0 && <JobStatus status={job.status} />}
      </div>
    </main>
  )
}

export default Job
