import axiosManager from "./apiManager";

//esperar
const consulta = async (id) => {
  try {
    const res = await axiosManager.post("/apiurlllll", {
      document: id,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return { msg: "error consulta" };
  }
};

const getpatients = async (jwt) => {
  try {
    const res = await axiosManager.get("/api/patient/", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error) {
      console.log({ error: "error getpatients" });
    }

    return { ok: false };
  }
};

export const PatientApi = {
  consulta,
  getpatients,
};
