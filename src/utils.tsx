export const fetchWithErrorCheck = async (
  url: string,
  setIsLogged: any,
  jsonify: boolean = true
) => {
  let response;
  let data;

  try {
    response = await fetch(url);

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.setItem("IS_LOGGED", "false");
        setIsLogged(false);
        throw new Error(
          `HTTP ошибка! Пользователь не авторизован. Status: ${response.status}`
        );
      } else {
        throw new Error(`HTTP ошибка! Status: ${response.status}`);
      }
    }

    if (url === "/api/profile") {
      localStorage.setItem("IS_LOGGED", "true");
      return setIsLogged(true);
    }

    if (jsonify) {
      data = await response.json();
      return data.data;
    } else {
      return response;
    }
  } catch (err) {
    console.log(err);
  }
};

export const colors = {
  curr: "#6929c4",
  deals: "#1192e8",
  orders: "#005d5d",
  lots: "#9f1853",
  gameConcurrentInGame: "#fa4d56",
  gameConcurrentTwitchViewers: "#570408",
  steamConcurrentOnline: "#198038",
  steamConcurrentInGame: "#002d9c",
};
