import type { NextApiRequest, NextApiResponse } from 'next'

class Props {
  job_id?: string
  command?: string
}

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  // console.log(req.body)
  const props = req.body as Props
  console.log(`[POST /api/runrender] props: ${JSON.stringify(props)}`)
  const url = `http://web:8000/api/v1/conerf/jobs/${props.job_id}/render/`
  console.log(`[POST /api/runrender] url: ${url}`)
  try {
    // console.log(props)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ command: props.command }),
    })
    const data = await response.json()
    console.log(`[POST /api/runrender] return data: ${data}`)
    res.setHeader('Content-Type', 'application/json')
    return res.status(200).json({ data })
  } catch (error) {
    console.error(error)
    return res.status(500).end()
  }
}
