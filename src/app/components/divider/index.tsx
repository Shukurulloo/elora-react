import React from 'react';
import styled from 'styled-components';

export interface IDividerProps {
	width?: string;
	height?: string;
	bg?: string;
	mg?: string
}

const DividerComponent = styled.span<IDividerProps>`
	display: flex;
	min-width: ${({ width }) => `${width}px`};
	min-height: ${({ height }) => `${height}px`};
	background: ${({ bg }) => `${bg}`};
	margin: ${({mg}) => `${mg}`}
`;

function Divider(props: IDividerProps) {
	return <DividerComponent {...props} />;
}

export default Divider;
