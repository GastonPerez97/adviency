import "./Gift.css";

import formatPrice from "../../services/formatPrice";

import defaultGiftImg from "../../assets/img/gift-default.png";

import { IoIosTrash } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { BiDuplicate } from "react-icons/bi";

const Gift = props => {
	return (
		<li>
			<div className="gift-info-container">
				<img
					src={ props.gift.imageUrl }
					alt="Imagen del regalo"
					onError={ event => {
						event.target.src = defaultGiftImg;
					}}
				/>
				
				<div className="gift-text">
					<p>{ props.gift.title } ({ props.gift.qty }) - { formatPrice(props.gift.unitPrice * props.gift.qty) }</p>
					<small>{ props.gift.receiver }</small>
				</div>
			</div>

			{ !props.hideButtons &&
				<div className="gift-btn-container">
					<button
						className="btn-red btn-gift"
						onClick={ () => props.handleDuplicateGift(props.gift.id) }
					>
						<BiDuplicate />
					</button>

					<button
						className="btn-red btn-gift"
						onClick={ () => props.handleEditGift(props.gift.id) }
					>
						<FiEdit />
					</button>

					<button
						className="btn-red btn-gift"
						onClick={ () => props.deleteGift(props.gift.id) }
					>
						<IoIosTrash />
					</button>
				</div>
			}
		</li>
	);
}

export default Gift;
