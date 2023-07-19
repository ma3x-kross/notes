import React, { useContext, useState } from 'react'
import { StyledHeader } from './StyledHeader'
import logout from '../../assets/logout.svg'
import { Context } from '../../main'
import Modal from '../Modal'
import Button from '../Button'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo.svg'
interface HeaderProps {
	login: string
}

const Header: React.FC<HeaderProps> = ({ login }) => {
	const { store } = useContext(Context)

	const [open, setOpen] = useState(false)

	const handleLogout = async () => {
		await store.logout()
	}
	return (
		<StyledHeader>
			<NavLink
				to='/'
				style={{
					textDecoration: 'none',
					color: '#fff',
					display: 'flex',
					gap: '5px',
					alignItems: 'center',
				}}
			>
				<img style={{ width: '35px' }} src={logo} alt='logo' />
				<h1>Заметки</h1>
			</NavLink>
			<div className='container' onClick={() => setOpen(true)}>
				<span>{login}</span>
				<img alt='logout' src={logout} />
			</div>

			<Modal open={open} setOpen={setOpen}>
				<p>Выйти из системы?</p>
				<div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
					<Button
						height='30px'
						width='80px'
						gradientColors='#36304a, #684b96,#36304a, #684b96'
						onClick={() => handleLogout()}
					>
						да
					</Button>
					<Button height='30px' width='80px' onClick={() => setOpen(false)}>
						нет
					</Button>
				</div>
			</Modal>
		</StyledHeader>
	)
}

export default Header
