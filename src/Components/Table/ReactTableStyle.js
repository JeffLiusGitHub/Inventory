import styled from 'styled-components';
import { tablet } from '../../Components/responsive';
export const ColourContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 5px;
	${tablet({ flexDirection: 'column' })}
`;
export const ColourDot = styled.span`
	width: 15px;
	height: 15px;
	${tablet({ width: '10px', height: '10px', margin: '5px' })}
	border-radius: 50%;
	border: 1px dotted rgba(0, 0, 0, 0.2);
	background-color: ${(props) => props.color};
	display: inline-block;
	content: '';
	margin-right: 5px;
`;

export const Styles = styled.div`
	padding: 1rem;
	display: block;
	max-width: 100%;
	${tablet({ padding: 0 })}

	table {
		border-spacing: 0;
		text-align: center;
		font-family: 'Open Sans', sans-serif;

		tr {
			:last-child {
				td {
					border-bottom: 0;
				}
			}

			th {
				border-top: 1px solid #e9e9e9;
				border-bottom: 1px solid #e9e9e9;
			}

			td {
				margin: 0;
				padding: 0.5rem;
				width: calc(85vw / 8);
				white-space: auto;
				transition: background-color 0.3s ease;
				&:hover {
					background-color: #f1f0fe;
				}
				/* border-bottom: 0.1px solid #e9e9e9;
			border-right: 0.1px solid #e9e9e9; */

				input {
					white-space: nowrap;
					text-align: center;
					font-size: 1rem;
					${tablet({ fontSize: '0.7rem' })}
					width: 100%;
					padding: 0;
					margin: 0;
					border: 0;
					&:hover {
						background-color: #f1f0fe;
					}
				}
				:last-child {
					border-right: 0;
				}
			}
		}
	}
`;
