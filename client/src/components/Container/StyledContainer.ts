import { styled } from 'styled-components'

interface StyledContainerProps {
	$minHeight?: string
	$gap?: string
}

export const StyledContainer = styled.div<StyledContainerProps>`
	margin-top: 20px;
	display: flex;
	flex-direction: column;
	gap: ${(props) => props.$gap || '25px'};
	min-height: ${(props) => props.$minHeight || '300px'};
	background-color: #fff;
	padding: 25px 40px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
	position: relative;
`
