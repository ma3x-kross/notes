import { MouseEventHandler, useContext, useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { Context } from '../../main'
import { observer } from 'mobx-react-lite'

import { StyledTable } from '../../components/Table/StyledTable'
import Button from '../../components/Button'
import { Link } from 'react-router-dom'
import { Notes } from '../../interfaces/NotesResponse'
import { formatDate } from '../../utils/helpers'

const Container = styled.div`
	margin-top: 20px;
`
export const titles = ['Заголовок', 'Описание', 'Дата создания', 'Действие']


const NotesPage = () => {
	const { store } = useContext(Context)

	const [notes, setNotes] = useState<Notes[]>([])

	const [page, setPage] = useState(1)
	const [countPage, setCountPage] = useState(0)

	useEffect(() => {
		const getNotes = async () => {
			await store.getAllNotes((page - 1) * 5)
			setNotes(store.notes)
			setCountPage(Math.ceil(store.totalItems / 5))
		}
		getNotes()
	}, [page])

	const onClickTitle: MouseEventHandler<HTMLSpanElement> = (e) => {
		const innerText = e.currentTarget.innerText
		store.sortNotes(innerText.slice(0, -2))
	}

	return (
		<Container>
			<Link
				to='create'
				style={{
					textDecoration: 'none',
				}}
			>
				<Button
					uppercase={true}
					gradientColors='#36304a, #684b96,#36304a, #684b96'
				>
					Создать новую заметку
				</Button>
			</Link>

			<StyledTable>
				<thead>
					<tr>
						{titles.map((el) => (
							<th key={el}>
								<span onClick={onClickTitle}>
									{el === 'Действие' ? el : `${el} ⮁`}
								</span>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{Array.from({ length: 5 }).map((_, index) => {
						const note = notes[index]
						return (
							<tr key={index}>
								<td>{note ? note.title : ''}</td>
								<td>{note ? note.description : ''}</td>
								<td>{note ? formatDate(note.timestamp) : ''}</td>
								<td>
									{note ? (
										<Link
											style={{
												textDecoration: 'none',
												fontSize: '20px',
												color: '#000',
											}}
											to={`${note._id}`}
										>
											Подробнее
										</Link>
									) : (
										''
									)}
								</td>
							</tr>
						)
					})}

					<tr className='table-footer'>
						<td colSpan={titles.length}>
							<span>
								Номер страницы: {page} из {countPage}
							</span>
							<span>
								<button
									disabled={page === 1 ? true : false}
									onClick={() => setPage((prev) => prev - 1)}
								>
									❮
								</button>
								<button
									disabled={page === countPage ? true : false}
									onClick={() => setPage((prev) => prev + 1)}
								>
									❯
								</button>
							</span>
						</td>
					</tr>
				</tbody>
			</StyledTable>
		</Container>
	)
}

export default observer(NotesPage)
