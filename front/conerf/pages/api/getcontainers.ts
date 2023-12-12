import type { NextApiRequest, NextApiResponse } from 'next'

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  // console.log(req.body)
  const url = `http://web:8000/api/v1/conerf/jobs/dockerps`
  console.log(`[POST /api/dockerps] url: ${url}`)
  try {
    // console.log(props)
    const response = await fetch(url)
    const data = await response.json()
    console.log(`[POST /api/dockerps] return data: ${data}`)
    res.setHeader('Content-Type', 'application/json')
    return res.status(200).json({ data })
  } catch (error) {
    console.error(error)
    return res.status(500).end()
  }
}
