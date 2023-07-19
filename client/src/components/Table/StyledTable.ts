import { styled } from 'styled-components'

export const StyledTable = styled.table`
	border-collapse: collapse;
	width: 100%;
	margin: 20px 0;
	box-shadow: 4px 9px 20px rgba(0, 0, 0, 0.3);

	border-radius: 10px;
	overflow: hidden;

	thead {
		background-color: #36304a;
		color: #fff;
		th {
			height: 55px;
			text-align: left;
			font-weight: 500;
			font-size: 20px;
			padding-left: 45px;
		}
		th:not(:last-child) {
			span {
				cursor: pointer;
				transition: all 0.3s;
				&:hover {
					background: -webkit-linear-gradient(
						right,
						#56d8e4,
						#9f01ea,
						#56d8e4,
						#9f01ea
					);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}
			}
		}
	}

	tbody {
		background-color: #f5f5f5;
		tr {
			height: 55px;
			&:not(:last-child) {
				border-bottom: transparent 5px solid;
				td {
					&:nth-last-child(1):not(:empty) {
						cursor: pointer;
						&:hover {
							background: -webkit-linear-gradient(
								right,
								#56d8e4,
								#9f01ea,
								#56d8e4,
								#9f01ea
							);
							-webkit-background-clip: text;
							-webkit-text-fill-color: transparent;
						}
					}
				}
			}

			td {
				text-align: left;
				font-size: 20px;

				padding-left: 45px;
				max-width: 250px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				transition: ease-in-out 0.03s;
			}
			&:nth-last-child(1) {
				background-color: #36304a;
				color: #fff;
			}
		}

		.table-footer {
			td {
				text-align: right;
				span {
					margin-left: 10px;
				}
				button {
					margin: 0 8px;
					height: 28px;
					width: 28px;
					border: none;
					color: #fff;
					background: linear-gradient(115deg, #36304a, 75%, #684b96);
					box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
					transition: ease-in-out 0.03s;
					&:hover {
						transform: scale(1.07);
					}
					&:active {
						transform: scale(1);
					}
					&:disabled {
						cursor: not-allowed;
						pointer-events: none;
						opacity: 0.3;
					}
				}
			}
		}
	}
`
