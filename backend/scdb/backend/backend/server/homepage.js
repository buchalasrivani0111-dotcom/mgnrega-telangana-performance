import React, { useEffect, useState } from "react";
import axios from "axios";
const API_BASE = "http://localhost:4000/api";

export default function HomePage() {
  const [districts, setDistricts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/districts`).then((res) => setDistricts(res.data));
  }, []);

  const handleSelect = async (id) => {
    setSelected(id);
    const res = await axios.get(`${API_BASE}/district/${id}`);
    setData(res.data);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4 text-center">
        MGNREGA Performance - Telangana
      </h1>

      <select
        className="border p-2 rounded w-full"
        onChange={(e) => handleSelect(e.target.value)}
      >
        <option>Select a District</option>
        {districts.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>

      {data.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">
            Recent Performance ({data.length} months)
          </h2>
          <ul className="mt-2">
            {data.map((r, i) => (
              <li key={i} className="p-2 bg-white rounded mb-2 shadow-sm">
                <b>
                  {r.month}/{r.year}
                </b>{" "}
                - Workers: {r.total_workers}, Person Days: {r.person_days}, ₹
                {r.expenditure}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
