'use client'

import { useEffect, useState } from 'react'

type JobStatusProps = {
  status: string
  jobId: string
}

const JobStatus = (props: JobStatusProps) => {
  const [jobId, setJobId] = useState(props.jobId)
  const [status, setStatus] = useState(props.status)
  const [file, setFile] = useState<FormData | null>(null)
  const [statusOpen1, setStatusOpen1] = useState(false)
  const [statusOpen2, setStatusOpen2] = useState(false)
  const [statusOpen3, setStatusOpen3] = useState(false)
  const [statusOpen4, setStatusOpen4] = useState(false)
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   setStatus(props.status)
  // }, [])
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleUpload')
    if (e.target.files !== null) {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('file', file)
      // formData.append('title', file.name)
      formData.append('job_id', jobId)
      console.log(typeof formData)
      setFile(formData)
    }
  }

  const postFile = async () => {
    setLoading(true)
    console.log('postFile')
    const url = '/api/postvideo'
    const res = await fetch(url, {
      method: 'POST',
      body: file,
    })
    const data = await res.json()
    console.log(data)
    setLoading(false)
  }

  const runFfmpeg = async () => {
    console.log('runFfmpeg')
    console.log(jobId)
    const url = '/api/runffmpeg'
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ job_id: jobId }),
    })
    const data = await res.json()
    console.log(data)
  }

  const runColmap = async () => {
    console.log('runColmap')
    console.log(jobId)
    const url = '/api/runcolmap'
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ job_id: jobId }),
    })
    const data = await res.json()
    console.log(data)
  }

  const runTrain = async () => {
    console.log('runTrain')
    console.log(jobId)
    const url = '/api/runtrain'
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ job_id: jobId }),
    })
    const data = await res.json()
    console.log(data)
  }

  const runViewer = async () => {
    console.log('runViewer')
    console.log(jobId)
    const url = '/api/runviewer'
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ job_id: jobId }),
    })
    const data = await res.json()
    console.log(data)
  }

  const getFileNumbers = async () => {
    console.log('getFileNumbers')
    const url = `/api/getfilenumbers/${jobId}`
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    console.log(data)
  }

  useEffect(() => {
    console.log(status)
    // setStatus(props.status)
    if (status == '1') {
      // getFileNumbers()
      setStatusOpen1(true)
    }
    if (status == '3' || status == '4') {
      setStatusOpen2(true)
    }
    if (status == '5' || status == '6') {
      setStatusOpen3(true)
    }
    if (status == '7') {
      setStatusOpen4(true)
    }
  }, [status])

  return (
    <>
      {loading && (
        <div className='w-screen h-screen fixed left-0 top-0 bg-gray-50 bg-opacity-80 flex flex-col justify-center items-center z-10 gap-y-5'>
          <div className='text-gray-500 text-5xl text-center'>
            動画ファイルをアップロード中です。
            <br />
            しばらくお待ち下さい。
          </div>
          <div className='animate-spin rounded-full h-32 w-32 border-b-8 border-gray-900'></div>
        </div>
      )}
      <div className='relative z-0'>
        <div className='w-full h-10 rounded-full border border-gray-700 flex items-center px-8 justify-center relative'>
          <button
            className='w-full h-full absolute'
            onClick={() => {
              setStatusOpen1(!statusOpen1)
            }}
          >
            Upload video and Split video
          </button>
        </div>
        {statusOpen1 && (
          <div className='flex flex-col items-start my-5'>
            {/* <div className='mb-2'>動画ファイル数 1/4</div> */}
            <input type='file' onChange={handleUpload} />
            <button
              className='mt-2 px-4 py-2 rounded-full bg-gray-700'
              onClick={postFile}
            >
              動画ファイルを登録
            </button>
            <button
              className='mt-2 px-4 py-2 rounded-full bg-gray-700'
              onClick={runFfmpeg}
            >
              動画ファイルを分割
            </button>
          </div>
        )}
        <div className='w-full h-10 rounded-full border border-gray-700 flex items-center px-8 justify-center mt-5 relative'>
          <button
            className='w-full h-full absolute'
            onClick={() => {
              setStatusOpen2(!statusOpen2)
            }}
          >
            Run SfM
          </button>
        </div>
        {statusOpen2 && (
          <div>
            {status != '4' && (
              <button
                className='mt-2 px-4 py-2 rounded-full bg-gray-700'
                onClick={runColmap}
              >
                Colmapを実行
              </button>
            )}
            {status == '4' && (
              <div>
                <button
                  className='mt-2 px-4 py-2 rounded-full bg-gray-700'
                  onClick={runColmap}
                  disabled
                >
                  Colmapを実行中...
                </button>
                <div>
                  COLMAPでマップ作成中... この処理には時間がかかります。
                </div>
              </div>
            )}
          </div>
        )}
        <div className='w-full h-10 rounded-full border border-gray-700 flex items-center px-8 justify-center mt-5 relative'>
          <button
            className='w-full h-full absolute'
            onClick={() => {
              setStatusOpen3(!statusOpen3)
            }}
          >
            Run train
          </button>
        </div>
        {statusOpen3 && (
          <div>
            {status != '6' && (
              <div>
                <button
                  className='mt-2 px-4 py-2 rounded-full bg-gray-700'
                  onClick={runTrain}
                >
                  NeRF学習を実行
                </button>
              </div>
            )}
            {status == '6' && (
              <div>
                <button
                  className='mt-2 px-4 py-2 rounded-full bg-gray-700'
                  onClick={runTrain}
                  disabled
                >
                  NeRF学習を実行中...
                </button>
                <div>
                  現在の学習状況は
                  <a
                    className='underline text-blue-500'
                    rel='noreferrer'
                    target='_blank'
                    href='https://viewer.nerf.studio/versions/23-05-15-1/?websocket_url=ws://localhost:7007'
                  >
                    こちら
                  </a>
                  から確認できます。
                </div>
              </div>
            )}
          </div>
        )}
        <div className='w-full h-10 rounded-full border border-gray-700 flex items-center px-8 justify-center mt-5 relative'>
          <button
            className='w-full h-full absolute'
            onClick={() => {
              setStatusOpen4(!statusOpen4)
            }}
          >
            Completed
          </button>
        </div>
        {statusOpen4 && (
          <div>
            <div>学習まで完了しました。</div>
            <button
              className='mt-2 px-4 py-2 rounded-full bg-gray-700'
              onClick={runViewer}
            >
              Viewerを起動
            </button>
            <div>
              NeRFの結果は
              <a
                className='underline text-blue-500'
                rel='noreferrer'
                target='_blank'
                href='https://viewer.nerf.studio/versions/23-05-15-1/?websocket_url=ws://localhost:7007'
              >
                こちら
              </a>
              から確認できます。
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default JobStatus
