import Gifts from "./components/Gifts/Gifts";
import Snowfall from "react-snowfall";

const App = () => {
	const snowfallStyles = {
		position: 'fixed',
		width: '100vw',
		height: '100vh',
		zIndex: "-1"		
	};

	return (
		<>
			<main>
				<Snowfall color="#FFF" style={ snowfallStyles } />
				<Gifts />
			</main>

			<footer>
				<p>
					Desarrollado por&nbsp;
					<a href="https://gastonperez.ar/" target="_blank" rel="noreferrer">
						Gast&oacute;n P&eacute;rez
					</a>
				</p>
			</footer>
		</>
	);
}

export default App;
