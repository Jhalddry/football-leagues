import axios from "axios";
import { useEffect, useState } from "react";

import "../pages/content/styles/table.css";

//! NOMBRE = team.standing_team
//! ESCUDO = team.team_logo
//! PUNTOS OBTENIDOS = team.standing_PTS
//! PARTIDOS JUGADOS = team.standing_P
//! PARTIDOS GANADOS = team.standing_W
//! PARTIDOS EMPATADOS = team.standing_D
//! PARTIDOS PERDIDOS = team.standing_L
//! GOLES A FAVOR = team.standing_F
//! GOLES EN CONTRA = team.standing_A
//! DIFERENCIA DE GOLES = team.standing_GD

export const Table = ({ leagueId }) => {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await axios.get(
          `https://apiv2.allsportsapi.com/football/?&met=Standings&leagueId=${leagueId}&APIkey=5440758df4894053a833f9e362a8de7c66ab237244252e477bb0c3d45b0a1c89`
        );
        setStandings(response.data.result.total);
      } catch (error) {
        console.error("An error occurred while fetching standings:", error);
      }
    };
    fetchStandings();
  }, [leagueId]);

  const getTeamType = (team) => {
    if (team.standing_place_type.includes("Relegation")) {
      return "Relegation";
    } else if (team.standing_place_type.includes("Champions League")) {
      return "Champions League";
    } else if (team.standing_place_type.includes("Europa League")) {
      return "Europa League";
    } else {
      return "";
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Team</th>
            <th>Games Played</th>
            <th>Games Won</th>
            <th>Games Drawn</th>
            <th>Games Lost</th>
            <th>Goals For</th>
            <th>Goals Against</th>
            <th>Goal Difference</th>
            <th>Points</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td style={{ display: "flex", alignItems: "center" }}>
                <img src={team.team_logo} style={{ width: "30px", marginRight: "10px" }} />
                {team.standing_team}
              </td>
              <td>{team.standing_P}</td>
              <td>{team.standing_W}</td>
              <td>{team.standing_D}</td>
              <td>{team.standing_L}</td>
              <td>{team.standing_F}</td>
              <td>{team.standing_A}</td>
              <td>{team.standing_GD}</td>
              <td>{team.standing_PTS}</td>
              <td>{getTeamType(team)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};