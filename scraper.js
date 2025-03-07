const axios = require('axios');

const API_URL = 'https://api.promiedos.com.ar/games/today?support_b=false';

async function getPartidos() {
    try {
        const response = await axios.get(API_URL);
        const data = response.data;

        if (!data.leagues) {
            return { error: "No se encontraron partidos." };
        }

        const partidos = data.leagues.flatMap(league =>
            league.games.map(game => ({
                liga: league.name,
                jornada: game.stage_round_name,
                equipo1: game.teams[0].short_name,
                equipo2: game.teams[1].short_name,
                estado: game.status.name,
                horario: game.start_time,
                url_partido: `https://www.promiedos.com.ar/${game.url_name}`,
                canal_tv: game.tv_networks?.map(tv => tv.name).join(", ") || "No disponible",
                cuotas: game.main_odds?.options.map(opt => `${opt.name}: ${opt.value}`).join(" | ") || "No disponibles"
            }))
        );

        return partidos;
    } catch (error) {
        console.error("Error obteniendo los partidos:", error.message);
        return { error: "Error obteniendo los datos de la API" };
    }
}

module.exports = { getPartidos };
