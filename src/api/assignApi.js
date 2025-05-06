import axiosManager from "./apiManager";

//obtener tabla de asignados
//necesito url
//le doy jwt
const getAssign = async (jwt) => {
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
      console.log({ error: "error getAssign" });
    }
    return { ok: false };
  }
};

//necesito url
//le doy jwt
//id de la asignacion o todos los datos??
const postAssign = async (jwt, id) => {
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
      console.log({ error: "error postAssign" });
    }
    return { ok: false };
  }
};

export const AssignApi = {
  getAssign,
  postAssign,
};
