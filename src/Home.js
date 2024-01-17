import React, { useContext, useState } from "react";
import { userContext } from "./App";

function Home() {
  const [medicines, setMedicines] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userByTC, setUserByTC] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(userContext);
  const handleSearchByTC = async () => {
    const res = await fetch(
      `https://prescription-backend-tfos.onrender.com/auth/findUser?tcNo=${searchTerm}`
    );
    const data = await res.json();

    setUserByTC(data[0] || {});
  };

  const handleSearchButtonClick = async (e) => {
    e.preventDefault();
    handleSearchByTC();
  };

  const handleSearchMedicine = async () => {
    const res = await fetch(
      `https://prescription-backend-tfos.onrender.com/prescription/searchMedicines?name=${searchTerm}`
    );
    const data = await res.json();

    if (data[0]) {
      setTotalPrice((prevTotalPrice) => prevTotalPrice + data[0].MedicinePrice);
      setMedicines((prevMedicines) => [...prevMedicines, data[0].MedicineName]);
    }
  };

  const handleSendPrescription = async () => {
    // Your code to send the prescription goes here
    // Set datas to null (assuming this is how you clear the data)
    setMedicines([]);
    setTotalPrice(0);

    // Show success alert
    alert("Prescription sent successfully!");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-2xl font-bold mb-4">Hoşgeldin {user.PharmacyName}</p>
      <h1 className="text-4xl font-bold mb-4">Eczane Sistemi</h1>
      <div className="flex flex-col items-center justify-center">
        <div className="flex gap-1 items-center justify-center">
          <label className="text-xl font-bold mb-2">TC Kimlik No</label>
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-500 rounded-md p-2 mb-2"
            type="text"
          />
          <button
            onClick={(e) => handleSearchButtonClick(e)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Ara
          </button>
        </div>

        <div className="flex gap-2 items-center justify-center">
          <label className="text-xl font-bold mb-2">İlaç Adı</label>
          <input
            className="border border-gray-500 rounded-md p-2 mb-2"
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleSearchMedicine}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Ara
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <label className="text-xl font-bold mb-2">İsim</label>
          <input
            className="border border-gray-500 rounded-md p-2 mb-2"
            type="text"
            value={userByTC.name || ""}
            readOnly
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <label className="text-xl font-bold mb-2">Soyisim</label>
          <input
            className="border border-gray-500 rounded-md p-2 mb-2"
            type="text"
            value={userByTC.surname || ""}
            readOnly
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-8">
        <h2 className="text-2xl font-bold mb-4">Seçilen İlaçlar</h2>
        <ul className="list-disc list-inside">
          {medicines.map((medicine, index) => (
            <li key={index}>{medicine}</li>
          ))}
        </ul>
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Toplam Tutar</h3>
          <p className="text-lg">{totalPrice} TL</p>
        </div>
      </div>
      <div className="mt-8">
        <button
          onClick={handleSendPrescription}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Send Prescription
        </button>
      </div>
    </div>
  );
}

export default Home;
