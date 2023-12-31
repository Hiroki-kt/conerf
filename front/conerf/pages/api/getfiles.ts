import type { NextApiRequest, NextApiResponse } from 'next'

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log('GET /api/getfiles')
  const job_id = req.query.job_id
  const url = 'http://web:8000/api/v1/conerf/file_list?job=' + job_id
  try {
    const response = await fetch(url)
    return res.status(200).json(await response.json())
    // resolve()
  } catch (error) {
    console.error(error)
    return res.status(500).end()
  }
}
