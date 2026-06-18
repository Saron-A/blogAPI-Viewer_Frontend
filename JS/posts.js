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

  const publishedSection = document.createElement("div");
  const unpublishedSection = document.createElement("div");

  const publishedTitle = document.createElement("h2");
  publishedTitle.textContent = "Published Posts";

  const unpublishedTitle = document.createElement("h2");
  unpublishedTitle.textContent = "Unpublished Posts";

  publishedSection.appendChild(publishedTitle);
  unpublishedSection.appendChild(unpublishedTitle);

  if (posts.length === 0) {
    const p = document.createElement("h3");
    p.textContent = "No posts yet.";
    postsDiv.appendChild(p);
  } else {
    posts.forEach((post) => {
      const postCard = document.createElement("div");

      const titleH = document.createElement("h3");
      titleH.textContent = post.title;

      const authorH = document.createElement("h4");
      authorH.textContent = post.author;

      const timeH = document.createElement("p");
      timeH.textContent = post.created_at;

      postCard.append(titleH, authorH, timeH);

      if (post.is_published) {
        publishedSection.appendChild(postCard);
      } else {
        unpublishedSection.appendChild(postCard);
      }
      postCard.addEventListener("click", () => {
        // open a page dynamically and show the body as well
        console.log(post);
        console.log(post.id);
        window.location.href = `./post.html?postId=${post.id}`;
      });
    });
  }
  postsDiv.append(publishedSection, unpublishedSection);
};
