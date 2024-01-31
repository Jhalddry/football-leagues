import {useState, useEffect} from 'react'

const useGetData = (API) => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch({API}, {
          method: "GET",
          headers: {
            "x-rapidapi-key": "b2f109165027ceabf02f519941ec1c81",
            "x-rapidapi-host": "v3.football.api-sports.io",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.response);
            setData(data.response);
          })
          .catch((error) => console.log("error", error));
      }, []);

    return data;
}

export default useGetData