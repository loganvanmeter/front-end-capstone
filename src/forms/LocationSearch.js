import { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import {
	geocodeByAddress,
	geocodeByPlaceId,
	getLatLng,
} from "react-places-autocomplete";

export const LocationSearch = () => {
	const [address, setAddress] = useState("");
	const handleSelect = (address) => {
		geocodeByAddress(address)
			.then((results) => getLatLng(results[0]))
			.then((latLng) => console.log("Success", latLng))
			.catch((error) => console.log("Error", error));
	};

	return (
		<PlacesAutocomplete
			value={address}
			onChange={setAddress(address)}
			onSelect={handleSelect}
		>
			{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
				<div>
					<input
						{...getInputProps({
							placeholder: "Search for address...",
							className: "location-search-input",
							autoFocus: true,
						})}
					/>
					<div className='autocomplete-dropdown-container'>
						{loading && <div>Loading...</div>}
						{suggestions.map((suggestion) => {
							const className = suggestion.active
								? "suggestion-item--active"
								: "suggestion-item";
							const style = suggestion.active
								? { backgroundColor: "#fafafa", cursor: "pointer" }
								: { backgroundColor: "#ffffff", cursor: "pointer" };
							return (
								<div
									{...getSuggestionItemProps(suggestion, {
										className,
										style,
									})}
								>
									<span>{suggestion.description}</span>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</PlacesAutocomplete>
	);
};
