import { StrictMode ,useEffect, useState } from "react";
import type { Gyros } from "./type/types";
import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";

function App() {
  const [users, setUsers] = useState<Gyros[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:3000/gyroszok");
        const data: Gyros[] = await response.json();
        setUsers(data);
      } catch (err) {
        console.log("Hiba történt: " + (err instanceof Error ? err.message : "Ismeretlen hiba"));
      }
    }

    fetchUsers();
  }, []);


  return (
    <>
      <h1 >Döner kebab express - User </h1>
          <a className="btn btn-danger mb-3" href="/admin.html">Admin mode</a>
          <a className="btn btn-info mb-3" href="/user.html">User mode</a>
      <h2>Gyrosok listája</h2>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Név</th>
            <th>Ár</th>
            <th>Csípős?</th>
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
            </tr>
          ))}
        </tbody>
      </table>

      


    </>
)}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);