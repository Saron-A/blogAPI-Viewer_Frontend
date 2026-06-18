// read the post id from the searchparams or the query
const searchQuery = new URLSearchParams(window.location.search); // gives the querystring directly in our case postId = `${post.id}` and any other query parameters as well

const postId = searchQuery.get("postId");
console.log(postId);
const token = localStorage.getItem("token");

const getPostById = async () => {
  try {
    const res = await axios.get(`http://localhost:5000/api/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.data); //post: body, created_at, id, title, is_published, user_id; user : username, email
    const post = res.data.post;
    const user = res.data.user;
    createElements(post, user);
  } catch (err) {
    console.error("Failed fetching post by its id", err.message);
  }
};

getPostById();

const createElements = (post, user) => {
  const pageTitle = document.querySelector("title");
  pageTitle.textContent = `${post.title}`;

  const h1 = document.querySelector("#title");
  h1.textContent = `${post.title}`;

  const postDiv = document.querySelector(".post");

  const body = document.createElement("p");
  body.textContent = `${post.body}`;

  const author = document.createElement("h4");
  author.textContent = `By: ${user.username}`;
  const time = document.createElement("p");
  time.innerHTML = `Created at: ${post.created_at}`;

  postDiv.append(body, author, time);
};
