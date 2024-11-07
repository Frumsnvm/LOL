const API_URL = "http://server-url.cz/api/games"; // Nahraďte URL podle potřeby

export const createGame = async (gameData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData),
    });
    return response.json();
};

export const getGameById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
};

export const updateGame = async (id, gameData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData),
    });
    return response.json();
};

export const deleteGame = async (id) => {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
};

export const getAllGames = async () => {
    const response = await fetch(API_URL);
    return response.json();
};
