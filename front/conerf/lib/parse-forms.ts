import type { NextApiRequest } from 'next'
import formidable from 'formidable'
import { mkdir, stat } from 'fs/promises'

// export const FormidableError = formidable.errors.FormidableError

export const parseForm = async (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  return new Promise(async (resolve, reject) => {
    const uploadDir = '/mnt/upload'

    const form = formidable({
      maxFiles: 2,
      maxFileSize: 1024 * 1024 * 1024, // 1gb
      uploadDir,
      filename: (_name, _ext, part) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
        const filename = `${uniqueSuffix}.mp4`
        return filename
      },
      filter: (part) => {
        return (
          part.name === 'file' && (part.mimetype?.includes('video') || false)
        )
      },
    })
    form.parse(req, function (err, fields, files) {
      if (err) reject(err)
      else resolve({ fields, files })
    })
  })
}
