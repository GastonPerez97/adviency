import { useState } from "react";
import { nanoid } from "nanoid";

import "./GiftForm.css";

import { BiErrorCircle } from "react-icons/bi";

const GiftForm = props => {
	const newGift = () => {
		return {
			id: nanoid(),
			title: "",
			qty: "",
			imageUrl: ""
		}
	}

	const [giftFormData, setGiftFormData] = useState(newGift());
	const [giftFormError, setGiftFormError] = useState("");

	const handleFormChange = event => {
		const {name, value} = event.target;

		setGiftFormData(prevFormData => ({...prevFormData, [name]: value}));
	}

	const handleSubmit = () => {
		if (!giftFormData.title || giftFormData.qty <= 0 || !giftFormData.imageUrl) {
			setGiftFormError("Completa los campos para agregar el regalo a la lista.");
		} else {
			props.addGift(giftFormData);
			setGiftFormData(newGift());
			setGiftFormError("");
		}
	} 

	return (
		<section className="form-main-container">
			<div className="form-container">
				<h2>Agregar regalo:</h2>

				<input
					type="text"
					name="title"
					placeholder="&iquest;Qu&eacute; vas a regalar?"
					value={ giftFormData.title }
					onChange={ handleFormChange }
				/>

				<div className="form-input-row">
					<input
						type="text"
						name="imageUrl"
						placeholder="https://image..."
						value={ giftFormData.imageUrl }
						onChange={ handleFormChange }
					/>

					<input
						type="number"
						min={0}
						name="qty"
						placeholder="Cantidad"
						value={ giftFormData.qty }
						onChange={ handleFormChange }
					/>
				</div>

				<div className="form-btn-container">
					<button
						onClick={ handleSubmit }
						className="btn-red"
					>Agregar
					</button>

					<button
						onClick={ props.closeGiftForm }
						className="btn-outline-red"
					>Cerrar
					</button>
				</div>
			</div>

			{ giftFormError &&
				<div className="gift-form-error">
					<BiErrorCircle />
					<small>{ giftFormError }</small>
				</div>
			}
		</section>
	);
}

export default GiftForm;