"use client"
import axios from "axios";
import { Cagliostro } from "next/font/google";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from '../components/navbar';


const Profile = () => {

    const [data, setData] = useState([]);

    // const data = [
    //     {
    //         fname: "Adam", lname: "Ad",
    //         address: "New York", city: "New York",
    //         email: "example@gmail.com", profession: "SHHA", ethnicity: "Care Giver",
    //         languages: "English,Hindi", internal_notes: "Notes", designation: "ST", service_area: "Acton"

    //     },
    //     {
    //         fname: "Thor", lname: "Odinson",
    //         address: "New York", city: "New York",
    //         email: "example@gmail.com", profession: "SHHA", ethnicity: "Care Giver",
    //         languages: "English,Hindi", internal_notes: "Notes", designation: "ST", service_area: "Acton"

    //     },
    //     {
    //         fname: "Peter", lname: "Parkar",
    //         address: "New York", city: "New York",
    //         email: "example@gmail.com", profession: "SHHA", ethnicity: "Care Giver",
    //         languages: "English,Hindi", internal_notes: "Notes", designation: "ST", service_area: "Acton"

    //     },
    //     {
    //         fname: "Aka dm", lname: "Eon",
    //         address: "New York", city: "New York",
    //         email: "example@gmail.com", profession: "SHHA", ethnicity: "Care Giver",
    //         languages: "English,Hindi", internal_notes: "Notes", designation: "ST", service_area: "Acton"

    //     },
    //     {
    //         fname: "Bruce", lname: "Banner",
    //         address: "New York", city: "New York",
    //         email: "example@gmail.com", profession: "SHHA", ethnicity: "Care Giver",
    //         languages: "English,Hindi", internal_notes: "Notes", designation: "ST", service_area: "Acton"

    //     },
    // ];

    useEffect(() => {
        getProfileData();
    }, [])
    const getProfileData = () => {
        try {
            axios.get("https://api.inventorysolutions.in/api/nurses/get-nurses")
                .then((res) => {
                    if (res.data.status === 200)
                        setData(res.data.data);
                    else
                        console.log(res.data.message);
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
            <Navbar title="TeamedServ" />
            <div className="container" style={{ marginTop: "40px" }}>
                <h3 style={{ color: "#5c5c5c" }}>Profiles</h3>
                <table class="table" style={{ marginTop: "10px" }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Profession</th>
                            <th>Ethnicity</th>
                            <th>Designation</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Service Area</th>
                            <th>Languages</th>
                            <th>Internal Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map(d => (
                            <tr key="d.fname">
                                <td>{d.fname + " " + d.lname}</td>
                                <td>{d.email}</td>
                                <td>{d.profession}</td>
                                <td>{d.ethnicity}</td>
                                <td>{d.designation}</td>
                                <td>{d.address}</td>
                                <td>{d.city}</td>
                                <td>{d.serviceArea.map(s => (<p key={s}>{s}</p>))}</td>
                                <td>{d.languages.map(l => (<p key={l}>{l}</p>))}</td>
                                <td>{d.internalNotes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default Profile;