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
  postDiv.setAttribute(
    "style",
    "display:flex; flex-direction: column; border: 0.125rem solid black; padding: 1rem",
  );

  const body = document.createElement("p");
  body.textContent = `${post.body}`;

  const author = document.createElement("h4");
  author.textContent = `By: ${user.username}`;
  const time = document.createElement("p");
  time.innerHTML = `Created at: ${post.created_at}`;

  // create icons to like and comment and enable functionality
  const reactionDiv = document.createElement("div");
  reactionDiv.setAttribute(
    "style",
    "display: flex; gap: 2rem; padding: 0.85rem; box-shadow: 0 0.125rem 0.5rem rgba(0,0,0,0.3); width: fit-content; border-radius: 1rem",
  );

  const likeIcon = document.createElement("i");
  // if already liked, should return the liked icon
  if (post.like_id === null) {
    likeIcon.classList.add("fa-regular", "fa-heart");
  } else {
    likeIcon.classList.remove("fa-regular");
    likeIcon.classList.add("fa-solid", "fa-heart");
    likeIcon.style.color = "red";
  }

  // like icons onclick -> colors the heart red, increment count on the likes for the post and be seen by the author
  likeIcon.addEventListener("click", async () => {
    // create a route and database query
    const res = await axios.post(
      `http://localhost:5000/api/posts/${post.id}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log(res.data);
    likeIcon.classList.remove("fa-regular");
    likeIcon.classList.add("fa-solid", "fa-heart");
    likeIcon.style.color = "red";
  });

  const commentIcon = document.createElement("i");
  commentIcon.classList.add("fa-regular", "fa-comment");

  reactionDiv.append(likeIcon, commentIcon);
  postDiv.append(body, author, time, reactionDiv);
};
