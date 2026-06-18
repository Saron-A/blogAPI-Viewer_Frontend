// dynamically load content after fetching token, user data and posts from the backend

const token = localStorage.getItem("token");
const logOutBtn = document.querySelector("button");

logOutBtn.addEventListener("click", () => {
  // remove the token from the local storage and clean it
  localStorage.removeItem("token");
  window.location.href = "./forms/login.html";
});

const getAllData = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/dashboardV", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // we get {posts : {title, body, time, author}, user : {id, username, email}}
    console.log(res.data);

    const posts = res.data.posts; // array
    const user = res.data.user; // object - email and username

    // start creating element
    createElements(posts, user);
  } catch (err) {
    console.error(err);
  }
};

getAllData();

const createElements = (posts, user) => {
  const headerDiv = document.querySelector("#header");
  const postsDiv = document.querySelector(".posts");
  postsDiv.setAttribute("style", "display: flex; gap: 1rem");

  const h1 = document.createElement("h1");
  h1.textContent = `Welcome back, ${user.username} !`;
  const h2 = document.createElement("h2");
  h2.textContent =
    "Catch up on the latest posts from other users and react to them!";

  headerDiv.append(h1, h2);

  // display all posts in the database if any or a message if not -- get all posts
  if (posts.length === 0) {
    const h3 = document.createElement("h3");
    h3.textContent = "No posts yet";
    postsDiv.appendChild(h3);
  } else {
    posts.forEach((post) => {
      const postDiv = document.createElement("div");
      postDiv.setAttribute(
        "style",
        "border : 0.125rem solid black; padding : 1rem; border-radius : 1rem; width: fit-content",
      );

      const titleH = document.createElement("h3");
      titleH.textContent = `${post.title}`;

      const authorH = document.createElement("h4");
      authorH.textContent = `${post.author}`;

      const timeH = document.createElement("p");
      timeH.textContent = `${post.created_at}`;

      postDiv.append(titleH, authorH, timeH);
      postsDiv.appendChild(postDiv);

      postDiv.addEventListener("click", () => {
        // open a page dynamically and show the body as well
        console.log(post);
        console.log(post.id);
        window.location.href = `./post.html?postId=${post.id}`;
      });
    });
  }
};
