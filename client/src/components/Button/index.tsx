import React, { ReactNode } from 'react'
import { StyledButton } from './StyledButton'

interface ButtonProps {
	onClick?: () => void
	height?: string
	width?: string
	uppercase?: boolean
	gradientColors?: string
	children: ReactNode
}
const Button: React.FC<ButtonProps> = ({
	onClick,
	children,
	height,
	width,
	uppercase,
	gradientColors,
}) => {
	return (
		<StyledButton
			onClick={onClick}
			$height={height}
			$width={width}
			$uppercase={uppercase}
			$gradientColors={gradientColors}
		>
			{children}
		</StyledButton>
	)
}

export default Button
