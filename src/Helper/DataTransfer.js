const sizeLabels = {
	Small: 'S',
	Medium: 'M',
	Large: 'L',
	'Extra Large': 'XL',
};

const calculateSizesAndColors = (primary_variants) => {
	const secondaryVariants = primary_variants
		.map(({ secondary_variants }) => secondary_variants)
		.flat();
	const colorVariants = primary_variants.map(({ name }) => name);
	const sizes = [
		...new Set(secondaryVariants.map(({ name }) => sizeLabels[name])),
	];
	const colors = [...new Set(colorVariants)];
	return { sizes, colors };
};

const calculateSubRows = (primary_variants, leadTime) => {
	return primary_variants.map(
		({ name, secondary_variants, ...variantRest }) => ({
			...variantRest,
			name,
			leadTime,
			subRows: secondary_variants.map((variant) => ({ ...variant, leadTime })),
		})
	);
};

export const refactorData = (data) => {
	return data.map(
		({
			title,
			primary_variants,
			leadTime,
			price,
			discountPercentage,
			...rest
		}) => {
			const { sizes, colors } = calculateSizesAndColors(primary_variants);
			const subRows = calculateSubRows(primary_variants, leadTime);
			return {
				...rest,
				name: title,
				colour: colors,
				sizes: sizes,
				leadTime,
				subRows,
				price: `$${price.toFixed(2)}`,
				discountPercentage: `${discountPercentage}%`,
			};
		}
	);
};
