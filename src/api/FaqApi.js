import axiosManager from "./apiManager";

const getFaq = async (jwt) => {
  try {
    const res = await axiosManager.get("/api/catalog/faq/", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error) {
      console.log({ error: "error getFaq" });
    }

    return [{ ok: false }];
  }
};
const getFaqUser = async () => {
  try {
    const res = await axiosManager.get("/api/catalog/faq/");
    return res.data;
  } catch (error) {
    if (error) {
      console.log({ error: "error getFaq" });
    }

    return [{ ok: false }];
  }
};

const createFaq = async (jwt, question, answer) => {
  try {
    const res = await axiosManager.post(
      "/api/catalog/faq/",
      { question, answer, is_visible: true },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    if (error) {
      console.log({ error: "error createFaq" });
    }

    return [{ ok: false }];
  }
};

const updateFaqVisible = async (jwt, id, question, answer, is_visible) => {
  try {
    const res = await axiosManager.patch(
      `/api/catalog/faq/${id}/`,
      { question, answer, is_visible },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    if (error) {
      console.log({ error: "error updateFaq" });
    }

    return [{ ok: false }];
  }
};

const updateFaq = async (jwt, id, question, answer) => {
  try {
    const res = await axiosManager.put(
      `/api/catalog/faq/${id}/`,
      { question, answer, is_visible: true },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    if (error) {
      console.log({ error: "error updateFaq" });
    }

    return [{ ok: false }];
  }
};

const deleteFaq = async (jwt, id) => {
  try {
    const res = await axiosManager.delete(`/api/catalog/faq/${id}/`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error) {
      console.log({ error: "error deleteFaq" });
    }

    return [{ ok: false }];
  }
};

export const FaqApi = {
  getFaq,
  getFaqUser,
  createFaq,
  updateFaqVisible,
  updateFaq,
  deleteFaq,
};
