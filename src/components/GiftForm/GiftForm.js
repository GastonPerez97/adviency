import { useState } from "react";
import { nanoid } from "nanoid";

import getRandomGiftTitle from "../../services/getRandomGiftTitle";

import "./GiftForm.css";

import { BiErrorCircle, BiGift } from "react-icons/bi";

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
			unitPrice: "",
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
			|| !giftFormData.receiver
			|| giftFormData.unitPrice <= 0) {
				
			setShowGiftFormErrors(true);
		} else {
			switch (props.giftFormAction) {
				
				case GIFT_FORM_ACTIONS.ADD:
				case GIFT_FORM_ACTIONS.DUPLICATE:
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

	const getRandomGift = () => {
		const giftTitle = getRandomGiftTitle();
		setGiftFormData(prevFormData => ({...prevFormData, title: giftTitle}));
	}

	return (
		<section className="form-main-container">
			<div className="form-container">
				<h2>{ props.giftFormAction } regalo:</h2>

				<div>
					<div className="add-gift-input">
						<input
							type="text"
							name="title"
							placeholder="&iquest;Qu&eacute; vas a regalar?"
							value={ giftFormData.title }
							onChange={ handleFormChange }
							autoFocus
						/>

						{ props.giftFormAction === GIFT_FORM_ACTIONS.ADD &&
							<button
								className="btn-red"
								onClick={ getRandomGift }
							>
								<BiGift /> &iexcl;Sorpr&eacute;ndeme!
							</button>
						}
					</div>

					{ (showGiftFormErrors && !giftFormData.title) &&  
						<div className="gift-form-error">
							<BiErrorCircle />
							<small>Completa este campo</small>
						</div>
					}
				</div>

				<div className="form-input-row">
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

					<div>
						<input
							type="number"
							min={0}
							name="qty"
							placeholder="Cantidad"
							value={ giftFormData.qty }
							onChange={ handleFormChange }
						/>

						{ (showGiftFormErrors && giftFormData.qty <= 0) &&  
							<div className="gift-form-error">
								<BiErrorCircle />
								<small>Agrega la cantidad</small>
							</div>
						}
					</div>
				</div>


				<div className="form-input-row">
					<div>
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

					<div>
						<input
							type="number"
							min={0}
							name="unitPrice"
							placeholder="Precio"
							value={ giftFormData.unitPrice }
							onChange={ handleFormChange }
						/>

						{ (showGiftFormErrors && giftFormData.unitPrice <= 0) &&  
							<div className="gift-form-error">
								<BiErrorCircle />
								<small>Agrega el precio</small>
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