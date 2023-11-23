'use client'

import * as React from 'react'
import { useForm, Controller } from 'react-hook-form'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'

import CloseIcon from '@mui/icons-material/Close'
import Diversity3Icon from '@mui/icons-material/Diversity3'
import SubtitlesIcon from '@mui/icons-material/Subtitles'
import TitleIcon from '@mui/icons-material/Title'

import DefaultFormInput from '@/components/DefaultFormInput'

type FormValues = {
  title: string
  description: string
  status: string
  participants: number
}

const CreateJobDialog = () => {
  const [open, setOpen] = React.useState(false)
  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: ' ',
      status: '1',
      participants: 0,
    },
  })

  const PostJob = async (form: FormValues) => {
    console.log(form)
    const url = '/api/postjobs'
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    console.log(data)
    setOpen(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <button
        className='bg-gray-700 px-3 py-1 rounded-full'
        onClick={handleClickOpen}
      >
        Create
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: '#2d3748',
            color: '#fff',
            borderRadius: '10px',
          },
        }}
        className='w-full'
      >
        <DialogTitle>
          <div className='flex justify-between'>
            <div className='text-2xl'>Create Job</div>
            <IconButton aria-label='close' onClick={handleClose}>
              <CloseIcon className='' />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent className='mt-5 bt-5 w-[500px]'>
          <Controller
            name='title'
            control={control}
            rules={{ required: 'Title Need' }}
            render={({ field }) => (
              <DefaultFormInput
                placeholder='Title'
                type='text'
                value={field.value}
                onChange={field.onChange}
                startAdornment={<TitleIcon />}
                error={!!errors.title}
                helperText={errors.title && errors.title.message}
              />
            )}
          />
          {/* <Controller
            name='description'
            control={control}
            render={({ field }) => (
              <DefaultFormInput
                placeholder='Description'
                type='text'
                value={field.value}
                onChange={field.onChange}
                startAdornment={<SubtitlesIcon />}
                error={!!errors.description}
                helperText={errors.description && errors.description.message}
              />
            )}
          />
          <Controller
            name='participants'
            control={control}
            rules={{ required: 'The number of paticipants' }}
            render={({ field }) => (
              <DefaultFormInput
                placeholder='1'
                type='number'
                value={field.value}
                onChange={field.onChange}
                startAdornment={<Diversity3Icon />}
                error={!!errors.description}
                helperText={errors.description && errors.description.message}
              />
            )}
          /> */}
        </DialogContent>
        <DialogActions className='px-5 mb-2 pt-0'>
          <button
            className='bg-blue-500 text-white rounded-full py-3 px-5'
            type='submit'
            onClick={handleSubmit(PostJob)}
          >
            Create
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CreateJobDialog
