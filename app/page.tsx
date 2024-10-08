import Hero from "../components/Hero";
import Gallery from "../components/Gallery";
import Map from "../components/Map";
import Parks from "../components/Parks";

export default function Home() {
	return (
		<>
			<Hero
				heading="National Parks"
				message="The beauty of nature captured in a selection of photographs from the United State's National Parks."
				background="https://wallpaperaccess.com/full/31189.jpg"
			/>
			<Gallery />
			<Map />
			<Parks />
		</>
	);
}
