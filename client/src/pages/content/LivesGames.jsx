import axios from "axios";
import { useEffect, useState } from "react";

function LivesGames() {

    const [lives, setLives] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
          try {
            const response = await axios.get(
              `https://apiv2.allsportsapi.com/football/?met=Livescore&APIkey=5440758df4894053a833f9e362a8de7c66ab237244252e477bb0c3d45b0a1c89`
            );
            setLives(response.data.result);
          } catch (error) {
            console.error("An error occurred while fetching live games:", error);
          }
        };
        fetchGames();
      }, []);

    return (
        <div>
            <h1>Lives Games</h1>
        </div>
    );
}

export default LivesGames;