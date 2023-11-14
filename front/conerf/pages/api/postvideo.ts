import type { NextApiRequest, NextApiResponse } from 'next'
import { resolve } from 'path'

// class VideoUploadProps {
//   title?: string
//   job?: number
//   file?: FormData
// }

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb', // Set desired value here
    },
  },
}

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  // console.log(req.body)
  const url = 'http://web:8000/api/v1/conerf/file_uploads/'
  const formData = req.body
  console.log(`[POST /api/postvideo] props: ${typeof formData}`)
  try {
    // console.log(props)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
    const data = await response.json()
    // console.log(`[POST /api/postvideo] return data: ${data}`)
    res.setHeader('Content-Type', 'application/json')
    return res.status(200).json({ data })
  } catch (error) {
    console.error(error)
    return res.status(500).end()
  }
}
