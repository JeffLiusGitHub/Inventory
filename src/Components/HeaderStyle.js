import styled from 'styled-components';
import { tablet } from './responsive';
export const HeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 10px 0px;
	flex-wrap: wrap;
	${tablet({
		padding: '0px',
		flexDirection: 'column',
		justifyContent: 'center',
	})}
`;

export const TitleContainer = styled.ul`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 30px;
	${tablet({ width: '100vw' })}
`;

export const FunctionContainer = styled.div`
	display: flex;
	gap: 10px;
	font-size: 10px;
	justify-content: center;
	align-items: center;
	padding: 0 16px;
`;
