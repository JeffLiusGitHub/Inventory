import React, { useState, useEffect, useMemo } from 'react';
import fetchData from '../../Helper/fetch';
import { refactorData } from '../../Helper/DataTransfer';
import { Styles } from './ReactTableStyle';
import TableElement from './TableElement';

function ReactTable() {
	//get localstorage data
	const storedData = JSON.parse(localStorage.getItem('InventoryData'));
	//initialize data, if no storedData, add empty array
	const [data, setData] = useState(storedData || []);

	const transferData = (data) => {
		const newData = refactorData(data);
		setData(newData);
	};

	useEffect(() => {
		//if no storedData,fetch and set data
		if (!storedData) {
			fetchData(transferData);
		}
	}, [storedData]);
	//https://react-table-v7.tanstack.com/docs/quick-start#define-columns define column need to use useMemo, deduct render times, improve performance
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
		//1.2.3 split into 1 2 3 change to number and assign to first second third index
		const [firstIndex, secondIndex, thirdIndex] = rowId.split('.').map(Number);
		const newData = data.map((row, index) => {

			if (index === firstIndex) {
				if (depth === 0) {
					return {
						//copy row and update related columnId value
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
