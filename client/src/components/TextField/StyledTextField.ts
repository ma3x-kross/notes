import { styled } from 'styled-components'

export const StyledTextField = styled.div<{ $isError?: boolean }>`
	height: 40px;
	margin: 0 20px;
	position: relative;

	input {
		display: block;
		width: 100%;
		height: 100%;
		border: none;
		border-bottom: 2px solid
			${(props) => (props.$isError ? 'red' : 'rgba(0, 0, 0, 0.15)')};
	}
	label {
		pointer-events: none;
		position: absolute;
		bottom: 10px;
		transition: all 0.3s ease;
		color: ${(props) => (props.$isError ? 'red' : 'black')};
	}

	input:focus ~ label,
	input:valid ~ label {
		transform: translateY(-25px);
		color: #3498db;
	}

	div {
		position: absolute;
		width: 100%;
		height: 3px;
		bottom: 0;

		background-color: #3498db;
		transform: scale(0);
		transform-origin: center;
		transition: transform 0.3s ease;
	}

	input:focus ~ div,
	input:valid ~ div {
		transform: scale(1);
	}
`
