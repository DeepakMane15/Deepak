"use client"
import Image from 'next/image'
import styles from './page.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar';
import { useEffect, useRef, useState } from 'react';

const Home = () => {

  const [city, setCity] = useState('');
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [map, setMap] = useState(null);
  const mapContainerRef = useRef(null);
  const autocompleteInputRef = useRef(null);

  useEffect(() => {
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBAztsIXonxMQ3DP70bFYgqClDw1QvCIp4&libraries=places`;
    googleMapScript.async = true;
    googleMapScript.defer = true;
    googleMapScript.onload = initializeMap;
    document.head.appendChild(googleMapScript);
  }, []);

  const initializeMap = () => {
    const map = new google.maps.Map(mapContainerRef.current, {
      center: { lat: 0, lng: 0 }, // Default to the world map
      zoom: 2,
    });

    setMap(map);
  };

  const handleCitySearch = () => {
    if (city && map) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: city }, (results, status) => {
        if (status === 'OK' && results.length > 0) {
          const location = results[0].geometry.location;
          map.setCenter(location);
          new google.maps.Marker({
            position: location,
            map,
            title: `City: ${city}`,
          });
        }
      });
    }
  };

  const handleCityInputChange = (e) => {
    const inputCity = e.target.value;
    setCity(inputCity);

    // Use the Google Places Autocomplete service for address suggestions
    const service = new google.maps.places.AutocompleteService();
    service.getPlacePredictions(
      {
        input: inputCity,
        types: ['(cities)'],
      },
      (predictions, status) => {
        if (status === 'OK') {
          setAddressSuggestions(predictions.map((prediction) => prediction.description));
        } else {
          setAddressSuggestions([]);
        }
      }
    );
  };

  const handleSuggestionSelect = (selectedCity) => {
    setCity(selectedCity);
    setAddressSuggestions([]); // Clear suggestions
  };
  return (
    <div>
      <Navbar title={"My-App"}/>

      <div style={{ marginTop: '40px' }}>
        <form className='container'>
          <div className='row'>
            <div class="col-md-1">
              <label for="exampleInputEmail1" class="form-label">City:</label>
            </div>
            <div class="col-md-6">
              <input
                type="text"
                style={{ width: '100%' }}
                placeholder="Enter a city"
                value={city}
                onChange={handleCityInputChange}
                ref={autocompleteInputRef}
              />
              {addressSuggestions.length > 0 && (
                <ul className="suggestions">
                  {addressSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionSelect(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className='col-md-4'>
              <button type="button" className="btn btn-primary mb-2 apply" onClick={handleCitySearch}>Search</button>
            </div>

          </div>
        </form>
        <div
          ref={mapContainerRef}
          style={{ height: '400px', width: '100%' }}
        ></div>

      </div>
    </div>
  )
}
export default Home;