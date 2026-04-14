import { useEffect, useState } from "react";
import { getRecepts } from "../api/receptApi";
import type { Recept } from "../types";

export function AppointmentsPage() {
  const [recepts, setRecepts] = useState<Recept[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState("");

  const fetchAppointments = async () => {
    setLoading(true);
    setErrorText("");

    try {
      const data = await getRecepts();
      setRecepts(data);
    } catch {
      setErrorText("Failed to load list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchAppointments();
  }, []);

  return (
    <section className="recept-page">
      <h1>Appointment List</h1>

      {errorText ? <div className="feedback error">{errorText}</div> : null}

      {loading ? (
        <div className="feedback">Loading...</div>
      ) : (
        <div className="table-wrap">
          <table className="recept-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Stylist</th>
                <th>Location</th>
                <th>Client</th>
                <th>Phone</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recepts.map((recept, index) => (
                <tr key={recept.id}>
                  <td>{index + 1}</td>
                  <td>{recept.barberName}</td>
                  <td>{recept.barberLocation}</td>
                  <td>{recept.customerName}</td>
                  <td>{recept.phone}</td>
                  <td>{recept.time}</td>
                  <td>{recept.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {!recepts.length ? (
            <p className="empty-state">No appointments yet.</p>
          ) : null}
        </div>
      )}
    </section>
  );
}
