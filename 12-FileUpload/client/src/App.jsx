import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [uploads, setUploads] = useState([]); // Feltöltött képek listája

  // Feltöltések lekérdezése
  useEffect(() => {
    fetchUploads();
  }, []);

  const fetchUploads = async () => {
    try {
      const response = await axios.get("http://localhost:5000/uploads");
      setUploads(response.data);
    } catch (error) {
      console.error("Hiba a képek lekérdezésekor:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setMessage(response.data.message);
      fetchUploads(); // Újratöltjük a képek listáját
    } catch (error) {
      setMessage("Hiba történt a feltöltés során.");
    }
  };

  return (
    <div>
      <h2>Kép Feltöltése</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Felhasználónév"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Leírás"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <button type="submit">Feltöltés</button>
      </form>
      {message && <p>{message}</p>}

      <h2>Feltöltött képek</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
        {uploads.map((upload) => (
          <div key={upload.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
            <img src={`http://localhost:5000${upload.imageUrl}`} alt={upload.description} style={{ width: "100%" }} />
            <p><strong>{upload.username}</strong></p>
            <p>{upload.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
