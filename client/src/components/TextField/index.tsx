import React, { ReactNode } from 'react'
import { StyledTextField } from './StyledTextField'

interface TextFieldProps {
	type: string
	value: string
	isError?: boolean
	children: ReactNode
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TextField: React.FC<TextFieldProps> = ({
	type,
	value,
	isError,
	onChange,
	children,
}) => {
	return (
		<StyledTextField $isError={isError}>
			<input type={type} value={value} required onChange={onChange}></input>
			<div></div>
			<label>{isError ? 'Обязательно к заполнению' : children}</label>
		</StyledTextField>
	)
}

export default TextField
