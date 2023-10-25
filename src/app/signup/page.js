"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/navbar';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const SignUp = () => {

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [profession, setProfession] = useState("");
    const [ethnicity, setEthnicity] = useState("");
    const [languages, setLanguages] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const [coordinates, setCoordinates] = useState(null);

    const handleAddressChange = async (inputAddress) => {
        setAddress(inputAddress);

        try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: inputAddress,
                    key: 'AIzaSyBAztsIXonxMQ3DP70bFYgqClDw1QvCIp4', // Replace with your API key
                },
            });

            const result = response.data.results[0];
            if (result) {
                console.log(result);
                const { lat, lng } = result.geometry.location;
                setCoordinates({ lat, lng });
            }
        } catch (error) {
            console.error('Error fetching coordinates: ', error);
        }
    };


    return (
        <>
            <Navbar title={"Sign-Up"} />
            <div class="signupMain">
                <div class="signup">
                    <form>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">First name</label>
                            <input type="text" class="form-control" id="exampleInputEmail1" value={fname} onChange={(e) => setFname(e.target.value)} aria-describedby="emailHelp" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Last Name</label>
                            <input type="text" class="form-control" value={lname} onChange={(e) => setLname(e.target.value)} id="exampleInputPassword1" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Profession</label>
                            <input type="text" class="form-control" value={profession} onChange={(e) => setProfession(e.target.value)} />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputtext1" class="form-label">Ethnicity</label>
                            <input type="text" class="form-control" value={ethnicity} onChange={(e) => setEthnicity(e.target.value)} />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputtext1" class="form-label">Languages</label>
                            <select class="form-select" aria-label="Default select example" value={languages} onChange={e => setLanguages(e.target.value)}>
                                <option selected >select language</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputtext1" class="form-label">Phone No</label>
                            <input type="text" class="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputtext1" class="form-label">Address</label>
                            <input
                                type="text"
                                placeholder="Enter your address"
                                value={address}
                                onChange={(e) => handleAddressChange(e.target.value)}
                            />
                            {coordinates && (
                                <div>
                                    <p>Latitude: {coordinates.lat}</p>
                                    <p>Longitude: {coordinates.lng}</p>
                                </div>
                            )}
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp;