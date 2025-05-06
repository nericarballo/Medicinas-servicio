import axiosManager from "./apiManager";

const getMedicines = async (jwt) => {
  try {
    const res = await axiosManager.get("/api/catalog/medicine/", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error) {
      console.log({ error: "error getMedicinesapi" });
    }

    return { ok: false };
  }
};

const createMedicine = async (jwt, name, illnesses) => {
  try {
    const res = await axiosManager.post(
      "/api/catalog/medicine/",
      { name, illnesses },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return res;
  } catch (error) {
    if (error) {
      console.log({ error: "error createMedi" });
    }

    return { ok: false };
  }
};

const updateMedicine = async (jwt, id, name, illnesses) => {
  try {
    const res = await axiosManager.put(
      `/api/catalog/medicine/${id}/`,
      {
        illnesses,
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return res;
  } catch (error) {
    if (error) {
      console.log({ error: "error updateMedi" });
    }

    return { ok: false };
  }
};

const deleteMedicine = async (jwt, id) => {
  try {
    const res = await axiosManager.delete(`/api/catalog/medicine/${id}/`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return res;
  } catch (error) {
    if (error) {
      console.log({ error: "error deleteMedi" });
    }

    return { ok: false };
  }
};

export const MedicineApi = {
  getMedicines,
  createMedicine,
  updateMedicine,
  deleteMedicine,
};
