import React, { useContext, useState } from 'react'
import TextField from '../TextField'
import Button from '../Button'
import { Context } from '../../main'
import { Title } from '../Title'

interface EditNoteProps {
	id: string
	handleClose: () => void
}

const EditNote: React.FC<EditNoteProps> = ({ id, handleClose }) => {
	const { store } = useContext(Context)

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value)
	}

	const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDescription(e.target.value)
	}

	const handleSubmit = async () => {
		await store.updateNote(id, title, description)
		handleClose()
	}

	return (
		<div
			style={{
				margin: '20px',
				width: '100%',
				display: 'flex',
				gap: '35px',
				flexDirection: 'column',
			}}
		>
			<Title>Редактирование</Title>
			<TextField type='text' value={title} onChange={handleTitleChange}>
				Название заметки
			</TextField>

			<TextField
				type='text'
				value={description}
				onChange={handleDescriptionChange}
			>
				Описание заметки
			</TextField>
			<Button uppercase={true} onClick={() => handleSubmit()}>
				Редактировать
			</Button>
		</div>
	)
}

export default EditNote
