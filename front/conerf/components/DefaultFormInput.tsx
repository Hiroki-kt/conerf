import { forwardRef } from 'react'
import {
  FormControl,
  FormLabel,
  OutlinedInput,
  FormHelperText,
} from '@mui/material'
import { styled } from '@mui/material/styles'

type Props = {
  title?: string
  placeholder?: string
  type?: string
  value?: string | number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: boolean
  helperText?: string
  startAdornment?: JSX.Element | JSX.Element[]
  endAdornment?: JSX.Element | JSX.Element[]
  formInputProps?: any
  formInputStyle?: any
}

const FormInput = styled(OutlinedInput)`
  input {
    padding: 0 0 0 18px;
    font-size: 14px;
    line-height: 20px;
  }

  .MuiSvgIcon-root {
    color: #504c74;
  }

  padding: 20px 24px;
  border-color: ${({ error }) =>
    error ? 'error.main' : 'rgba(80, 76, 116, 0.49)'};
  border-radius: 10px;
`

const TitleLabel = styled(FormLabel)`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: #504c74;
`

const DefaultFormInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    title,
    placeholder,
    type,
    value,
    onChange,
    helperText,
    error,
    startAdornment,
    endAdornment,
    formInputProps,
    formInputStyle,
  } = props
  return (
    <FormControl sx={{ width: '100%', ...formInputStyle }}>
      {title && <TitleLabel sx={{}}>{title}</TitleLabel>}
      <FormInput
        placeholder={placeholder}
        startAdornment={startAdornment}
        endAdornment={endAdornment}
        type={type}
        onChange={onChange}
        value={value}
        error={error}
        ref={ref}
        inputProps={formInputProps}
      />
      <FormHelperText error={error} sx={{ height: '20px' }}>
        {helperText}
      </FormHelperText>
    </FormControl>
  )
})

DefaultFormInput.displayName = 'DefaultFormInput'

export default DefaultFormInput
