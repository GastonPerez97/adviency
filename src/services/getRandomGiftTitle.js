const randomGiftTitles = [
	"Taza de cafe personalizada", "Medias", "Zapatillas",
	"Mochila", "Perfume", "Smart Watch", "Campera", "Termo para mate",
	"Jeans", "Guantes termicos", "Jersey de lana", "Plancha de pelo",
	"Auriculares inalambricos", "Estuche de maquillaje", "Juego de mesa",
	"Vino", "Billetera", "Funda de celular personalizada", "Tostadora electrica",
	"Freidora de aire", "Kit de golosinas", "Kit de degustacion de cervezas",
	"Calendario", "Cargador inalambrico", "Altavoz inteligente"
];

const getRandomGiftTitle = () => {
	return randomGiftTitles[Math.floor(Math.random() * randomGiftTitles.length)];
}

export default getRandomGiftTitle;
