// get token from local storage and pass it to the backend
// get user information

const token = localStorage.getItem("token");

const getUserInfo = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.data); // returns username and email
    const user = res.data;
    createElements(user);
  } catch (err) {
    console.error(err);
  }
};

getUserInfo();

const createElements = (user) => {
  const userDiv = document.querySelector(".userDiv");

  const headerH = document.createElement("h1");
  headerH.textContent = `Welcome to Your Profile 👋, ${user.username}!`;

  const usernameP = document.createElement("p");
  usernameP.textContent = `Username: ${user.username}`;

  const emailP = document.createElement("p");
  emailP.textContent = `Email: ${user.email}`;

  userDiv.append(headerH, usernameP, emailP);
};
