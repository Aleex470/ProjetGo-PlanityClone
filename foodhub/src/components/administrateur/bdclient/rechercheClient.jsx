import React, { useState } from 'react';
import './rechercheClient.css';

function rechercherClients(termeRecherche, setClients, setError) {
    fetch(`http://localhost:8080/clients?search=${termeRecherche}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la recherche des clients');
        }
        return response.json();
      })
      .then(data => {
        console.log('Clients trouvés:', data);
        // Mettre à jour l'état du composant avec les données récupérées
        if (data === null) {
            setError("Client(s) non trouvé(s)");
        }
        setClients(data);
        setError(""); // Réinitialiser l'erreur en cas de succès
      })
      .catch(error => {
        console.error('Erreur:', error);
        setError(error.message);
        setClients([]); // Réinitialiser les clients en cas d'erreur
      });
}

function RechercheClients({ setModalOpenRechercheClient }) {
    const [termeRecherche, setTermeRecherche] = useState('');
    const [clients, setClients] = useState([]);
    const [error, setError] = useState(null);

    const handleChange = event => {
      setTermeRecherche(event.target.value);
    };

    const handleSubmit = event => {
      event.preventDefault();
      rechercherClients(termeRecherche, setClients, setError);
    };

    return (
        <div className="modalBackground-bdclien">
            <div className="modalContainer-bdclien">
                <div className="titleCloseBtn-bdclien">
                    <button onClick={() => { setModalOpenRechercheClient(false); }}>
                        Fermer
                    </button>
                </div>
                <div className="body" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent : "center" }}>
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={termeRecherche} onChange={handleChange} />
                        <button type="submit">Rechercher</button>
                    </form>
                    {error && <p className="error-message">{error}</p>}
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Prénom</th>
                                <th>Nom</th>
                                <th>Code postal</th>
                                <th>Identifiant</th>
                                <th>Mot de passe</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients && clients.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.id}</td>
                                    <td>{data.prenom}</td>
                                    <td>{data.nom}</td>
                                    <td>{data.codePostal}</td>
                                    <td>{data.identifiant}</td>
                                    <td>{data.motDePasse}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default RechercheClients;
