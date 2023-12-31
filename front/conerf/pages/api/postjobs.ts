import type { NextApiRequest, NextApiResponse } from 'next'
import { resolve } from 'path'

class JobProps {
  title?: string
  description?: string
  status: string = '1'
  participants?: number
}

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  // console.log(req.body)
  const url = 'http://web:8000/api/v1/conerf/jobs/'
  const props = req.body as JobProps
  console.log(`[POST /api/postjobs] props: ${props}`)
  try {
    // console.log(props)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(props),
    })
    const data = await response.json()
    console.log(`[POST /api/postjobs] return data: ${data}`)
    res.setHeader('Content-Type', 'application/json')
    return res.status(200).json({ data })
  } catch (error) {
    console.error(error)
    return res.status(500).end()
  }
}
