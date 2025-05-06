import { LocalStorage } from "../utils/LocalStorage";
import axiosManager from "./apiManager";

const login = async (document, password) => {
  try {
    const res = await axiosManager.post("/api/login", {
      document,
      password,
    });

    LocalStorage.Post("token", res.data.access);

    console.log(res);

    return { ok: true, token: res.data.access };
  } catch (error) {
    if (error) {
      console.log("error al iniciar sesion");
    }
    return { ok: false, msg: "Credenciales incorrectas" };
  }
};

const getUser = async (jwt) => {
  try {
    const res = await axiosManager.get("/api/user", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("Authorization");
    return res.data;
  } catch (error) {
    if (error) {
      console.log({ error: "error getUser" });
    }

    return { ok: false };
  }
};

//url, datos
const createPatient = async (
  jwt,
  illness,
  medicine,
  grammage,
  quantity,
  first_names,
  last_names,
  document,
  birth_date,
  address,
  phone_number1,
  sex,
  purchase_power,
  created_by,
  sector
) => {
  try {
    const res = await axiosManager.post(
      "/api/patient/",
      {
        illness,
        medicine,
        grammage,
        quantity,
        first_names,
        last_names,
        document,
        birth_date,
        address,
        phone_number1,
        sex,
        purchase_power,
        created_by,
        sector,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    console.log("user de la api creado", res.data);

    return res.data;
  } catch (error) {
    if (error) {
      console.log("error createPatient", error);
    }
    return { ok: false };
  }
};

//url, datos, devuelve
const createDonor = async (jwt, first_names, donor_type, document, email) => {
  try {
    const res = await axiosManager.post(
      "/api/user",
      {
        is_superuser: false,
        first_name: "",
        last_name: "",
        is_staff: false,
        is_active: true,
        first_names,
        last_names: "",
        email,
        document,
        phone_number1: "",
        phone_number2: "",
        donor_type,
        is_admin: false,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    console.log(res); //me devuelve??

    return { ok: true };
  } catch (error) {
    if (error) {
      console.log("error createDonor");
    }
    return { ok: false };
  }
};

//url, datos, devuelve
const createAdmin = async (jwt, data) => {
  try {
    const res = await axiosManager.post(
      "/api/login",
      { data }, // se supone que son los datos del admin, poner individual
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    console.log(res);

    return { ok: true };
  } catch (error) {
    if (error) {
      console.log("error createAdmin");
    }
    return { ok: false };
  }
};

const getUserme = async (jwt) => {
  try {
    const res = await axiosManager.get("/api/user/me", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return res.data;
  } catch (error) {
    if (error) {
      console.log({ error: "error getUserme" });
    }

    return { ok: false };
  }
};

export const AdminApi = {
  login,
  getUser,
  createPatient,
  createDonor,
  createAdmin,
  getUserme,
};
