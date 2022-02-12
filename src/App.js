import { useState } from "react";
import { nanoid } from "nanoid";

import './App.css';

const App = () => {
	const newGift = () => {
		return {
			id: nanoid(),
			title: ""
		}
	}

	const [gifts, setGifts] = useState([]);
	const [giftFormData, setGiftFormData] = useState(newGift());

	const handleFormChange = event => {
		const {name, value} = event.target;

		setGiftFormData(prevFormData => ({...prevFormData, [name]: value}));
	}

	const handleSubmit = () => {
		setGifts(prevGifts => [...prevGifts, giftFormData]);
		setGiftFormData(newGift());
	} 

	const deleteGift = giftId => {
		setGifts(prevGifts => prevGifts.filter(gift => gift.id !== giftId));
	}

	const giftElements = gifts.map(gift => {
		return (
			<li key={ gift.id }>
				{ gift.title }
				<button
					className="btn-red btn-gift"
					onClick={() => deleteGift(gift.id) }
				>
					X
				</button>
			</li>
		);
	});

	return (
		<>
			<main>
				<section className="list-container">
					<h1>Regalos</h1>

					<div className="form-container">
						<input
							type="text"
							name="title"
							placeholder="&iquest;Qu&eacute; vas a regalar?"
							value={ giftFormData.title }
							onChange={ handleFormChange }
						/>
						<button
							onClick={ handleSubmit }
							className="btn-red"
						>
							Agregar
						</button>
					</div>

					<ul className="gift-list">
						{ giftElements }
					</ul>
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
