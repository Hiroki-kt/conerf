import type { NextApiRequest, NextApiResponse } from 'next'
import { resolve } from 'path'

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { jid } = req.query
  console.log(`GET /api/getjobs ${jid}`)
  const url = `http://web:8000/api/v1/conerf/jobs/${jid}/`
  try {
    const response = await fetch(url)
    return res.status(200).json(await response.json())
    // resolve()
  } catch (error) {
    console.error(error)
    return res.status(500).end()
  }
}
