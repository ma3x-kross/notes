import { styled } from 'styled-components'

interface StyledButtonProps {
	$gradientColors?: string
	$height?: string
	$width?: string
	$uppercase?: boolean
}

export const StyledButton = styled.button<StyledButtonProps>`
	position: relative;
	height: ${(props) => props.$height || '45px'};
	width: ${(props) => props.$width || '25%'};
	align-self: center;
	background-color: transparent;
	z-index: 1;
	overflow: hidden;
	border: none;
	color: #fff;
	text-transform: ${({ $uppercase }) => ($uppercase ? 'uppercase' : 'none')};

	transition: all 0.4s;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 300%;
		height: 100%;
		z-index: -1;
		background: linear-gradient(
			to right,
			${({ $gradientColors }) =>
				$gradientColors || '#56d8e4, #9f01ea, #56d8e4, #9f01ea'}
		);
		transition: left 0.3s;
	}

	&:hover {
		cursor: pointer;
		&::before {
			left: 0;
		}
	}

	&:active {
		transform: scale(1.1);
	}
`
