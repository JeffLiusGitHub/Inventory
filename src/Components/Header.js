import React from 'react';
import Title from './Title';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ExtensionIcon from '@mui/icons-material/Extension';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {
	HeaderContainer,
	TitleContainer,
	FunctionContainer,
} from './HeaderStyle';
const Header = ({ currentStatus = 'Inventory' }) => {

	const contents = ['Inventory', 'Collections', 'Analytics'];

	return (
		<HeaderContainer>
			<TitleContainer>
				{contents.length > 0 &&
					contents.map((content) => (
						<Title
							key={content}
							selected={currentStatus === content}
							currentStatus
							setCurrentStatus
						>
							{content}
						</Title>
					))}
			</TitleContainer>
			<FunctionContainer>
				<Button
					sx={{
						borderRadius: '40px',
						backgroundColor: '#191DDD',
						textTransform: 'none',
					}}
					variant="contained"
					startIcon={<AddIcon />}
				>
					Add New Product
				</Button>
				<Button
					sx={{ borderRadius: '40px', color: 'black', textTransform: 'none' }}
					variant="text"
					startIcon={<ExtensionIcon />}
				>
					Import Data
				</Button>
				<Button
					sx={{ borderRadius: '40px', color: 'black', textTransform: 'none' }}
					variant="text"
					startIcon={<FileUploadIcon />}
				>
					Export CSV
				</Button>
			</FunctionContainer>
		</HeaderContainer>
	);
};

export default Header;
