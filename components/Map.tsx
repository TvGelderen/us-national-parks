"use client";

import React, { useMemo, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { LocationData, SliderData, LocationInfo } from "./Data";
import { AiOutlineClose } from "react-icons/ai";
import Slider from "./Slider";
import Link from "next/link";

const Map = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [location, setLocation] = useState<LocationInfo>(LocationData[0]);

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
	});

	const center = useMemo(() => ({ lat: 38.07362, lng: -99.643037 }), []);

	const handleClick = (newLocation: LocationInfo) => {
		setOpen(true);
		setLocation(newLocation);
	};

	return (
		<div id="map" className="pt-[90px]">
			<h3 className="text-center">Map</h3>
			<div className="max-w-[1240px] m-auto mt-5 shadow-2xl">
				{!isLoaded ? (
					<h1>Loading....</h1>
				) : (
					<GoogleMap
						zoom={3}
						center={center}
						mapContainerClassName="map-class"
					>
						{LocationData.map((loc, index) => (
							<Marker
								position={loc.coordinates}
								key={index}
								onClick={() => handleClick(loc)}
							/>
						))}
					</GoogleMap>
				)}
			</div>
			{open && (
				<div
					className="fixed z-[10] left-0 top-0 w-full h-full bg-black/60 justify-center flex"
					onClick={() => setOpen(false)}
				>
					<div
						className="max-w-[1000px] w-[95%] md:w-[80%] lg:w-[70%] fixed top-[30%] bg-white shadow-lg p-4"
						onClick={(event: React.MouseEvent) =>
							event.stopPropagation()
						}
					>
						<div className="flex justify-between pb-2 border-b-4 border-gray-300">
							<div>
								<h3>{location.name}</h3>
								<p className="pt-1">{location.state}</p>
							</div>
							<div
								className="cursor-pointer"
								onClick={() => setOpen(false)}
							>
								<AiOutlineClose size={30} />
							</div>
						</div>
						{location.description !== "" && (
							<div className="pt-4">
								<p>{location.description}</p>
							</div>
						)}
						<div>
							<Link href={`parks/${location.name}`}>
								<Slider
									images={SliderData.filter(
										(slide) =>
											slide.location === location.name
									)}
									classes="w-[100%]"
								/>
							</Link>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Map;
