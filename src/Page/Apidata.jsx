import { useEffect, useState } from "react";
import axios from "axios";
function Apidata() {
  const [adata, setAdata] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setAdata(res.data))
      .catch((err) => console.log("This is A API Error", err));
  }, []);

  let newfdata = adata.filter((product) => product.price < 60);

  console.log("newfdata: ", newfdata);
  return (
    <>
      <h1>New api</h1>
      {newfdata.map((item, index) => (
        <div key={index}>
          <p>{item.title}</p>
          <p> Price: {item.price}</p>
          <p> Counting {item.rating.count}</p>
          <br />
        </div>
      ))}
    </>
  );
}

export default Apidata;
