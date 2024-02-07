import axios from "axios";
import { useEffect, useState } from "react";

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

export function LiveGames(){
    const [liveGames, setLiveGames] = useState([]);

    useEffect(() => {
        const fetchLiveGames = async () => {
            try {
                const response = await axios.get(
                    `https://apiv2.allsportsapi.com/football/?met=Livescore&APIkey=5440758df4894053a833f9e362a8de7c66ab237244252e477bb0c3d45b0a1c89&timezone=america/caracas`
                )
                setLiveGames(response.data.result)
            }
            catch (error) {
                console.error("An error occurred while fetching live games:", error)
            }
        };
        fetchLiveGames()
    }, []);

    console.log(liveGames)

  return (
    <h1>Live Games</h1>
  )
}

export default LiveGames;