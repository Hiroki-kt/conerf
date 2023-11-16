import fs from 'fs'
import FormData from 'form-data'
import formidable from 'formidable'

import type { NextApiRequest, NextApiResponse } from 'next'

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

const parseForm = (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err)
      } else {
        resolve({ fields, files })
      }
    })
  })
}

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  // console.log(req.body)
  const url = 'http://web:8000/api/v1/conerf/file_uploads/'
  const { files, fields } = await parseForm(req)
  const formData = new FormData()
  console.log(fields)
  formData.append('title', fields.job_id)
  const f = files.file as any
  if (f) {
    const ff = fs.readFileSync(f.filepath)
    formData.append('file', ff, f.originalFilename)
  }
  console.log(`[POST /api/postvideo] props: ${typeof formData}`)
  // try {
  //   // console.log(props)
  //   const response = await fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //     body: formData,
  //   })
  //   const data = await response.json()
  //   // console.log(`[POST /api/postvideo] return data: ${data}`)
  //   // return new Response(data, { status: 200 })
  //   res.setHeader('Content-Type', 'application/json')
  //   return res.status(200).json({ data })
  // } catch (error) {
  //   console.error(error)
  //   // return new Response(error, { status: 500 })
  //   return res.status(500).end()
  // }
}
