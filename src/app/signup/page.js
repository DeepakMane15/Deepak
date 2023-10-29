"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/navbar';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { Col, Form } from "react-bootstrap";
import { Multiselect } from 'multiselect-react-dropdown';

const SignUp = () => {
    const router = useRouter();
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [profession, setProfession] = useState("");
    const [ethnicity, setEthnicity] = useState("");
    const [languages, setLanguages] = useState([]);
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [internalNotes, setInternalNotes] = useState("");
    const [serviceArea, setServiceArea] = useState([]);
    const [designation, setDesignation] = useState("");
    const [email, setEmail] = useState("");
    const [selectedValue, setSelectedValue] = useState([]);
    const [category, setCategory] = useState([]);
    const [filteredCitiesMaster, setFilteredCitiesMaster] = useState([]);

    const categoryMaster = [{ name: 'Los Angeles', id: 1 }, { name: 'Orange', id: 2 }, { name: 'Kern', id: 3 }];

    const citiesMaster = [{
        name: "Acton", cat: 'Los Angeles', id: 1
    },
    { name: "Agoura Hills", cat: 'Los Angeles', id: 2 },
    { name: "Alhambra", cat: 'Los Angeles', id: 3 },
    { name: "Altadena", cat: 'Los Angeles', id: 4 },
    { name: "Aliso Viejo", cat: 'Orange', id: 5 },
    { name: "Anaheim", cat: 'Orange', id: 6 },
    { name: "Brea", cat: 'Orange', id: 7 },
    { name: "Buena Park", cat: 'Orange', id: 8 },
    { name: "Arvin", cat: 'Kern', id: 9 },
    { name: "Bakersfield", cat: 'Kern', id: 10 },
    { name: "Bodfish", cat: 'Kern', id: 11 },
    { name: "Boron", cat: 'Kern', id: 12 }
    ]

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
            let fd = {

                fname: fname,
                lname: lname,
                profession: profession,
                ethnicity: ethnicity,
                address: address,
                email: email,
                languages: languages,
                phone: phone,
                city: "asd",
                lat: coordinates.lat,
                lon: coordinates.lng,
                serviceArea: serviceArea,
                internalNotes: internalNotes,
                designation: designation
            }


            axios.post("https://api.inventorysolutions.in/api/nurses", fd, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    'Content-Type': "application/json"
                }
            })
                .then(res => {
                    console.log(res.message);
                    alert("Added successfully");
                    reset();
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                })
        }
        catch (err) {
            console.log(err);
        }
    }

    const professionsMaster = [
        { name: 'NP (Nurse Practitioner)', id: 1 },
        { name: 'RN (Registered Nurse)', id: 2 },
        { name: 'LVN (licensed vocational nurse)', id: 3 },
        { name: 'SHHA', id: 4 },
        { name: 'Care Giver', id: 5 },
        { name: 'PT  (Physical Therapy)', id: 6 },
        { name: 'ST (speech Therapy )', id: 7 },
        { name: 'OT (Occupational Therapy)', id: 8 },
        { name: 'Medical Social Worker', id: 9 },
        { name: 'Pediatric', id: 10 }

    ];
    const ethnicityMaster = [
        { name: ' African Americans', id: 1 },
        { name: 'Arabs', id: 2 },
        { name: 'Asians', id: 3 },
        { name: 'European', id: 4 },
        { name: 'Hispanic and Latino Americans', id: 5 },
        { name: 'Indian', id: 6 },
        { name: 'Non-Hispanic whites', id: 7 },
        { name: 'White Americans', id: 8 },
        { name: 'African American', id: 9 },
        { name: 'African', id: 10 },
        { name: 'Other', id: 11 }
    ];
    const languagesMaster = [
        { name: 'English)', id: 1 },
        { name: 'spanish)', id: 2 },
        { name: 'Arabic)', id: 3 },
        { name: 'Armenian)', id: 4 },
        { name: 'Chinese)', id: 5 },
        { name: 'French)', id: 6 },
        { name: 'Hindi)', id: 7 },
        { name: 'Korean)', id: 8 },
        { name: 'Persian)', id: 9 },
        { name: 'Russian)', id: 10 },
        { name: 'Vietnamese)', id: 11 },
        { name: 'Hebrow)', id: 12 },
    ]

    const handleChange = (selectedOptions) => {
        console.log(selectedOptions);
    };
    const onSelect = (selectedList, selectedItem) => {
        console.log(selectedList, selectedItem);
    }

    const onRemove = (selectedList, removedItem) => {
        console.log(selectedList, removedItem);
    }

    const handleRegionChange = (selectedList, selectedItem) => {
        let categoryy = category;
        categoryy = [...categoryy, selectedItem.name];
        setCategory(categoryy);

    }
    const reset = () => {
        setFname("");
        setLname("");
        setProfession("");
        setEthnicity("");
        setLanguages([]);
        setPhone("");
        setAddress("");
        setInternalNotes("");
        setServiceArea([]);
        setDesignation("");
        setEmail("");
        setSelectedValue([]);
        setCategory([]);
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
                            <label for="exampleInputPassword1" class="form-label">Email</label>
                            <input type="text" class="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="exampleInputPassword1" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Profession</label>
                            <select className='form-select' value={profession} onChange={(e) => setProfession(e.target.value)}>
                                <option value="0"> Select Profession</option>
                                {(professionsMaster.map(p => (
                                    <option key={p.name} value={p.name}> {p.name}</option>

                                )))}
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputtext1" class="form-label">Ethnicity</label>
                            <select className='form-select' value={ethnicity} onChange={(e) => setEthnicity(e.target.value)}>
                                <option value="0"> Select Ethnicity</option>
                                {(ethnicityMaster.map(p => (
                                    <option key={p.name} value={p.name}> {p.name}</option>

                                )))}
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputtext1" class="form-label">Languages</label>

                            <Multiselect
                                options={languagesMaster} // Options to display in the dropdown
                                selectedValues={selectedValue} // Preselected value to persist in dropdown
                                onSelect={(selectedList, selectedItem) => { let lang = languages; lang.push(selectedItem.name); setLanguages(lang); console.log(languages) }} // Function will trigger on select event
                                onRemove={(selectedList, selectedItem) => {
                                    let index = languages.indexOf(selectedItem.name);
                                    let languagess = languages;
                                    languagess.splice(index, 1);
                                    setLanguages(languagess);
                                }} // Function will trigger on remove event
                                showCheckbox={true}
                                placeholder="Select Languages"
                                displayValue="name" // Property name to display in the dropdown options
                            />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputtext1" class="form-label">Region</label>
                            <Multiselect
                                options={categoryMaster} // Options to display in the dropdown
                                selectedValues={selectedValue} // Preselected value to persist in dropdown
                                onSelect={(selectedList, selectedItem) => { let lang = category; lang.push(selectedItem.name); setCategory(lang); console.log(category) }} // Function will trigger on select event
                                onRemove={(selectedList, selectedItem) => {
                                    let index = category.indexOf(selectedItem.name);
                                    let categorys = category;
                                    categorys.splice(index, 1);
                                    setCategory(categorys);
                                }} // Function will trigger on remove event
                                showCheckbox={true}
                                placeholder="Select Region"
                                displayValue="name" // Property name to display in the dropdown options
                            />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputtext1" class="form-label">Service Area</label>
                            <Multiselect
                                options={citiesMaster} // Options to display in the dropdown
                                selectedValues={selectedValue} // Preselected value to persist in dropdown
                                onSelect={(selectedList, selectedItem) => { let lang = serviceArea; lang.push(selectedItem.name); setServiceArea(lang); console.log(serviceArea) }} // Function will trigger on select event
                                onRemove={(selectedList, selectedItem) => {
                                    let index = serviceArea.indexOf(selectedItem.name);
                                    let serviceAreas = serviceArea;
                                    serviceAreas.splice(index, 1);
                                    setServiceArea(serviceAreas);
                                }} // Function will trigger on remove event
                                showCheckbox={true}
                                placeholder="Select Profession"
                                displayValue="name" // Property name to display in the dropdown options
                            />
                            {/* <select class="form-select" aria-label="Default select example" value={serviceArea} onChange={e => setServiceArea(e.target.value)}>
                                <option selected >select service area</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select> */}
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputtext1" class="form-label">Designation</label>
                            <input type="text" class="form-control" value={designation} onChange={(e) => setDesignation(e.target.value)} />
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
                        <div class="mb-3">
                            <label for="exampleInputtext1" class="form-label">Interal notes</label>
                            <input type="text" class="form-control" value={internalNotes} onChange={(e) => setInternalNotes(e.target.value)} />
                        </div>
                        <button type="button" onClick={handleSubmit} class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp;