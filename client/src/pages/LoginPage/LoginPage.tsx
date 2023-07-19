import { useContext, useState } from 'react'
import { styled } from 'styled-components'
import TextField from '../../components/TextField'
import Button from '../../components/Button'
import { Context } from '../../main'
import { Title } from '../../components/Title'

const LoginPageStyled = styled.div`
	display: flex;
	flex-direction: column;
	gap: 25px;
	max-width: 800px;
	background-color: #fff;
	width: 800px;
	padding: 25px 40px;
	box-shadow: 4px 10px 10px rgba(0, 0, 0, 0.4);
`

const LoginPage = () => {
	const { store } = useContext(Context)

	const [login, setLogin] = useState('')
	const [loginError, setLoginError] = useState<boolean>(false)

	const [password, setPassword] = useState('')
	const [passwordError, setPasswordError] = useState<boolean>(false)

	const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLogin(e.target.value)
		setLoginError(false)
	}

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
		setPasswordError(false)
	}

	const handleSubmit = async () => {
		const loginIsEmpty = login.trim() === ''
		setLoginError(loginIsEmpty)

		const passIsEmpty = password.trim() === ''
		setPasswordError(passIsEmpty)

		if (!loginIsEmpty && !passIsEmpty) await store.login(login, password)
	}

	return (
		<LoginPageStyled>
			<Title>Вход в систему</Title>
			<TextField
				type='text'
				value={login}
				onChange={handleLoginChange}
				isError={loginError}
			>
				Логин
			</TextField>
			<TextField
				type='password'
				value={password}
				onChange={handlePasswordChange}
				isError={passwordError}
			>
				Пароль
			</TextField>
			<Button onClick={handleSubmit} uppercase={true}>
				Войти
			</Button>
		</LoginPageStyled>
	)
}

export default LoginPage
