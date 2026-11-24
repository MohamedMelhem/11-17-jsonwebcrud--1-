import { useEffect, useState, type FormEvent } from "react";
import type { Gyros } from "./type/types";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [users, setUsers] = useState<Gyros[]>([]);
  const [nev, setNev] = useState("");
  const [ar, setAr] = useState("");
  const [csiposKellE, setCsiposKellE] = useState(false);

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

  async function handleGyrosFelvetel(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const ujGyros = {
      nev,
      ar: Number(ar),
      csiposKellE,
    };

    try {
      const response = await fetch("http://localhost:3000/gyroszok", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(ujGyros),
      });
      const gyros: Gyros = await response.json();
      setUsers((elozo) => [...elozo, gyros]);
      setNev("");
      setAr("");
      setCsiposKellE(false);
    } catch (err) {
      console.log("Hiba történt felvételnél: " + (err instanceof Error ? err.message : "Ismeretlen hiba"));
    }
  }

  return (
    <>
      <h1 className="text-white">Döner kebab express - Thököly</h1>
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
  <hr width="100%;" color="red" size="5"></hr>
      

<div className="container min-vh-75 d-flex justify-content-center align-items-center py-5">
  <div className="card shadow-lg border-0 rounded-4 p-4" style={{ maxWidth: "450px", width: "100%" }}>

    <div className="text-center mb-3">
      <h1 className="display-4">🌯</h1>
      <h2 className="fw-bold text-danger">Gyros felvétele</h2>
      <p className="text-secondary">Adj hozzá egy új gyrost az étlaphoz!</p>
    </div>

    <hr className="border-danger border-2 opacity-75" />

    <form onSubmit={handleGyrosFelvetel}>
      <div className="mb-3">
        <label htmlFor="input_nev" className="form-label fw-semibold">
          Gyros neve:
        </label>
        <input
          id="input_nev"
          type="text"
          className="form-control form-control-lg"
          placeholder="Gyros neve..."
          value={nev}
          onChange={(e) => setNev(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="input_ar" className="form-label fw-semibold">
          Ár (Ft):
        </label>
        <input
          id="input_ar"
          type="number"
          min="0"
          className="form-control form-control-lg"
          placeholder="Ár megadása..."
          value={ar}
          onChange={(e) => setAr(e.target.value)}
          required
        />
      </div>

      <div className="form-check mb-4">
        <input
          id="input_csipos"
          type="checkbox"
          className="form-check-input"
          checked={csiposKellE}
          onChange={(e) => setCsiposKellE(e.target.checked)}
        />
        <label htmlFor="input_csipos" className="form-check-label">
          🌶️ Csípős legyen
        </label>
      </div>

      <button type="submit" className="btn btn-danger btn-lg w-100 rounded-3 fw-bold">
        + Gyros felvétele
      </button>
    </form>

  </div>
</div>
    </>
  );
}

export default App;
