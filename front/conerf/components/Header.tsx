"use client";

const Header = () => {
  const PostJob = async () => {
    const form = {
        title: 'Sample',
        description: 'Sample',
        status: '1',
        movies_url:'aaaaaaaaaaaa'
      }
    const res = await fetch('/api/postjobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    console.log(data)
  }

  return (
    <header className='h-36 fixed w-full '>
      <div className='h-full w-4/5 m-auto flex items-center justify-between'>
        <div className='text-4xl'>CoNeRF Job List</div>
        <div>
          <button className='bg-gray-700 px-3 py-1 rounded-full' onClick={PostJob}>Create</button>
        </div>
      </div>
    </header>
  )
}

export default Header
