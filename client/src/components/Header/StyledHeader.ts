import { styled } from 'styled-components'

export const StyledHeader = styled.header`
	width: 100%;
	height: 50px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: #fff;
	text-transform: uppercase;
	padding: 30px;
	box-shadow: 4px 9px 20px rgba(0, 0, 0, 0.3);
	border-radius: 10px;

	h1 {
		font-weight: 700;
		font-size: 30px;
	}
	.container {
		display: flex;
		align-items: center;
		gap: 10px;
		transition: ease 0.04s;

		span{
			font-size: 20px;
			font-weight: 700;
		}

		img {
			width: 20px;
			height: 20px;
		}
		&:hover {
			cursor: pointer;
			transform: scale(1.2);
		}
		&:active{
			transform: scale(1);
		}
	}
`
