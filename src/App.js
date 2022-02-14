import { useEffect, useState } from "react";

import GiftForm from "./components/GiftForm/GiftForm";

import './App.css';

const App = () => {
	const [gifts, setGifts] = useState(JSON.parse(localStorage.getItem("gifts")) || []);
	const [showGiftForm, setShowGiftForm] = useState(false);

	useEffect(() => {
		localStorage.setItem("gifts", JSON.stringify(gifts));
	}, [gifts]);

	const closeGiftForm = () => setShowGiftForm(false);

	const addGift = gift => {
		setGifts(prevGifts => [...prevGifts, gift]);
		closeGiftForm();
	}

	const deleteGift = giftId => setGifts(prevGifts => prevGifts.filter(gift => gift.id !== giftId));

	const deleteAllGifts = () => setGifts([]);

	const giftElements = gifts.map(gift => {
		return (
			<li key={ gift.id }>
				<div>
					<img src={ gift.imageUrl } alt="Imagen del regalo" />
					<p>{ gift.title } x{ gift.qty }</p>
				</div>
				
				<button
					className="btn-red btn-gift"
					onClick={ () => deleteGift(gift.id) }
				>X
				</button>
			</li>
		);
	});

	return (
		<>
			<main>
				<section className="list-container">
					<h1>Regalos:</h1>

					<button
						className="btn-red btn-add-gift"
						onClick={ () => setShowGiftForm(true) }
					>Agregar regalo
					</button>

					{ showGiftForm &&
						<GiftForm
							addGift={ addGift }
							closeGiftForm={ closeGiftForm }	
						/>
					}

					<ul className="gift-list">
						{ gifts.length === 0 &&
							<p className="no-gifts-text">&iexcl;No hay regalos Grinch, agrega algo!</p> }

						{ giftElements }
					</ul>

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
