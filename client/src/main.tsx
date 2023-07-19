import { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Store from './store/store.ts'
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'

interface State {
	store: Store
}

const GlobalStyle = createGlobalStyle`
	*{
		@import url('https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700&display=swap');

		margin: 0;
		padding: 0;
		outline: none;
		box-sizing: border-box;
		font-family: 'Poppins', sans-serif;
		font-size: 16px;
	}

	body{
		display: flex;
		min-height: 100vh;
		align-items: center;
		justify-content: center;
		padding: 10px;
		background: linear-gradient(115deg, #56d8e4, 10%, #9f01ea);
	}
`

const store = new Store()

export const Context = createContext<State>({ store })

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Context.Provider value={{ store }}>
		<BrowserRouter>
			<GlobalStyle />
			<App />
		</BrowserRouter>
	</Context.Provider>,
)
