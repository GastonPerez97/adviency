import { useState } from "react";
import { nanoid } from "nanoid";

import "./GiftForm.css";

import { BiErrorCircle } from "react-icons/bi";

const GIFT_FORM_ACTIONS = {
	ADD: "Agregar",
	EDIT: "Editar",
	DUPLICATE: "Duplicar"
}

const GiftForm = props => {
	const newGift = () => {
		return {
			id: nanoid(),
			title: "",
			qty: "",
			imageUrl: "",
			receiver: ""
		}
	}

	const [giftFormData, setGiftFormData] = useState(props.selectedGiftData !== null ? props.selectedGiftData : newGift());
	const [showGiftFormErrors, setShowGiftFormErrors] = useState(false);

	const handleFormChange = event => {
		const {name, value} = event.target;
		setGiftFormData(prevFormData => ({...prevFormData, [name]: value}));
	}

	const handleSubmit = () => {
		if (!giftFormData.title
			|| giftFormData.qty <= 0
			|| !giftFormData.imageUrl
			|| !giftFormData.receiver) {
				
			setShowGiftFormErrors(true);
		} else {
			switch (props.giftFormAction) {
				case GIFT_FORM_ACTIONS.ADD:
					props.addGift(giftFormData);
					break;

				case GIFT_FORM_ACTIONS.EDIT:
					props.editGift(giftFormData);
					break;
			
				default:
					break;
			}

			setGiftFormData(newGift());
			setShowGiftFormErrors(false);
		}
	}

	return (
		<section className="form-main-container">
			<div className="form-container">
				<h2>{ props.giftFormAction } regalo:</h2>

				<div>
					<input
						type="text"
						name="title"
						placeholder="&iquest;Qu&eacute; vas a regalar?"
						value={ giftFormData.title }
						onChange={ handleFormChange }
						autoFocus
					/>

					{ (showGiftFormErrors && !giftFormData.title) &&  
						<div className="gift-form-error">
							<BiErrorCircle />
							<small>Completa este campo</small>
						</div>
					}
				</div>

				<div>
					<input
						type="text"
						name="receiver"
						placeholder="&iquest;A qui&eacute;n se lo vas a regalar?"
						value={ giftFormData.receiver }
						onChange={ handleFormChange }
					/>

					{ (showGiftFormErrors && !giftFormData.receiver) &&  
						<div className="gift-form-error">
							<BiErrorCircle />
							<small>Completa este campo</small>
						</div>
					}
				</div>


				<div className="form-input-row">
					<div className="form-input-img">
						<input
							type="text"
							name="imageUrl"
							placeholder="https://imagen..."
							value={ giftFormData.imageUrl }
							onChange={ handleFormChange }
						/>

						{ (showGiftFormErrors && !giftFormData.imageUrl) &&  
							<div className="gift-form-error">
								<BiErrorCircle />
								<small>Agrega una imagen</small>
							</div>
						}
					</div>

					<div className="form-input-qty">
						<input
							type="number"
							min={0}
							name="qty"
							placeholder="Cantidad"
							value={ giftFormData.qty }
							onChange={ handleFormChange }
						/>

						{ (showGiftFormErrors && !giftFormData.qty) &&  
							<div className="gift-form-error">
								<BiErrorCircle />
								<small>Agrega la cantidad</small>
							</div>
						}
					</div>
				</div>

				<div className="form-btn-container">
					<button
						onClick={ handleSubmit }
						className="btn-red"
					>{ props.giftFormAction }
					</button>

					<button
						onClick={ props.closeGiftForm }
						className="btn-outline-red"
					>Cerrar
					</button>
				</div>
			</div>
		</section>
	);
}

export { GiftForm as default, GIFT_FORM_ACTIONS };