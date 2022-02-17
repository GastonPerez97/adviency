const formatPrice = price => {
	const options = { style: 'currency', currency: 'ARS' };
	return new Intl.NumberFormat('es-AR', options).format(price);
}

export default formatPrice;