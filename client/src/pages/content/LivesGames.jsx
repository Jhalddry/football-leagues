import { useEffect, useState } from "react";

function LivesGames() {
  const [lives, setLives] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(
          "https://v3.football.api-sports.io/fixtures?live=all",
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "v3.football.api-sports.io",
              "x-rapidapi-key": "b2f109165027ceabf02f519941ec1c81",
            },
          }
        );
        const data = await response.json();
        setLives(data.response);
      } catch (error) {
        console.error("An error occurred while fetching live games:", error);
      }
    };
    fetchGames();
  }, []);

  console.log(lives);

  return (
    <div>
      <h1>Lives Games</h1>
    </div>
  );
}

export default LivesGames;

/*
*/