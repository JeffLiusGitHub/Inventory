import { ColourContainer, ColourDot } from './ReactTableStyle';
export const renderTableCell = (cell) => {
	if (cell.column.id === 'image' && cell.value) {
		return (
			<img
				src={cell.value}
				alt={`${cell.row.cells[2].value} pic`}
				style={{
					height: '45px',
					width: '45px',
					objectFit: 'cover',
					borderRadius: '50%',
				}}
			/>
		);
	} else if (cell.column.id === 'colour' && cell.value) {
		if (cell?.value?.length <= 2) {
			return cell.value.map((c) => <ColourDot key={c} color={c} />);
		} else {
			const newColor = cell?.value?.slice(0, 2);
			const rest = cell?.value?.slice(2);
			return (
				<ColourContainer>
					{newColor?.map((c) => (
						<ColourDot key={c} color={c}></ColourDot>
					))}
					<span> +{rest?.length}</span>
				</ColourContainer>
			);
		}
	} else if (cell.column.id === 'sizes' && cell.value) {
		const newSize = cell?.value?.slice(0, 3);
		const rest = cell?.value?.slice(3);
		return <p>{`${newSize?.toString()} + ${rest?.length}`}</p>;
	} else {
		return cell.render('Cell');
	}
};
