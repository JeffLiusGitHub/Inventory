import { renderTableCell } from './TableCell';
import { useTable, useExpanded } from 'react-table';
import EditableCell from './EditableCell';
function TableElement({ columns: userColumns, updateMyData, data }) {
	const defaultColumn = {
		Cell: EditableCell,
	};
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable(
			{
				columns: userColumns,
				data,
				defaultColumn,
				updateMyData,
			},
			useExpanded
		);

	return (
		<>
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps()}>{column.render('Header')}</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row, i) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td
											{...cell.getCellProps()}
											style={{
												paddingLeft: `${
													cell.column.id === 'name' ? row.depth * 4 : 0
												}rem`,
											}}
										>
											{renderTableCell(cell)}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}

export default TableElement;
