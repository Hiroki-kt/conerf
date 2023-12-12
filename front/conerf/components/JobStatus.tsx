'use client'

import { useEffect, useState, useRef } from 'react'

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import TitleIcon from '@mui/icons-material/Title'

import DefaultFormInput from '@/components/DefaultFormInput'

type JobStatusProps = {
  status: string
  jobId: string
}

const JobStatus = (props: JobStatusProps) => {
  const [jobId, setJobId] = useState(props.jobId)
  const [files, setFiles] = useState([]) as any
  const [status, setStatus] = useState(props.status)
  const [file, setFile] = useState<FormData | null>(null)
  const [fileName, setFileName] = useState('')
  const [statusOpen1, setStatusOpen1] = useState(false)
  const [statusOpen2, setStatusOpen2] = useState(false)
  const [statusOpen3, setStatusOpen3] = useState(false)
  const [statusOpen4, setStatusOpen4] = useState(false)
  const [loading, setLoading] = useState(false)
  const [renderCommand, setRenderCommand] = useState('')
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [viewerStatus, setViewerStatus] = useState(false)
  const [trainViewerStatus, setTrainViewerStatus] = useState(false)

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
      setFileName(file.name)
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
    getFileList()
  }

  const runFfmpeg = async () => {
    console.log('runall')
    console.log(jobId)
    // const url = '/api/runffmpeg'
    const url = '/api/runall'
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ job_id: jobId }),
    })
    // const data = await res.json()
    console.log(res.status)
    // console.log(data)
    setStatus('2')
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
    // const data = await res.json()
    // console.log(data)
    console.log(res.status)
    setStatus('4')
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
    // const data = await res.json()
    // console.log(data)
    console.log(res.status)
    setStatus('6')
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
    // const data = await res.json()
    // console.log(data)
    console.log(res.status)
  }

  const runRender = async () => {
    console.log('runRender')
    console.log(jobId)
    const url = '/api/runrender'
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ job_id: jobId, command: renderCommand }),
    })
    // const data = await res.json()
    // console.log(data)
    console.log(res.status)
  }

  const getContainers = async () => {
    console.log('getContainers')
    const url = '/api/getcontainers'
    const res = await fetch(url)
    const data = await res.json()
    console.log('getContainers')
    console.log(data.data.data)
    const containers = data.data.data
    for (const cid in containers) {
      // console.log(cid)
      // console.log(containers[cid].split('_')[1])
      // console.log(jobId)
      if (containers[cid].split('_')[1] == jobId) {
        // console.log('match')
        if (cid == 'train') {
          setTrainViewerStatus(true)
          console.log(trainViewerStatus)
        } else if (cid == 'viewer') {
          console.log('viewer')
          setViewerStatus(true)
          console.log(viewerStatus)
        }
      }
      // console.log(viewerStatus)
      // console.log(trainViewerStatus)
    }
  }

  const stopContainer = async (containerType: string) => {
    console.log('stopContainer')
    console.log(jobId)
    const url = '/api/stopcontainer'
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ job_id: jobId, job_type: containerType }),
    })
    // const data = await res.json()
    // console.log(data)
    console.log(res.status)
  }

  const getFileList = async () => {
    console.log('getFilelist')
    const url = `/api/getfiles?job_id=${jobId}`
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    console.log(data)
    setFiles(data)
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

  useEffect(() => {
    getFileList()
    getContainers()
  }, [])

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
      <div className='relative z-0 max-w-2xl m-auto w-full'>
        <div
          className={
            `w-full border border-gray-700 flex items-center px-8 justify-center relative ` +
            (statusOpen1
              ? 'h-20 bg-blue-400 rounded-3xl'
              : 'h-10 rounded-full') +
            (Number(status) > 2 ? ' bg-blue-400' : '')
          }
        >
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
          <div>
            {status == '2' && (
              <div className='my-5 w-full m-auto rounded-3xl bg-gray-900 p-5'>
                <div className='flex items-center justify-center text-gray-300 mt-2 px-4 py-2 h-[150px] rounded-xl bg-gray-700'>
                  動画ファイルを分割中...
                </div>
              </div>
            )}
            {status != '2' && (
              <div className='my-5 w-full m-auto rounded-3xl bg-gray-900 p-5'>
                {/* <div className='mb-2'>動画ファイル数 1/4</div> */}
                {files.length == 0 && (
                  <div className='flex items-center justify-center text-gray-400 bg-gray-800 rounded-xl p-5 shadow-2xl my-5'>
                    No files. Please upload video file.
                  </div>
                )}
                {files.length != 0 && (
                  <div className='flex flex-wrap gap-x-4 gap-y-2 bg-gray-800 rounded-xl p-5 shadow-2xl my-5'>
                    {files.map((file: any) => {
                      const thumbnail = file.file.replace(/\.[^/.]+$/, '.jpg')
                      const thumbnailUrl = `http://localhost:8000/${thumbnail.replace(
                        '/mnt',
                        'media'
                      )}`
                      return (
                        <div className='flex flex-col items-center gap-y-2'>
                          <div className='w-[150px] h-[150px]'>
                            <img
                              src={thumbnailUrl}
                              alt=''
                              className='w-full h-full object-contain'
                            />
                          </div>
                          <div>{file.title}</div>
                        </div>
                      )
                    })}
                  </div>
                )}
                <div>
                  <button
                    className='w-full h-[100px] text-gray-300 text-xl rounded-xl p-5 bg-gray-600 shadow-2xl'
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {fileName ? (
                      fileName
                    ) : (
                      <div>
                        <AddPhotoAlternateIcon className='mr-2' /> Select video
                      </div>
                    )}
                  </button>
                  <input
                    type='file'
                    ref={fileInputRef}
                    onChange={handleUpload}
                    className='hidden'
                  />
                  <button
                    className='flex items-center gap-x-2 mt-2 px-4 py-2 rounded-full bg-gray-700 ml-auto'
                    onClick={postFile}
                  >
                    <DriveFolderUploadIcon /> 動画ファイルを登録
                  </button>
                </div>
                <div className='flex justify-center'>
                  <ArrowDropDownIcon className='text-white text-8xl' />
                </div>
                <div className='flex justify-center'>
                  <button
                    className='w-[300px] h-[70px] mt-5 px-4 py-2 rounded-full bg-blue-400'
                    onClick={runFfmpeg}
                  >
                    動画ファイルを分割
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        <div
          className={
            `w-full border border-gray-700 flex items-center px-8 mt-5 justify-center relative ` +
            (statusOpen2
              ? 'h-20 bg-blue-500 rounded-3xl'
              : 'h-10 rounded-full') +
            (Number(status) > 4 ? ' bg-blue-500' : '')
          }
        >
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
              <div className='my-5 w-full m-auto rounded-3xl bg-gray-900 p-5'>
                <div className='flex justify-center'>
                  <ArrowDropDownIcon className='text-white text-8xl' />
                </div>
                <div className='flex justify-center'>
                  <button
                    className='w-[300px] h-[70px] mt-5 px-4 py-2 rounded-full bg-blue-500'
                    onClick={runColmap}
                  >
                    カメラパラメータ推定
                  </button>
                </div>
              </div>
            )}
            {status == '4' && (
              <div className='my-5 w-full m-auto rounded-3xl bg-gray-900 p-5'>
                <div className='flex items-center justify-center text-gray-300 mt-2 px-4 py-2 h-[150px] rounded-xl bg-gray-700'>
                  カメラパラメータ推定中... <br />
                  この処理には30分 ~ 1時間程度かかります。
                </div>
              </div>
            )}
          </div>
        )}
        <div
          className={
            `w-full border border-gray-700 flex items-center px-8 mt-5 justify-center relative ` +
            (statusOpen3
              ? 'h-20 bg-blue-700 rounded-3xl'
              : 'h-10 rounded-full') +
            (Number(status) > 6 ? ' bg-blue-700' : '')
          }
        >
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
              <div className='my-5 w-full m-auto rounded-3xl bg-gray-900 p-5'>
                <div className='flex justify-center'>
                  <ArrowDropDownIcon className='text-white text-8xl' />
                </div>
                <div className='flex justify-center'>
                  <button
                    className='w-[300px] h-[70px] mt-5 px-4 py-2 rounded-full bg-blue-700'
                    onClick={runTrain}
                  >
                    NeRF学習を実行
                  </button>
                </div>
              </div>
            )}
            {status == '6' && (
              <div className='my-5 w-full m-auto rounded-3xl bg-gray-900 p-5'>
                <div className='flex flex-col items-center justify-center text-gray-300 mt-2 px-4 py-2 h-[150px] rounded-xl bg-gray-700'>
                  NeRF学習を実行中... <br />
                  この処理には30分 ~ 1時間程度かかります。
                  <br />
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
                {trainViewerStatus && (
                  <div className='flex justify-center'>
                    <button
                      className='w-[300px] h-[70px] mt-5 px-4 py-2 rounded-full bg-blue-700'
                      onClick={() => stopContainer('train')}
                    >
                      学習を終了
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        <div
          className={
            `w-full border border-gray-700 flex items-center px-8 mt-5 justify-center relative ` +
            (statusOpen4
              ? 'h-20 bg-blue-900 rounded-3xl'
              : 'h-10 rounded-full') +
            (Number(status) > 7 ? ' bg-blue-900' : '')
          }
        >
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
          <div className='my-5 w-full m-auto rounded-3xl bg-gray-900 p-5'>
            <div className='flex flex-col items-center justify-center text-gray-300 mt-2 px-4 py-2 rounded-xl bg-gray-700'>
              <div className='flex justify-center'>
                <button
                  className='w-[300px] h-[70px] mt-5 px-4 py-2 rounded-full bg-blue-900'
                  onClick={runViewer}
                >
                  Viewerを起動
                </button>
              </div>
              <div className='flex justify-center'>
                <ArrowDropDownIcon className='text-white text-8xl' />
              </div>
              <div>
                結果は
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
              {viewerStatus && (
                <div className='flex justify-center'>
                  <button
                    className='w-[300px] h-[70px] mt-5 px-4 py-2 rounded-full bg-blue-900'
                    onClick={() => stopContainer('viewer')}
                  >
                    Viewerを終了
                  </button>
                </div>
              )}
              <div className='flex justify-center'>
                <ArrowDropDownIcon className='text-white text-8xl' />
              </div>
              <DefaultFormInput
                placeholder='コマンド入力'
                type='text'
                value={renderCommand}
                onChange={(e) => {
                  setRenderCommand(e.target.value)
                }}
                startAdornment={<TitleIcon />}
              />
              <div className='flex justify-center'>
                <button
                  className='w-[300px] h-[70px] mt-5 px-4 py-2 rounded-full bg-blue-900'
                  onClick={runRender}
                >
                  レンダリング実行
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default JobStatus
