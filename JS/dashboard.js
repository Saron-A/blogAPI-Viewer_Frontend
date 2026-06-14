// dynamically load content after fetching token, user data and posts from the backend

const token = localStorage.getItem("token");

const getAllData = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // we get {posts : {title, body, time, isPublished, author}, user : {id, username, email}}
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

  const h1 = document.createElement("h1");
  h1.textContent = `Welcome back, ${user.username} !`;
  const h2 = document.createElement("h2");
  h2.textContent =
    "Catch up on the latest posts from other users and react to them!";

  headerDiv.append(h1, h2);

  // display posts if any or a message if not
  if (posts.length === 0) {
    const h3 = document.createElement("h3");
    h3.textContent = "No posts yet";
    postsDiv.appendChild(h3);
  } else {
    posts.forEach((post) => {
      const postDiv = document.createElement("div");

      const titleH = document.createElement("h3");
      titleH.textContent = `${post.title}`;

      const authorH = document.createElement("h4");
      authorH.textContent = `${post.author}`;

      const timeH = document.createElement("p");
      timeH.textContent = `${post.created_at}`;

      postDiv.append(titleH, authorH, timeH);
    });
  }
};
