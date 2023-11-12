'use client'

import { useEffect, useState } from 'react'

type JobStatusProps = {
  status: string
}

const JobStatus = (props: JobStatusProps) => {
  const [status, setStatus] = useState(props.status)
  const [statusOpen1, setStatusOpen1] = useState(false)
  const [statusOpen2, setStatusOpen2] = useState(false)
  const [statusOpen3, setStatusOpen3] = useState(false)
  const [statusOpen4, setStatusOpen4] = useState(false)

  useEffect(() => {
    if (status == '1') {
      setStatusOpen1(true)
    }
    if (status == '2') {
      setStatusOpen2(true)
    }
    if (status == '3') {
      setStatusOpen3(true)
    }
    if (status == '4') {
      setStatusOpen4(true)
    }
  }, [status])

  return (
    <>
      <div className='w-full h-10 rounded-full border border-gray-700 flex items-center px-8 justify-center relative'>
        <button
          className='w-full h-full absolute'
          onClick={() => {
            setStatusOpen1(!statusOpen1)
          }}
        >
          Add Video
        </button>
      </div>
      {statusOpen1 && (
        <div className='flex flex-col items-start my-5'>
          <div className='mb-2'>動画ファイル数 1/4</div>
          <input type='file' />
          <button className='mt-2 px-4 py-2 rounded-full bg-gray-700'>
            動画ファイルを登録
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
          Running
        </button>
      </div>
      {statusOpen2 && <div>マップ作成中。。。少々お待ち下さい。</div>}
      <div className='w-full h-10 rounded-full border border-gray-700 flex items-center px-8 justify-center mt-5 relative'>
        <button
          className='w-full h-full absolute'
          onClick={() => {
            setStatusOpen3(!statusOpen3)
          }}
        >
          Train
        </button>
      </div>
      {statusOpen3 && (
        <div>
          <button>学習を開始</button>
          <div>途中経過は以下のURLから確認できます。</div>
          <a href=''>こちら</a>
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
          学習まで完了しました。 NeRFの結果は以下の結果から確認できます。
          <a href=''>こちら</a>
        </div>
      )}
    </>
  )
}

export default JobStatus
