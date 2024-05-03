import { useEffect, useState } from "react";

function GamesOTD() {
  const [games, setGames] = useState([]);

  // const currentDate = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(
          `https://v3.football.api-sports.io/fixtures?`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "v3.football.api-sports.io",
              "x-rapidapi-key": "b2f109165027ceabf02f519941ec1c81",
            },
          }
        );
        const data = await response.json();
        setGames(data.response);
      } catch (error) {
        console.error("An error occurred while fetching live games:", error);
      }
    };
    fetchGames();
  }, []);

  console.log(games);

  return (
    <div className="width: 400px;">
      <h1>Games of the Day</h1>
      {/* {games.slice(0, 15).map((game, index) => (
        <div
          key={game.id}
          className={`margin-bottom: 20px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); ${
            index !== 0 ? "margin-top: 20px;" : ""
          }`}
        >
          <div className="bg-black shadow-md rounded-lg p-4 text-white">
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={game.home_team_logo}
                    alt={game.event_home_team}
                    className="h-10 w-10 mr-2"
                  />
                  <span>{game.event_home_team}</span>s
                </div>
                <div className="flex items-center">
                  <span>{game.event_final_result}</span>
                </div>
                <div className="flex items-center">
                  <img
                    src={game.away_team_logo}
                    alt={game.event_away_team}
                    className="h-10 w-10 ml-2"
                  />
                  <span>{game.event_away_team}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span>Stadium: {game.event_stadium}</span>
                </div>
                <div>
                  <span>Competition: {game.league_name}</span>
                  <img
                    src={game.league_logo}
                    alt={game.league_name}
                    className="h-5 w-5"
                  />
                </div>
                <div>
                  <span>Start Date: {game.event_time}</span>
                </div>
              </div>
              <div>
                <span>Time Elapsed: {game.event_live}</span>
              </div>
            </div>
          </div>
        </div>
      ))} */}
    </div>
  );
}

export default GamesOTD;