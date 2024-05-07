import { useEffect, useState } from "react";
import { IconDraw, IconLoss, IconWin } from "./helpers/Icons";

//!standings.team.name
//!standings.team.logo

//!standings.rank
//!standings.all.played
//!standings.points
//!standings.all.win
//!standings.all.draw
//!standings.all.lose
//!standings.form

//!standings.all.goals.for
//!standings.all.goals.against
//!standings.goalsDiff

//!league.logo
//!league.name

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
    <div className="flex flex-col items-center justify-center w-full max-w-3xl min-h-screen py-10 px-4">
      <div className="flex items-center justify-center mb-8">
        <img src={league.logo} alt={league.name} className="w-16 h-16 mr-4" />
        <h1 className="text-2xl text-white font-semibold">{league.name}</h1>
      </div>

      <div className="w-1/2 mx-auto">
        <table className="min-w-full text-sm text-gray-400 divide-y divide-gray-700 bg-gray-900 rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-xs uppercase font-medium">
            <tr>
              <th className="w-16"></th>

              <th scope="col" className="px-6 py-3 text-left tracking-wider">
                Club
              </th>

              <th scope="col" className="px-6 py-3 text-left tracking-wider">
                <span className="text-white">MP</span>
              </th>

              <th scope="col" className="px-6 py-3 text-left tracking-wider">
                <span className="text-white">W</span>
              </th>

              <th scope="col" className="px-6 py-3 text-left tracking-wider">
                <span className="text-white">D</span>
              </th>

              <th scope="col" className="px-6 py-3 text-left tracking-wider">
                <span className="text-white">L</span>
              </th>

              <th scope="col" className="px-6 py-3 text-left tracking-wider">
                <span className="text-white">GF</span>
              </th>

              <th scope="col" className="px-6 py-3 text-left tracking-wider">
                <span className="text-white">GA</span>
              </th>

              <th scope="col" className="px-6 py-3 text-left tracking-wider">
                <span className="text-white">GD</span>
              </th>

              <th scope="col" className="px-6 py-3 text-left tracking-wider">
                <span className="text-white">Pts</span>
              </th>

              <th scope="col" className="px-6 py-3 text-left tracking-wider">
                <span className="text-white">Last 5</span>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {standings.map((team, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{team.rank}</td>

                <td className="flex px-6 py-4 whitespace-nowrap">
                  <img
                    src={team.team.logo}
                    alt="logo"
                    className="w-10 h-10 mr-2"
                  />

                  <span className="text-sm">{team.team.name}</span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {team.all.played}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">{team.all.win}</td>

                <td className="px-6 py-4 whitespace-nowrap">{team.all.draw}</td>

                <td className="px-6 py-4 whitespace-nowrap">{team.all.lose}</td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {team.all.goals.for}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {team.all.goals.against}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {team.goalsDiff}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">{team.points}</td>

                <td className="px-6 py-4 whitespace-nowrap flex flex-row items-center">
                  {team.form.split("").map((result, index) => {
                    switch (result) {
                      case "W":
                        return <IconWin key={index} className="text-2xl" />;

                      case "D":
                        return <IconDraw key={index} className="text-2xl" />;

                      case "L":
                        return <IconLoss key={index} className="text-2xl" />;

                      default:
                        return <span key={index}>?</span>;
                    }
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
