import './App.css';
import axios from "axios";
import {useEffect, useState} from "react";

const card_state = {
    name: "",
    card_number: "",
    limit: ""
}
function App() {

    const [cards, setCards] = useState([]);
    const [newCard, setNewCard] = useState(card_state);

    const handleFormSubmit = (e) => {
      e.preventDefault()

        if(newCard.name === "" || newCard.card_number === "", newCard.limit === ""){
            alert("Please fill all the details in form.")
        }
        else {

            axios.post('/cards', newCard)
                .then(response => {

                    if (response.data.error) {
                        alert("Invalid card number")
                    } else {
                        window.location.reload()
                    }

                }).catch(error => {
                console.log("hello")
                console.log(error.response)
            });
        }
    }

    useEffect(() => {

        axios.get('/')
            .then(response => {
                console.log(response)
                setCards(response.data)
            }).catch(error => {

            }
        )

    }, [])

    return (
        <div className="container mt-3">
            <h2>Credit Card System.</h2>
            <div className="row">
                <div className="col-md-4">
                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <label>Name</label><br/>
                            <input type="text"
                                   onChange={event => setNewCard({
                                       ...newCard, name: event.target.value
                                   })}
                                   className="form-control"/>
                        </div>

                        <div className="mt-3">
                            <label>Card Number</label><br/>
                            <input type="text"
                                   onChange={event => setNewCard({
                                       ...newCard, card_number: event.target.value
                                   })}
                                   className="form-control"/>
                        </div>

                        <div className="mt-3">
                            <label>Limit</label><br/>
                            <input type="text"
                                   onChange={event => setNewCard({
                                       ...newCard, limit: event.target.value
                                   })}
                                   className="form-control"/>
                        </div>

                        <div className="mt-3">
                            <input type="submit" className="btn btn-primary" value="Add"/>
                        </div>
                    </form>
                </div>
            </div>

            <div className="mt-3">
                <h3 className="mb-1">Existing Cards</h3>
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Card Number</th>
                        <th scope="col">Balance</th>
                        <th scope="col">Limit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cards.map(card =>
                        <tr key={card.id}>
                            <th scope="row">{card.name}</th>
                            <td>{card.card_number}</td>
                            <td>£ { card.balance }</td>
                            <td>£ {card.limit}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default App;
