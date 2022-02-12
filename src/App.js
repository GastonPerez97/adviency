import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import './App.css';

import { BiErrorCircle } from "react-icons/bi";

const App = () => {
	const newGift = () => {
		return {
			id: nanoid(),
			title: "",
			qty: ""
		}
	}

	const [gifts, setGifts] = useState(JSON.parse(localStorage.getItem("gifts")) || []);
	const [giftFormData, setGiftFormData] = useState(newGift());
	const [giftFormError, setGiftFormError] = useState("");

	useEffect(() => {
		localStorage.setItem("gifts", JSON.stringify(gifts));
	}, [gifts]);

	const handleFormChange = event => {
		const {name, value} = event.target;

		setGiftFormData(prevFormData => ({...prevFormData, [name]: value}));
	}

	const handleSubmit = () => {
		if (!giftFormData.title || giftFormData.qty <= 0) {
			setGiftFormError("Completa los campos para agregar el regalo a la lista.");
		} else {
			setGifts(prevGifts => [...prevGifts, giftFormData]);
			setGiftFormData(newGift());
			setGiftFormError("");
		}
	} 

	const deleteGift = giftId => setGifts(prevGifts => prevGifts.filter(gift => gift.id !== giftId));

	const deleteAllGifts = () => setGifts([]);

	const giftElements = gifts.map(gift => {
		return (
			<li key={ gift.id }>
				{ gift.title } x{ gift.qty }
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

					<div className="form-container">
						<input
							type="text"
							name="title"
							placeholder="&iquest;Qu&eacute; vas a regalar?"
							value={ giftFormData.title }
							onChange={ handleFormChange }
						/>

						<input
							type="number"
							min={0}
							name="qty"
							placeholder="Cant."
							value={ giftFormData.qty }
							onChange={ handleFormChange }
						/>

						<button
							onClick={ handleSubmit }
							className="btn-red"
						>Agregar
						</button>
					</div>

					{ giftFormError &&
						<div className="gift-form-error">
							<BiErrorCircle />
							<small>{ giftFormError }</small>
						</div>
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
