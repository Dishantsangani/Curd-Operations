import React, { useEffect, useState } from "react";
function Curd() {
  const [fdata, setFdata] = useState(() => {
    const storedData = localStorage.getItem("data");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [name, SetFname] = useState("");
  const [address, SetAddress] = useState("");
  const [surname, SetAge] = useState("");
  const [id, SetId] = useState(null);

  // Temp Data
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(fdata));
  }, [fdata]);

  // Edit
  const handleedit = (id) => {
    // Find is a return in array
    const edit = fdata.find((item) => item.id === id);
    SetFname(edit.name);
    SetAddress(edit.address);
    SetAge(edit.surname);
    SetId(edit.id);
  };

  // Delete
  const handledelete = (id) => {
    const deleteid = fdata.filter((item) => item.id !== id);
    setFdata(deleteid);
  };

  // Clear
  const handleclear = () => {
    SetFname("");
    SetAddress("");
    SetAge("");
  };

  // Clear ALL Data
  const handleclearall = () => {
    setFdata([]);
  };

  // Generating id
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Save
  const handlesave = () => {
    if (!name || !address || !surname) {
      alert("Please Enter  All Field's 📍");
      return;
    }
    // NewData variable is an object to collect new enterd data and id
    const newdata = { id: id || getRandomInt(1, 100), name, address, surname };
    setFdata(
      id === null
        ? [...fdata, newdata]
        : fdata.map((item) => (item.id === id ? newdata : item))
    );
    handleclear();
  };

  return (
    <>
      <h1 className="mb-4 mt-5 text-xl text-center font-extrabold leading-none tracking-tight text-gray-700 md:text-2xl lg:text-4xl dark:text-white">
        CRUD Operations
      </h1>
      <div className="flex flex-col px-2 md:flex-row md:space-x-4 w-full">
        {/* Input Fields */}
        <div className="flex-1 mb-2">
          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => SetFname(e.target.value)}
            className="w-full bg-transparent placeholder:text-slate-700 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-500 hover:border-slate-300 shadow-lg shadow-gray-100 ring-4 ring-transparent focus:ring-slate-100"
          />
        </div>
        <div className="flex-1 mb-2">
          <input
            type="text"
            placeholder="Enter Your Surname"
            value={surname}
            onChange={(e) => SetAge(e.target.value)}
            className="w-full bg-transparent placeholder:text-slate-700 text-slate-800 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-500 hover:border-slate-300 shadow-lg shadow-gray-100 ring-4 ring-transparent focus:ring-slate-100"
          />
        </div>
        <div className="flex-1 mb-2">
          <input
            type="text"
            placeholder="Enter Your Address"
            value={address}
            onChange={(e) => SetAddress(e.target.value)}
            className="w-full bg-transparent placeholder:text-slate-700 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-500 hover:border-slate-300 shadow-lg shadow-gray-100 ring-4 ring-transparent focus:ring-slate-100"
          />
        </div>
        {/* Buttons */}
        <div className="flex flex-col md:flex-row md:space-x-2 md:mt-0 mt-4">
          <button
            type="button"
            onClick={handlesave}
            className="flex-1 mb-2 px-4 py-2 text-sm font-medium text-green-500 bg-white border border-gray-200 rounded-md hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-2 focus:ring-green-700 focus:text-green-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleclear}
            className="flex-1 mb-2 px-4 py-2 text-sm font-medium text-red-500 bg-white border border-gray-200 rounded-md hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-red-700 focus:text-red-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={handleclearall}
            className="flex-1 mb-2 px-4 py-2 text-sm font-medium text-red-500 bg-white border border-gray-200 rounded-md hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-red-700 focus:text-red-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            ClearAll
          </button>
        </div>
      </div>

      {/* Edit and Delete */}
      <div className="flex flex-col">
        <div className="m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-900 uppercase dark:text-neutral-500">
                      Name
                    </th>
                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-900 uppercase dark:text-neutral-500">
                      Surname
                    </th>
                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-900 uppercase dark:text-neutral-500">
                      Address
                    </th>
                    <th className="px-6 py-3  text-end text-xs font-medium text-black uppercase dark:text-neutral-500">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                  {fdata.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600 dark:text-neutral-200">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                        {item.surname}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                        {item.address}
                      </td>
                      <td className="px-6 py-4  whitespace-nowrap text-end text-sm font-medium">
                        <button
                          type="button"
                          onClick={() => handleedit(item.id)}
                          className="flex-1 mb-2 me-2 px-4 py-2 text-sm font-medium text-green-500 bg-white border border-gray-200 rounded-md hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-2 focus:ring-green-700 focus:text-green-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handledelete(item.id)}
                          className="flex-1 mb-2 px-4 py-2 text-sm apfont-medium text-red-500 bg-white border border-gray-200 rounded-md hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-red-700 focus:text-red-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/*  */}
    </>
  );
}

export default Curd;
