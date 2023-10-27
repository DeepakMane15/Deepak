"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/navbar';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";

const SignUp = () => {
    const router = useRouter();
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [profession, setProfession] = useState("");
    const [ethnicity, setEthnicity] = useState("");
    const [languages, setLanguages] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [internalNotes, setInternalNotes] = useState("");
    const [serviceArea, setServiceArea] = useState("");
    const [designation, setDesignation] = useState("");


    const [coordinates, setCoordinates] = useState(null);

    useEffect(() => {
        if (!localStorage.getItem("user")) {
            router.push("/login");
        }
    }, [])

    const handleAddressChange = async (inputAddress) => {
        setAddress(inputAddress);

        try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: inputAddress,
                    key: 'AIzaSyBAztsIXonxMQ3DP70bFYgqClDw1QvCIp4', // Replace with your API key
                },
            });

            for (const component of response.data.results) {
                if (component.types.includes('locality')) {
                    const city = component.long_name;
                    console.log(`The city is: ${city}`);
                    // return;
                }
            }

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
    const handleSubmit = () => {
        try {
            let fd = new FormData();

            fd.append("fname", fname);
            fd.append("lname", lname);
            fd.append("profession", profession);
            fd.append("ethnicity", ethnicity);
            fd.append("address", address);
            fd.append("languages", languages);
            fd.append("phone", phone);
            fd.append("city", "asd");
            fd.append("lat", coordinates.lat);
            fd.append("lon", coordinates.lng);
            fd.append("serviceArea", serviceArea);
            fd.append("internalNotes", internalNotes);
            fd.append("designation", designation);



            axios.post("https://dev.mycargo411.com/api/add-nurse", fd, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            })
                .then(res => {
                    alert(res.message);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        catch (err) {
            console.log(err);
        }
    }


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
                            <label for="exampleInputtext1" class="form-label">Service Area</label>
                            <select class="form-select" aria-label="Default select example" value={serviceArea} onChange={e => setServiceArea(e.target.value)}>
                                <option selected >select service area</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputtext1" class="form-label">Designation</label>
                            <input type="text" class="form-control" value={designation} onChange={(e) => setDesignation(e.target.value)} />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputtext1" class="form-label">Interal notes</label>
                            <input type="text" class="form-control" value={internalNotes} onChange={(e) => setInternalNotes(e.target.value)} />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputtext1" class="form-label">Phone No</label>
                            <input type="text" class="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputtext1" class="form-label">Address</label>
                            <input
                                type="text"
                                class="form-control"
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
                        <button type="button" onClick={handleSubmit} class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp;