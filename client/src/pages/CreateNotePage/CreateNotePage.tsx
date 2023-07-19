import React, { useContext, useState } from 'react'
import { styled } from 'styled-components'
import TextField from '../../components/TextField'
import { Title } from '../../components/Title'
import Button from '../../components/Button'
import { Context } from '../../main'
import { Link, useNavigate } from 'react-router-dom'
import { StyledContainer } from '../../components/Container/StyledContainer'

const CreateNotePage = () => {
	const { store } = useContext(Context)

	const [title, setTitle] = useState('')
	const [titleError, setTitleError] = useState(false)

	const [description, setDescription] = useState('')
	const [descriptionError, setDescriptionError] = useState(false)

	const navigate = useNavigate()

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value)
		setTitleError(false)
	}

	const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDescription(e.target.value)
		setDescriptionError(false)
	}

	const handleSubmit = async () => {
		const titleIsEmpty = title.trim() === ''
		setTitleError(titleIsEmpty)

		const descriptionIsEmpty = description.trim() === ''
		setDescriptionError(descriptionIsEmpty)

		if (!titleIsEmpty && !descriptionIsEmpty) {
			const result = await store.createNotes(title, description)
			if (result) {
				navigate('/notes')
			}
		}
	}

	return (
		<div style={{ marginTop: '20px' }}>
			<Link to='/'>
				<Button
					uppercase={true}
					gradientColors='#36304a, #684b96,#36304a, #684b96'
				>
					Назад
				</Button>
			</Link>

			<StyledContainer>
				<Title>Создание заметки</Title>
				<TextField
					type='text'
					value={title}
					onChange={handleTitleChange}
					isError={titleError}
				>
					Название заметки
				</TextField>

				<TextField
					type='text'
					value={description}
					onChange={handleDescriptionChange}
					isError={descriptionError}
				>
					Описание заметки
				</TextField>
				<Button uppercase={true} onClick={() => handleSubmit()}>
					Создать
				</Button>
			</StyledContainer>
		</div>
	)
}

export default CreateNotePage
