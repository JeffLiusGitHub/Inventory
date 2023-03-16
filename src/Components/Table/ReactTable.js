import React, { useState, useEffect, useMemo } from 'react';
import { useTable, useExpanded } from 'react-table';
import fetchData from '../../Helper/fetch';
import { refactorData } from '../../Helper/DataTransfer';
import { renderTableCell } from './TableCell';
import { Styles } from './ReactTableStyle';

const EditableCell = ({
	value: initialValue,
	row: { index },
	column: { id },
	updateMyData,
}) => {
	const [value, setValue] = useState(initialValue);

	const onChange = (e) => {
		setValue(e.target.value);
	};

	const onBlur = () => {
		updateMyData(index, id, value);
	};

	React.useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	return <input value={value} onChange={onChange} onBlur={onBlur} />;
};

const defaultColumn = {
	Cell: EditableCell,
};

function Table({ columns: userColumns, updateMyData, data }) {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		state: { expanded },
	} = useTable(
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

function ReactTable() {
	const storedData = localStorage.getItem('InventoryData');
	const [data, setData] = useState([]);

	const transferData = (data) => {
		const newData = refactorData(data);
		setData(newData);
	};
	useEffect(() => {
		if (storedData) {
			setData(JSON.parse(storedData));
		} else {
			fetchData(transferData);
		}
	}, [storedData]);
	const columns = useMemo(
		() => [
			{
				id: 'expander',
				Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
					<span {...getToggleAllRowsExpandedProps()}>
						{isAllRowsExpanded ? '▼' : '►'}
					</span>
				),
				Cell: ({ row }) =>
					row.canExpand ? (
						<span
							{...row.getToggleRowExpandedProps({
								style: {
									paddingLeft: `${row.depth * 2}rem`,
								},
							})}
						>
							{row.isExpanded ? '▼' : '►'}
						</span>
					) : null,
			},

			{
				Header: ' Image',
				accessor: 'image',
			},
			{
				Header: ' Name',
				accessor: 'name',
			},
			// {
			// 	Header: 'Stock',
			// 	accessor: 'stock',
			// },
			{
				Header: 'WHS',
				accessor: 'price',
			},
			{
				Header: 'Discount%',
				accessor: 'discountPercentage',
			},
			{
				Header: 'Colour',
				accessor: 'colour',
			},
			{
				Header: 'Sizes',
				accessor: 'sizes',
			},
			{
				Header: 'Inventory',
				accessor: 'inventory',
			},
			{
				Header: 'Lead Time',
				accessor: 'leadTime',
			},
		],
		[]
	);

	const updateMyData = (rowIndex, columnId, value) => {
		// console.log({ rowIndex, columnId, value });

		setData((old) =>
			old.map((row, index) => {
				console.log({ row, index });
				if (index === rowIndex) {
					return {
						...old[rowIndex],
						[columnId]: value,
					};
				}
				return row;
			})
		);
		localStorage.setItem(
			'InventoryData',
			JSON.stringify(
				data.map((row, index) => {
					if (index === rowIndex) {
						return {
							...data[rowIndex],
							[columnId]: value,
						};
					}
					return row;
				})
			)
		);
	};
	return (
		<Styles>
			<Table columns={columns} data={data} updateMyData={updateMyData} />
		</Styles>
	);
}

export default ReactTable;
