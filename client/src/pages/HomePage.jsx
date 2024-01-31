import axios from "axios";
import { useEffect, useState } from "react";

export const HomePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://v3.football.api-sports.io/standings?league=39&season=2023", {
      headers: {
        "x-rapidapi-key": "b2f109165027ceabf02f519941ec1c81",
      }
    }).then((response) => {
      console.log(response.data);
      setData(response.data)
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  return (
    <div>

    </div>
  );
}