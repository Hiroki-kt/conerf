import fs from 'fs'
import FormData from 'form-data'
import { parseForm } from '../../lib/parse-forms'

import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const url = 'http://web:8000/api/v1/conerf/file_uploads/'
  try {
    const { files, fields } = await parseForm(req)
    const f = files['file'] as any
    const payload = {
      title: f[0].originalFilename,
      file: f[0].filepath,
      job: Number(fields['job_id']),
    }
    console.log(`[POST /api/postvideo] payload: ${JSON.stringify(payload)}`)

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    const data = await response.json()
    // return new Response(data, { status: 200 })
    return res.status(200).json({ data })
    // })
  } catch (err) {
    console.error(err)
    // res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' })
    res.end(String(err))
    return
  }
}
