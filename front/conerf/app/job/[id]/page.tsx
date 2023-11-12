'use client'

import Job from '@/pages/Job'

const JobPage = ({ params }: { params: { id: string } }) => {
  const id = params.id
  return <Job id={id}></Job>
}

export default JobPage
