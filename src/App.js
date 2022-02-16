import { useEffect, useState } from "react";

import defaultGiftImg from "./assets/img/gift-default.png";
import GiftForm, { GIFT_FORM_ACTIONS } from "./components/GiftForm/GiftForm";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

import getGifts from "./services/getGifts";

import { IoIosTrash } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { BiDuplicate } from "react-icons/bi";

import './App.css';

const App = () => {
	const [gifts, setGifts] = useState([]);
	const [loadingScreen, setLoadingScreen] = useState(true);
	const [selectedGiftData, setSelectedGiftData] = useState(null);
	const [showGiftForm, setShowGiftForm] = useState(false);
	const [giftFormAction, setGiftFormAction] = useState("");

	useEffect(() => {
		getGifts().then(gifts => {
			setGifts(gifts);
			setLoadingScreen(false);		
		});
	}, []);

	useEffect(() => {
		localStorage.setItem("gifts", JSON.stringify(gifts));
	}, [gifts]);

	const getGift = giftId => gifts.find(gift => gift.id === giftId);

	const closeGiftForm = () => {
		setShowGiftForm(false);
		setSelectedGiftData(null);
	}

	const addNewGift = () => {
		setShowGiftForm(true);
		setGiftFormAction(GIFT_FORM_ACTIONS.ADD);
	}

	const addGift = gift => {
		setGifts(prevGifts => [...prevGifts, gift]);
		closeGiftForm();
	}

	const deleteGift = giftId => setGifts(prevGifts => prevGifts.filter(gift => gift.id !== giftId));

	const deleteAllGifts = () => setGifts([]);

	const editGift = gift => {
		setGifts(prevGifts => {
			return prevGifts.map(prevGift => {
				return prevGift.id === gift.id ? gift : prevGift;
			});
		});

		closeGiftForm();
	}

	const handleEditGift = giftId => {
		setShowGiftForm(true);
		setGiftFormAction(GIFT_FORM_ACTIONS.EDIT);
		setSelectedGiftData(getGift(giftId));
	}

	const formatPrice = price => {
		const options = { style: 'currency', currency: 'ARS' };
		return new Intl.NumberFormat('es-AR', options).format(price);
	}

	const getTotalPrice = () => {
		let total = 0;

		gifts.forEach(gift => {
			total += (gift.unitPrice * gift.qty);
		});

		return formatPrice(total);
	}

	const giftElements = gifts.map(gift => {
		return (
			<li key={ gift.id }>
				<div className="gift-info-container">
					<img
						src={ gift.imageUrl }
						alt="Imagen del regalo"
						onError={ event => {
							event.target.src = defaultGiftImg;
						}}
					/>
					
					<div className="gift-text">
						<p>{ gift.title } ({ gift.qty }) - { formatPrice(gift.unitPrice * gift.qty) }</p>
						<small>{ gift.receiver }</small>
					</div>
				</div>

				<div className="gift-btn-container">
					<button
						className="btn-red btn-gift"
						onClick={ () => handleEditGift(gift.id) }
					>
						<FiEdit />
					</button>

					<button
						className="btn-red btn-gift"
						onClick={ () => deleteGift(gift.id) }
					>
						<IoIosTrash />
					</button>
				</div>
			</li>
		);
	});

	return (
		<>
			<main>
				{ loadingScreen && <LoadingScreen /> }

				<section className="list-container">
					<h1>Regalos:</h1>

					<button
						className="btn-red btn-add-gift"
						onClick={ addNewGift }
					>Agregar regalo
					</button>

					{ showGiftForm &&
						<GiftForm
							giftFormAction={ giftFormAction }
							addGift={ addGift }
							editGift={ editGift }
							selectedGiftData={ selectedGiftData }
							closeGiftForm={ closeGiftForm }
						/>
					}

					<ul className="gift-list">
						{ gifts.length === 0 &&
							<p className="no-gifts-text">&iexcl;No hay regalos Grinch, agrega algo!</p> }

						{ giftElements }
					</ul>

					<b className="total-price">Total: { getTotalPrice() }</b>

					<button className="btn-red btn-delete-all" onClick={ deleteAllGifts }>Borrar todo</button>
				</section>
			</main>

			<footer>
				Desarrollado por&nbsp;
				<a href="https://gastonperez.ar/" target="_blank" rel="noreferrer">
					Gast&oacute;n P&eacute;rez
				</a>
			</footer>
		</>
	);
}

export default App;
