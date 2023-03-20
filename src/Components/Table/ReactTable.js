import React, { useState, useEffect, useMemo } from 'react';
import fetchData from '../../Helper/fetch';
import { refactorData } from '../../Helper/DataTransfer';
import { Styles } from './ReactTableStyle';
import TableElement from './TableElement';

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
				Header: 'Image',
				accessor: 'image',
			},
			{
				Header: 'Name',
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

	const updateMyData = (rowIndex, columnId, value, depth, rowId) => {
		const [firstIndex, secondIndex, thirdIndex] = rowId.split('.').map(Number);
		const newData = data.map((row, index) => {
			if (index === firstIndex) {
				if (depth === 0) {
					return {
						...row,
						[columnId]: value,
					};
				} else if (depth === 1) {
					const newSubRows = row.subRows.map((subRow, subIndex) => {
						if (subIndex === secondIndex) {
							return {
								...subRow,
								[columnId]: value,
							};
						}
						return subRow;
					});

					return {
						...row,
						subRows: newSubRows,
					};
				} else if (depth === 2) {
					const newSubRows = row.subRows.map((subRow, subIndex) => {
						if (subIndex === secondIndex) {
							const newSubSubRows = subRow.subRows.map(
								(subSubRow, subSubIndex) => {
									if (subSubIndex === thirdIndex) {
										return {
											...subSubRow,
											[columnId]: value,
										};
									}
									return subSubRow;
								}
							);

							return {
								...subRow,
								subRows: newSubSubRows,
							};
						}
						return subRow;
					});

					return {
						...row,
						subRows: newSubRows,
					};
				}
			}

			return row;
		});

		setData(newData);

		localStorage.setItem('InventoryData', JSON.stringify(newData));
	};

	return (
		<Styles>
			<TableElement columns={columns} data={data} updateMyData={updateMyData} />
		</Styles>
	);
}

export default ReactTable;
