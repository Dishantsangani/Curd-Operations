import React, { useState } from "react";

function Pdfpreview() {
  const [fdata, setFdata] = useState([]);

  const handlechange = (e) => {
    let sum = e.target.files[0];
    // That Stored in Pdf For Previews
    const pdfpreview = URL.createObjectURL(sum);

    let person = {
      name: sum.name,
      id: GenerateGUID(),
      file: pdfpreview,
    };

    console.log(person);
    setFdata((prevdata) => [...prevdata, person]);
  };

  //   Genereate Uique id
  function GenerateGUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
  // Delete
  const handledelete = (id) => {
    setFdata((prevData) => prevData.filter((person) => person.id !== id));
  };
  //   preview
  const preview = (file) => {
    window.open(file, "_blank");
  };
  return (
    <>
      <input type="file" placeholder="Upload Here" onChange={handlechange} />

      <div style={{ marginTop: "10px" }}>
        {fdata.map((item, index) => (
          <div key={index}>
            <div>
              <button
                onClick={() => preview(item.file)}
                style={{ marginRight: "10px" }}
              >
                preview
              </button>
              this is name {item.name}
              <button
                onClick={() => handledelete(item.id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Pdfpreview;
