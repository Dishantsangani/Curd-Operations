import React, { useEffect, useState } from "react";
import { empdata } from "./empdata";

function Curd() {
  const [fdata, setFdata] = useState(() => {
    // Load data from local storage or use empdata as initial value
    const storedData = localStorage.getItem("fdata");
    return storedData ? JSON.parse(storedData) : empdata;
  });
  const [name, SetFname] = useState("");
  const [address, SetAddress] = useState("");
  const [age, SetAge] = useState("");
  const [id, SetId] = useState(null);

  //
  const editid = fdata.find((item) => item.id === id);
  console.log(editid);

  const deleteid = fdata.filter((item) => item.id !== id);
  setFdata(deleteid);
  // Save to local storage whenever fdata changes
  useEffect(() => {
    localStorage.setItem("fdata", JSON.stringify(fdata));
  }, [fdata]);

  // Edit
  const handleedit = (id) => {
    const edit = fdata.find((item) => item.id === id);
    if (edit) {
      SetFname(edit.name);
      SetAddress(edit.address);
      SetAge(edit.age);
      SetId(edit.id);
    } else {
      alert("Something Went Wrong");
    }
  };

  // Delete
  const handledelete = (id) => {
    const deleteid = fdata.filter((item) => item.id !== id);
    setFdata(deleteid);
  };

  // Clear
  const handleclear = () => {
    SetFname("");
    SetAge("");
    SetAddress("");
  };

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Save
  const handlesave = () => {
    if (!name || !address || !age) {
      alert("Please fill in all fields.");
      return;
    }
    if (id === null) {
      const randomInt = getRandomInt(1, 100);
      const newdata = { id: randomInt, name, address, age };
      setFdata([...fdata, newdata]);
    } else {
      const updatedata = fdata.map((item) =>
        item.id === id ? { id, name, address, age } : item
      );
      setFdata(updatedata);
    }
    handleclear();
  };

  return (
    <>
      <h1>Curd</h1>

      {/* Form Inputs */}
      <input
        type="text"
        placeholder="Enter Your Name"
        value={name}
        onChange={(e) => SetFname(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Your Age"
        value={age}
        onChange={(e) => SetAge(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Your Address"
        value={address}
        onChange={(e) => SetAddress(e.target.value)}
      />

      {/* Action Buttons */}
      <button onClick={handlesave}>Save</button>
      <button onClick={handleclear}>Clear</button>

      {/* Data Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fdata.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.address}</td>
              <td>
                <button onClick={() => handleedit(item.id)}>Edit</button>
                <button onClick={() => handledelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Curd;
