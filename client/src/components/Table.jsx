// import axios from "axios";
import { useEffect, useState } from "react";

import "../pages/content/styles/table.css";

export const Table = ({ leagueId }) => {
  const [standings, setStandings] = useState([]);
  const [league, setLeague] = useState({});

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await fetch(
          `https://v3.football.api-sports.io/standings?league=${leagueId}&season=2023`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "v3.football.api-sports.io",
              "x-rapidapi-key": "b2f109165027ceabf02f519941ec1c81",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error on fetching standings");
        }

        const data = await response.json();
        setStandings(data.response[0].league.standings[0]);
        setLeague(data.response[0].league);
      } catch (error) {
        console.error("An error occurred while fetching standings:", error);
      }
    };
    fetchStandings();
  }, [leagueId]);

  return (
    <div className="table-container">
      <h1>{league.name}</h1>
      {/* <img src={league.logo} alt={league.name} className="league-logo" />
      <img src={league.flag} alt={league.name} className="league-flag" /> */}
      <table>
        <thead className="table-header">
          <tr>
            <th>Position</th>
            <th>Team</th>
            <th>PTS</th>
            <th>PL</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>+/-</th>
            <th>GD</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team) => (
            <tr
              key={team.team.id}
              className={`table-row ${team.rank <= 4 ? "european-team" : ""} ${
                team.rank === standings.length ? "descending-team" : ""
              }`}
            >
              <td>{team.rank}</td>
              <td className="team-name">
                <img
                  src={team.team.logo}
                  alt={team.team.name}
                  className="team-logo"
                />
                {team.team.name}
              </td>
              <td>
                <strong>{team.points}</strong>
              </td>
              <td>{team.all.played}</td>
              <td>{team.all.win}</td>
              <td>{team.all.draw}</td>
              <td>{team.all.lose}</td>
              <td>
                {team.all.goals.for} - {team.all.goals.against}
              </td>
              <td>{team.goalsDiff}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
