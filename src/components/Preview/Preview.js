import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import "./Preview.css";

import Gift from "../Gift/Gift";

const Preview = props => {
	const previewRef = useRef();

	const handlePrint = useReactToPrint({
		content: () => previewRef.current
	});

	const previewGiftElements = props.gifts.map(gift => {
		return (
			<Gift
				key={ gift.id }
				gift={ gift }
				hideButtons={ true }
			/>
		);
	});

	return (
		<section className="preview-container">
			<article ref={ previewRef } className="preview-box">
				<h2>Lista de regalos:</h2>

				<div className="preview-gifts">
					{ previewGiftElements }
				</div>
				
				<div className="preview-btn-container">
					<button className="btn-outline-red" onClick={ props.handlePreview }>Cerrar</button>
					<button className="btn-red" onClick={ handlePrint }>Imprimir</button>
				</div>
			</article>
		</section>
	);
}

export default Preview;
