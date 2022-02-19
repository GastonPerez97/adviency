import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import GiftForm, { GIFT_FORM_ACTIONS } from "../../components/GiftForm/GiftForm";
import Gift from "../../components/Gift/Gift";
import Preview from "../Preview/Preview";

import christmasSong from "../../assets/sound/christmas-song.mp3";

import getGifts from "../../services/getGifts";
import formatPrice from "../../services/formatPrice";

import { GoMute, GoUnmute } from "react-icons/go";

import "./Gifts.css";

const Gifts = props => {
	const [gifts, setGifts] = useState([]);
	const [loadingScreen, setLoadingScreen] = useState(true);
	const [selectedGiftData, setSelectedGiftData] = useState(null);
	const [showGiftForm, setShowGiftForm] = useState(false);
	const [giftFormAction, setGiftFormAction] = useState("");
	const [showPreview, setShowPreview] = useState(false);
	const [audio, setAudio] = useState({
		song: new Audio(christmasSong),
		isPlaying: false
	});

	useEffect(() => {
		getGifts().then(gifts => {
			setGifts(gifts);
			setLoadingScreen(false);		
		});
	}, []);

	useEffect(() => {
		localStorage.setItem("gifts", JSON.stringify(gifts));
	}, [gifts]);

	// const song = new Audio(christmasSong);
	// song.volume = 0.5;

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

	const handleEditGift = giftId => {
		setShowGiftForm(true);
		setGiftFormAction(GIFT_FORM_ACTIONS.EDIT);
		setSelectedGiftData(getGift(giftId));
	}

	const editGift = gift => {
		setGifts(prevGifts => {
			return prevGifts.map(prevGift => {
				return prevGift.id === gift.id ? gift : prevGift;
			});
		});

		closeGiftForm();
	}

	const handleDuplicateGift = giftId => {
		const gift = getGift(giftId);
		const duplicatedGift = { ...gift, id: nanoid() }

		setShowGiftForm(true);
		setGiftFormAction(GIFT_FORM_ACTIONS.DUPLICATE);
		setSelectedGiftData(duplicatedGift);
	}

	const getTotalPrice = () => {
		let total = 0;

		gifts.forEach(gift => {
			total += (gift.unitPrice * gift.qty);
		});

		return formatPrice(total);
	}

	const handlePreview = () => setShowPreview(prevState => !prevState);

	const handleAudio = () => {
		audio.isPlaying ? audio.song.pause() : audio.song.play();
		
		setAudio(prevAudio => ({...prevAudio, isPlaying: !prevAudio.isPlaying }));
	}

	const giftElements = gifts.map(gift => {
		return (
			<Gift
				key={ gift.id }
				gift={ gift }
				handleDuplicateGift={ handleDuplicateGift }
				handleEditGift={ handleEditGift }
				deleteGift={ deleteGift }
			/>
		);
	});

	return (
		<section className="list-container">
			{ loadingScreen && <LoadingScreen /> }
			{ showPreview &&
				<Preview gifts={ gifts } handlePreview={ handlePreview } /> }

			<div className="title-container">
				<h1>Regalos:</h1>
				{ audio.isPlaying
					? <GoUnmute className="song-icon" onClick={ handleAudio } />
					: <GoMute className="song-icon" onClick={ handleAudio } /> }
			</div>

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

			{ gifts.length > 0 &&
				<button className="btn-red btn-delete-all" onClick={ handlePreview }>Previsualizar</button>
			}
			<button className="btn-red btn-delete-all" onClick={ deleteAllGifts }>Borrar todo</button>
		</section>
	);
}

export default Gifts;
