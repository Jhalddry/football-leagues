import axios from "axios";
import { useEffect, useState } from "react";

//! LIVEGAMES
//!Resultado = event_final_result
//!Equipo Local = event_home_team
//!Equipo local logo = home_team_logo
//!Equipo Visitante = event_away_team
//!Equipo visitante logo = away_team_logo
//!Competicion = league_name
//!Competicion logo = league_logo
//!Estadio = event_stadium
//!Tiempo transcurrido = event_status
//!Hora de inicio = event_time

//!Leagues
//!Bundesliga = 175
//!Premier League = 152
//!La Liga = 302
//!Serie A = 207

export function GamesOTD() {
  const [games, setGames] = useState([]);

  const currentDate = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(
          `https://apiv2.allsportsapi.com/football/?met=Fixtures&APIkey=5440758df4894053a833f9e362a8de7c66ab237244252e477bb0c3d45b0a1c89&from=${currentDate}&to=${currentDate}&timezone=America/Caracas`
        );
        setGames(response.data.result);
      } catch (error) {
        console.error("An error occurred while fetching live games:", error);
      }
    };
    fetchGames();
  }, [currentDate]);

  let importantGames = games.filter((game) =>
    [175, 152, 302, 207].includes(game.league_key)
  );

  return (
    <div className="width: 400px;">
      <h1>Games of the Day</h1>

      {importantGames.slice(0, 15).map((game, index) => (
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
                  <span>{game.event_home_team}</span>
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
      ))}
    </div>
  );
}

export default GamesOTD;