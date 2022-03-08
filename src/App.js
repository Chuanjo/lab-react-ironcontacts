import "./App.css";
import allContacts from "../src/contacts.json";
import { useState } from "react";

//! Lo siento me di por vencido con el CSS, hora y media para acabar donde empece :(

function App() {
  const [contacts, setContacts] = useState(allContacts.slice(0, 5));

  const handleAddContact = () => {
    if (contacts.length === allContacts.length) {
      return;
    }

    let randomIndex = Math.floor(Math.random() * allContacts.length);
    let randomContObj = allContacts[randomIndex];

    const contactsIds = contacts.map((e) => e.id);

    while (contactsIds.includes(randomContObj.id)) {
      randomIndex = Math.floor(Math.random() * allContacts.length);
      randomContObj = allContacts[randomIndex];
    }

    const contactsCopy = [randomContObj, ...contacts];
    setContacts(contactsCopy);
  };

  const handlePopularitySort = () => {
    const contactsCopy = [...contacts];
    contactsCopy.sort((elem1, elem2) =>
      elem1.popularity < elem2.popularity ? 1 : -1
    );
    setContacts(contactsCopy);
  };

  const handleNameSort = () => {
    const contactsCopy = [...contacts];
    contactsCopy.sort((elem1, elem2) => (elem1.name > elem2.name ? 1 : -1));
    setContacts(contactsCopy);
  };

  const handleDelete = (positionContact) => {
    const contactsCopy = [...contacts];
    contactsCopy.splice(positionContact, 1);
    setContacts(contactsCopy);
  };

  return (
    <div className="contenedor">
      <h1 className="title">IronContacts</h1>
      <button className="btn" onClick={handleAddContact}>Add Random Contact</button>
      <button className="btn" onClick={handlePopularitySort}>Sort by Popularity</button>
      <button className="btn" onClick={handleNameSort}>Sort by Name</button>

      <div>
        <table className="table">
          <thead>
            <tr className="table-head">
              <th className="col1">Picture</th>
              <th className="col1">Name</th>
              <th className="col1">Popularity</th>
              <th className="col1">Won Oscar</th>
              <th className="col1">Won Emy</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((eachContacts, index) => {
              return (
                <tr key={eachContacts.id}>
                  <td className="col1">
                    <img
                      src={eachContacts.pictureUrl}
                      width="60px"
                      alt="img"
                    />
                  </td>
                  <td className="col1"><p>{eachContacts.name}</p></td>
                  <td className="col1"><p>{eachContacts.popularity.toFixed(2)}</p></td>
                  <td className="col1">{eachContacts.wonOscar === true ? "🏆" : ""}</td>
                  <td className="col1">{eachContacts.wonEmmy === true ? "💫" : ""}</td>
                  <button className="col1" onClick={() => handleDelete(index)}>Delete</button>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
