import { useEffect, useState } from "react";

function GamesOTD() {
  const [games, setGames] = useState([]);

  const currentDate = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(
          `https://v3.football.api-sports.io/fixtures?date=${currentDate}`,
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
  }, [currentDate]);

  if (!games) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">Live Games</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {games.length > 0 &&
          games
            .filter((game) => {
              const allowedLeagueIds = ["135", "39", "140", "78", "61", "129", "1", "2", "3", "4", "5", "848", "9", "11", "13", "34"];
              return allowedLeagueIds.includes(game.league.id.toString());
            })
            .map((game) => (
              <div
                key={game.fixture.id}
                className="bg-gray-900 p-4 rounded-lg shadow-md flex flex-col"
              >
                <div className="flex items-center mb-2">
                  <img
                    src={game.league.logo}
                    alt={game.league.name}
                    className="w-8 h-8 mr-2"
                  />
                  <p className="text-lg font-bold text-white">
                    {game.league.name}
                  </p>
                </div>
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 mr-2">
                    <img
                      src={game.teams.home.logo}
                      alt={game.teams.home.name}
                      className="w-full h-full rounded-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg font-bold text-white">
                      {game.teams.home.name}
                    </p>
                    {game.fixture.status.short === "NS" ||
                    game.fixture.status.short === "PT" ? (
                      <p className="text-lg font-bold text-white">vs</p>
                    ) : (
                      <p className="text-lg font-bold text-white">
                        {game.goals.home} - {game.goals.away}
                      </p>
                    )}
                  </div>
                  <div className="w-8 h-8 ml-2">
                    <img
                      src={game.teams.away.logo}
                      alt={game.teams.away.name}
                      className="w-full h-full rounded-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg font-bold text-white">
                      {game.teams.away.name}
                    </p>
                    {game.fixture.status.short === "NS" ||
                    game.fixture.status.short === "PT" ? (
                      <p className="text-lg font-bold text-white">vs</p>
                    ) : (
                      <p className="text-lg font-bold text-white">
                        {game.goals.away} - {game.goals.home}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  <p className="text-lg font-bold text-white">
                    {game.fixture.venue.name}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="text-lg font-bold text-white">
                    {new Date(game.fixture.date).toLocaleString()}
                  </p>
                  <span className="text-lg mx-2">-</span>
                  <p className="text-lg font-bold text-white">
                    {game.fixture.status.short === "NS"
                      ? "Not Started"
                      : game.fixture.status.short === "FT"
                      ? "Full Time"
                      : `${game.fixture.status.elapsed}' ${game.fixture.status.short}`}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default GamesOTD;
