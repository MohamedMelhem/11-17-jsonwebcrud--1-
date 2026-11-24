import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import type { Gyros } from "./type/types";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function App() {
  const [users, setUsers] = useState<Gyros[]>([]);
  const [hiba, setHiba] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:3000/gyroszok");
        if (!response.ok) {
          throw new Error(`A lista betöltése nem sikerült (${response.status}).`);
        }
        const data: Gyros[] = await response.json();
        setUsers(data);
      } catch (err) {
        setHiba("Hiba történt: " + (err instanceof Error ? err.message : "Ismeretlen hiba"));
      }
    }

    fetchUsers();
  }, []);

  async function handleTorles(id: string) {
    try {
      const response = await fetch(`http://localhost:3000/gyroszok/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`A törlés nem sikerült (${response.status}).`);
      }
      setUsers((elozo) => elozo.filter((gyrosz) => gyrosz.id !== id));
      setHiba("");
    } catch (err) {
      setHiba("Hiba történt törléskor: " + (err instanceof Error ? err.message : "Ismeretlen hiba"));
    }
  }

  return (
    <>
      <h1>
        <span className="text-danger">Admin mód</span>
      </h1>
      <a className="btn btn-primary mb-3" href="/index.html">Vissza a főoldalra</a>
      {hiba && <p className="text-danger" role="alert">{hiba}</p>}
      <h2>Gyrosok listája</h2>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Név</th>
            <th>Ár</th>
            <th>Csípős?</th>
            <th>Törlés</th>
            <th>Szerkesztés</th>
          </tr>
        </thead>
        <tbody>
          {users.map((gyrosz) => (
            <tr key={gyrosz.id}>
              <td>{gyrosz.nev}</td>
              <td>{gyrosz.ar !== undefined ? `${gyrosz.ar} Ft` : "-"}</td>
              <td>
                {gyrosz.csiposKellE === undefined
                  ? "-"
                  : gyrosz.csiposKellE
                    ? "Igen"
                    : "Nem"}
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleTorles(gyrosz.id)}
                >
                  Törlés
                </button>
              </td>
              <td><button type="button" className="btn btn-warning">Szerkesztés</button></td>
            </tr>
          ))}
          
        </tbody>
      </table>
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
