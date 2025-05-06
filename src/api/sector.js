import axiosManager from "./apiManager";

const getSector = async (jwt) => {
  try {
    const res = await axiosManager.get("/api/catalog/sector/", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error) {
      console.log({ error: "error getSector" });
    }

    return { ok: false };
  }
};

export const SectorApi = {
  getSector,
};
