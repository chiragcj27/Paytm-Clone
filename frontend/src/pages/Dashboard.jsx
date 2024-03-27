import axios from "axios"
import { useEffect, useState } from "react"
import { AppBar } from "../components/AppBar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"

export const Dashboard = () => {

    const [balance,setBalance] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance",{
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then((response) => {setBalance(response.data.balance)})
    }, [])
    console.log(localStorage.getItem("token"));
    return <div>
        <AppBar />
        <div className="m-8">
            <Balance value={balance} />
            <Users />
        </div>
    </div>
}