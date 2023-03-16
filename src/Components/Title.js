import React from 'react';
import { FontContainer } from './TitleStyle';

const Title = ({ children, selected }) => {
	return <FontContainer selected={selected}>{children}</FontContainer>;
};

export default Title;
