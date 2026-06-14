// get token from local storage and send to backend
// fetch posts

const token = localStorage.getItem("token");

const getUserPosts = async () => {
  try {
    const res = await axios.get(`http://localhost:5000/api/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    const posts = res.data; // array of post objects
    createElements(posts);
  } catch (err) {
    console.error(err);
  }
};

getUserPosts();

const createElements = (posts) => {
  // check if posts.length > 0, display error message if not
  const postsDiv = document.querySelector(".posts");

  if (posts.length === 0) {
    const p = document.createElement("h3");
    p.textContent = "No posts yet.";
    postsDiv.appendChild(p);
  } else {
    posts.forEach((post) => {
      // create a postdiv
      const postDiv = document.createElement("div");

      const titleH = document.createElement("h3");
      titleH.textContent = `${post.title}`;

      const authorH = document.createElement("h4");
      authorH.textContent = `${post.author}`;

      const timeH = document.createElement("p");
      timeH.textContent = `${post.created_at}`;

      postDiv.append(titleH, authorH, timeH);
      postsDiv.append(postDiv);
    });
  }
};
