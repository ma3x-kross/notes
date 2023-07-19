import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../main'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ScaleLoader } from 'react-spinners'
import { StyledContainer } from '../../components/Container/StyledContainer'
import Button from '../../components/Button'
import { Title } from '../../components/Title'
import { styled } from 'styled-components'
import { formatDate } from '../../utils/helpers'
import Modal from '../../components/Modal'
import EditNote from '../../components/EditNote/EditNote'

const Paragraph = styled.p`
	font-size: 20px;
	margin-bottom: 50px;
`

const NotesInfoPage: React.FC = () => {
	const { store } = useContext(Context)

	const navigate = useNavigate()

	const [loading, setLoading] = useState(false)
	const [openEdit, setOpenEdit] = useState(false)
	const [openDelete, setOpenDelete] = useState(false)

	const { id } = useParams()

	useEffect(() => {
		const getInfo = async () => {
			if (id) {
				setLoading(() => true)
				await store.getNoteById(id)
			}
			setLoading(() => false)
		}
		getInfo()
	}, [])

	const handleDelete = async () => {
		if (id) {
			await store.deleteNote(id)
			navigate('/')
		}
	}

	if (loading)
		return (
			<div
				style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}
			>
				<ScaleLoader height={40} width={20} color='#fff' />
			</div>
		)

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
			{store.note._id && (
				<StyledContainer $minHeight='400px' $gap='10px'>
					<Title>
						{store.note.title} ({formatDate(store.note.timestamp)})
					</Title>
					<Paragraph>{store.note.description}</Paragraph>
					<div
						style={{
							position: 'absolute',
							bottom: '20px',
							display: 'flex',
							gap: '20px',
							alignSelf: 'center',
						}}
					>
						<Button
							height='45px'
							width='150px'
							gradientColors=' orange,#11bf3fc3, orange, #11bf3fc3 '
							onClick={() => setOpenEdit(true)}
						>
							Редактировать
						</Button>
						<Button
							height='45px'
							width='150px'
							gradientColors='orange, #df0f0fdf, orange, #df0f0fdf'
							onClick={() => setOpenDelete(true)}
						>
							Удалить
						</Button>
					</div>
				</StyledContainer>
			)}

			{id && (
				<Modal open={openEdit} setOpen={setOpenEdit}>
					<EditNote id={id} handleClose={()=>setOpenEdit(false)}/>
				</Modal>
			)}
			<Modal open={openDelete} setOpen={setOpenDelete}>
				<p>Вы действительно хотите удалить {store.note.title}</p>
				<div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
					<Button
						height='30px'
						width='80px'
						gradientColors='#36304a, #684b96,#36304a, #684b96'
						onClick={() => handleDelete()}
					>
						да
					</Button>
					<Button height='30px' width='80px' onClick={()=>setOpenDelete(false)}>
						нет
					</Button>
				</div>
			</Modal>
		</div>
	)
}

export default NotesInfoPage
