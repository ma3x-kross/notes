import { useContext, useEffect } from 'react'
import { Context } from './main'
import LoginPage from './pages/LoginPage'
import { observer } from 'mobx-react-lite'
import { ScaleLoader } from 'react-spinners'
import { styled } from 'styled-components'
import NotesPage from './pages/NotesPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import NotesInfoPage from './pages/NotesInfoPage'
import Header from './components/Header'
import CreateNotePage from './pages/CreateNotePage'

const Container = styled.div`
	max-width: 1300px;
	min-height: 100vh;
	/* background-color: #fff; */
	width: 1100px;
	padding: 25px 40px 10px 40px;
	/* box-shadow: 4px 10px 10px rgba(0, 0, 0, 0.4); */
`

const App = () => {
	const { store } = useContext(Context)

	useEffect(() => {
		if (localStorage.getItem('token')) {
			store.checkAuth()
		}
	}, [])

	if (store.loading) {
		return (
			<Container
				style={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<ScaleLoader height={40} width={20} color='#fff' />
			</Container>
		)
	}
	if (!store.isAuth) {
		return <LoginPage />
	}

	return (
		<Container>
			<Header login={store.user} />
			<Routes>
				<Route index element={<Navigate to='notes' />} />
				<Route path='/notes' element={<NotesPage />} />
				<Route path='/notes/create' element={<CreateNotePage />} />
				<Route path='/notes/:id' element={<NotesInfoPage />} />
			</Routes>
		</Container>
	)
}

export default observer(App)
