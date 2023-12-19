const baseURL = "https://localhost:8080/api";

//Information of user if cookie exists
export const fetchUserData = `${baseURL}/forum/getUserData`;

//CSRF getting url----------------------------------
export const csrfTokenURL = `${baseURL}/csrf-token`;

//Login url-----------------------------------------
export const loginUrl = `${baseURL}/login`;

//Register url--------------------------------------
export const registerUrl = `${baseURL}/register`;

const baseForumUrl = `${baseURL}/forum`;

//Creating a new topic url
export const createTopic = `${baseForumUrl}/create`;
//Fetcing all topics to show on forum page
export const getAllTopics = `${baseForumUrl}/get`;
//Fetcing  topicsas per query
export const getSomeTopics = (query) => `${baseForumUrl}/getResults/${query}`;
//Editing a topic (creator only)
export const editTopic = (id) => `${baseForumUrl}/edit/${id}`;
//Editing a topic (creator only/all)
export const viewTopic = (id) => `${baseForumUrl}/get/${id}`;
//Deleting a topic (creator only)
export const deleteTopic = (id) => `${baseForumUrl}/delete/${id}`;

//Profile picture updating Url
export const updateProfilePicture = `${baseForumUrl}/updateProfilePicture`;
//Getting all topics created by a person to show in his dashboard
export const getAllTopicsForAPerson = (personId) =>
  `${baseForumUrl}/getOfAPerson/${personId}`;
//Url to store a new comment on a post
export const createAComment = (postId) =>
  `${baseForumUrl}/createComment/${postId}`;

//ADMIN ROUTES---------------------------------------------------
const baseAdminUrl = `${baseURL}/admin`;
//Getting all topics to show on ecoshop page (accessible to everyone)
export const getAllForumTopics = `${baseAdminUrl}/getAllForumTopics`;
//Getting all products to show on ecoshop page (accessible to everyone)
export const getAllProducts = `${baseAdminUrl}/getAllProducts`;
//Getting all products to show on ecoshop page (accessible to everyone)
export const getPrivateProducts = `${baseAdminUrl}/getPrivateProducts`;
//Getting individual product from database (accessible to everyone)
export const getOneProduct = (productId) =>
  `${baseAdminUrl}/getOneProduct/${productId}`;
//Create new product (accessible to only admin)
export const createOneProduct = `${baseAdminUrl}/createProduct`;
export const deleteOneProduct = (productId) =>
  `${baseAdminUrl}/deleteProduct/${productId}`;
export const editOneProduct = (productId) =>
  `${baseAdminUrl}/editProduct/${productId}`;

//Request headers used in sending requests to server-----------------------
export const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Credentials": true,
};
