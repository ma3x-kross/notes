import React from 'react'
import { styled } from 'styled-components'

const StyledModal = styled.div<{ $open: boolean }>`
	position: fixed;
	z-index: 2;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	pointer-events: ${(props) => (props.$open ? 'all' : 'none')};
	opacity: ${(props) => (props.$open ? '1' : '0')};
	transition: 0.5s;

	.content {
		background-color: #fff;
		color: #000;
		padding: 20px;
		width: 50%;
		transform: ${(props) => (props.$open ? 'scale(1)' : 'scale(0)')};
		transition: 0.5s all;
		display: flex;
		flex-direction: column;
		gap: 10px;
		justify-content: center;
		align-items: center;
	}
`

interface ModalProps {
	open: boolean
	setOpen: (bool: boolean) => void
	children: React.ReactNode
}
const handleContentClick = (
	e: React.MouseEvent<HTMLDivElement, MouseEvent>,
) => {
	e.stopPropagation()
}
const Modal: React.FC<ModalProps> = ({ open, setOpen, children }) => {
	return (
		<StyledModal $open={open} onClick={() => setOpen(false)}>
			<div className='content' onClick={handleContentClick}>
				{children}
			</div>
		</StyledModal>
	)
}

export default Modal
