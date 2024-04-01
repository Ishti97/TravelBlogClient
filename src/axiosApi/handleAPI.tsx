import axios from "axios";
axios.defaults.withCredentials = true;
const baseUrl = "http://localhost:3000";
const refreshToken = localStorage.getItem("refreshToken");

const register = async (email: string, password: string, role: string) => {
  try {
    const res = await axios
      .post(`${baseUrl}/user/register`, { email, password, role })
      .catch((err) => console.log(err));
    return res;
  } catch (err) {
    console.log(err);
  }
};

const login = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${baseUrl}/user/login`, { email, password });
    return res;
  } catch (err) {
    console.log(err);
  }
};

const log_out = async () => {
  try {
    const res = await axios.post(`${baseUrl}/user/logout`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

const getNewToken = async (token) => {
  try {
    const res = await axios.post(`${baseUrl}/user/token`, { token });
    return res;
  } catch (error) {
    console.log(error);
  }
};

const createNewPost = async (
  title: string,
  detail: string,
  authorId: number,
  categoryId: number,
  image: File
) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("detail", detail);
    formData.append("authorId", authorId.toString());
    formData.append("categoryId", categoryId.toString());
    formData.append("image", image);

    // for (const pair of formData.entries()) {
    //   console.log(pair[0]+ ' - ' + pair[1]);
    // }

    const res = await axios.post(`${baseUrl}/post/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    if (error.response?.status === 500) {
      try {
        const newTokenResponse = await getNewToken(refreshToken);
        if (newTokenResponse?.status === 200) {
          return await createNewPost(
            title,
            detail,
            authorId,
            categoryId,
            image
          );
        }
      } catch (error) {
        console.error("Error getting new token:", error);
      }
    } else {
      console.error("Error in getting post data:", error);
    }
  }
};

const deletePost = async (postId: number) => {
  try {
    const res = await axios.delete(`${baseUrl}/post/delete/${postId}`);
    return res;
  } catch (error) {
    if (error.response?.status === 500) {
      try {
        const newTokenResponse = await getNewToken(refreshToken);
        if (newTokenResponse?.status === 200) {
          return await deletePost(postId);
        }
      } catch (error) {
        console.error("Error getting new token:", error);
      }
    } else {
      console.error("Error in getting post data:", error);
    }
  }
};

const updatePost = async (contentId, contentDetail: string) => {
  try {
    const res = await axios.patch(`${baseUrl}/post/update/${contentId}`, {
      detail: contentDetail,
    });
    return res;
  } catch (error) {
    if (error.response?.status === 500) {
      try {
        const newTokenResponse = await getNewToken(refreshToken);
        if (newTokenResponse?.status === 200) {
          return await updatePost(contentId, contentDetail);
        }
      } catch (error) {
        console.error("Error getting new token:", error);
      }
    } else {
      console.error("Error in getting post data:", error);
    }
  }
};

const getCategory = async () => {
  try {
    const res = await axios.get(`${baseUrl}/category`);

    return res;
  } catch (error) {
    if (error.response?.status === 500) {
      try {
        const newTokenResponse = await getNewToken(refreshToken);
        if (newTokenResponse?.status === 200) {
          return await getCategory();
        }
      } catch (error) {
        console.error("Error getting new token:", error);
      }
    } else {
      console.error("Error in getting post data:", error);
    }
  }
};

const deleteCategory = async (categoryId: number) => {
  try {
    const res = await axios.delete(`${baseUrl}/category/delete/${categoryId}`);
    return res;
  } catch (error) {
    if (error.response?.status === 500) {
      try {
        const newTokenResponse = await getNewToken(refreshToken);
        if (newTokenResponse?.status === 200) {
          return await deletePost(categoryId);
        }
      } catch (error) {
        console.error("Error getting new token:", error);
      }
    } else {
      console.error("Error in getting post data:", error);
    }
  }
};

const createNewCategory = async (name: string) => {
  try {
    const res = await axios.post(`${baseUrl}/category/create`, { name });

    return res;
  } catch (error) {
    if (error.response?.status === 400) {
      try {
        const newTokenResponse = await getNewToken(refreshToken);
        if (newTokenResponse?.status === 200) {
          return await createNewCategory(name);
        }
      } catch (error) {
        console.error("Error getting new token:", error);
      }
    } else {
      console.error("Error in getting post data:", error);
    }
  }
};

const fetchUnapprovedPosts = async () => {
  try {
    const res = await axios.get(`${baseUrl}/post/unapproved/data`);
    return res;
  } catch (error) {
    if (error.response?.status === 500) {
      try {
        const newTokenResponse = await getNewToken(refreshToken);
        if (newTokenResponse?.status === 200) {
          return await fetchUnapprovedPosts();
        }
      } catch (error) {
        console.error("Error getting new token:", error);
      }
    } else {
      console.error("Error in getting post data:", error);
    }
  }
};

const fetchApprovedPosts = async () => {
  try {
    const res = await axios.get(`${baseUrl}/post`);
    return res;
  } catch (error) {
    console.log(error);
    if (error.response?.status === 500) {
      try {
        const newTokenResponse = await getNewToken(refreshToken);
        if (newTokenResponse?.status === 200) {
          return await fetchApprovedPosts();
        }
      } catch (error) {
        console.error("Error getting new token:", error);
      }
    } else {
      console.error("Error in getting post data:", error);
    }
  }
};

const fetchSinglePost = async (contentId: number) => {
  try {
    const res = await axios.get(`${baseUrl}/post/${contentId}`);

    return res;
  } catch (error) {
    if (error.response?.status === 500) {
      try {
        const newTokenResponse = await getNewToken(refreshToken);

        if (newTokenResponse?.status === 200) {
          return await fetchSinglePost(contentId);
        }
      } catch (error) {
        console.error("Error getting new token:", error);
      }
    } else {
      console.error("Error in getting post data:", error);
    }
  }
};

const approvePost = async (postId: number) => {
  try {
    const res = await axios.patch(`${baseUrl}/post/approve/${postId}`, {
      published: 1,
    });
    return res;
  } catch (error) {
    if (error.response?.status === 500) {
      try {
        const newTokenResponse = await getNewToken(refreshToken);
        if (newTokenResponse?.status === 200) {
          return await approvePost(postId);
        }
      } catch (error) {
        console.error("Error getting new token:", error);
      }
    } else {
      console.error("Error in getting post data:", error);
    }
  }
};

const pieChartData = async () => {
  try {
    const res = await axios.get(`${baseUrl}/categories/chart`);

    return res.data;
  } catch (error) {
    if (error.response?.status === 500) {
      try {
        const newTokenResponse = await getNewToken(refreshToken);
        if (newTokenResponse?.status === 200) {
          return await pieChartData();
        }
      } catch (error) {
        console.error("Error getting new token:", error);
      }
    } else {
      console.error("Error in getting post data:", error);
    }
  }
};

const createBookmark = async (contentId: number, userId: number) => {
  try {
    const res = await axios.post(`${baseUrl}/bookmark/create`, {
      contentId,
      userId,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

const getBookmark = async (userId: number) => {
  try {
    const res = await axios.get(`${baseUrl}/bookmark`, {
      params: {
        userId: userId,
      },
    });

    return res;
  } catch (error) {
    if (error.response?.status === 500) {
      try {
        const newTokenResponse = await getNewToken(refreshToken);
        if (newTokenResponse?.status === 200) {
          return await getCategory();
        }
      } catch (error) {
        console.error("Error getting new token:", error);
      }
    } else {
      console.error("Error in getting post data:", error);
    }
  }
};

export {
  register,
  login,
  log_out,
  createNewPost,
  getNewToken,
  deletePost,
  updatePost,
  getCategory,
  fetchApprovedPosts,
  fetchUnapprovedPosts,
  approvePost,
  pieChartData,
  fetchSinglePost,
  deleteCategory,
  createNewCategory,
  createBookmark,
  getBookmark,
};
