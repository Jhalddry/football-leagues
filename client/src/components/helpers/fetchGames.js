const fetchGames = async () => {
  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/fixtures?live=all`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": "b2f109165027ceabf02f519941ec1c81",
        },
      }
    );

    return response.json();
  } catch (error) {
    console.error("An error occurred while fetching live games:", error);

    throw error; // Rethrow the error
  }
};

export default fetchGames;
