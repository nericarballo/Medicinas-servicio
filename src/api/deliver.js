import axiosManager from "./apiManager";

//obtener tabla de entregas
//necesito al url
const getDelivers = async (jwt) => {
  try {
    const res = await axiosManager.get("/api/user", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    //el retorno deberia ser un array??
    console.log(res);
    return { ok: true };
  } catch (error) {
    if (error) {
      console.log({ error: "error getDelivers" });
    }
    return { ok: false };
  }
};

// crear entrega
//necesito url
//le doy el id de la entrega???
const updateDeliver = async (jwt, id) => {
  try {
    const res = await axiosManager.get(
      "/api/user",
      {
        nom: id, //tienes que poner el nombre del atributo bien
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    //el retorno deberia ser un array??
    console.log(res);
    return { ok: true };
  } catch (error) {
    if (error) {
      console.log({ error: "error updateDelivers" });
    }
    return { ok: false };
  }
};

//url
//le doy id
//retorna?
const deleteDeliver = async (jwt, id) => {
  try {
    const res = await axiosManager.get(
      "/api/user",
      {
        nom: id, //tienes que poner el nombre del atributo bien
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    //el retorno deberia ser un array??
    console.log(res);
    return { ok: true };
  } catch (error) {
    if (error) {
      console.log({ error: "error deleteDelivers" });
    }
    return { ok: false };
  }
};

export const DeliverApi = {
  getDelivers,
  updateDeliver,
  deleteDeliver,
};
