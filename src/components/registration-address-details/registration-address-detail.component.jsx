import { useState } from "react";
import { useNavigate } from "react-router-dom"

const RegistrationAddressDetails = () => {
    let navigate = useNavigate();
    const [add1, setAdd1] = useState();
    const [add2, setAdd2] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [pincode, setPincode] = useState();

    return(
        <div></div>
    );
}