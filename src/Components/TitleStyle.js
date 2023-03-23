import styled from 'styled-components';
import { tablet, laptop } from './responsive';

//if select is true, display black else grey
export const FontContainer = styled.li`
	font-size: 40px;
	color: ${(props) => (props.selected ? '#323232' : '#D7D7D7')};
	list-style-type: none;
	cursor: pointer;
	${tablet({ fontSize: '15px' })}
	${laptop({ fontSize: '25px' })}
`;
