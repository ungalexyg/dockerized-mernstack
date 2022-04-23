import logo from './logo.svg';
import { useState } from "react";
import 'dotenv/config';
import './App.css';

function App() {

    const [rates, setRates] = useState({ rates: 'click to Gat Rates' });
    const [users, setUsers] = useState({ users: 'click to Gat Users' });


    const getUsers = async () => {

        // let headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        // headers.append('Accept', 'application/json');
        // headers.append('Origin', 'http://localhost:4000');
        // headers.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));

        console.log('fetching users');
        let res = await fetch('http://localhost:4000');
        let json = await res.json();
        console.log(json);
        setUsers(json);
    }


    const getRates = async () => {
        console.log('fetching rates');
        let res = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
        let json = await res.json();
        console.log(json);
        setRates(json);
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />

                <br />
                <h4>Users</h4>
                <button onClick={getUsers}>
                    Get Users
                </button>
                <div style={{ margin: "4px", padding: "4px", background: "#6e7687" }}>
                    {rates ? (JSON.stringify(users)) : ('waiting for users...')}
                </div>

                <br />
                <h4>Rates</h4>
                <button onClick={getRates}>
                    Get Rates
                </button>
                <div style={{ margin: "4px", padding: "4px", background: "#6e7687" }}>
                    {rates ? (JSON.stringify(rates)) : ('waiting for rates...')}
                </div>

            </header>
        </div>
    );
}

export default App;
