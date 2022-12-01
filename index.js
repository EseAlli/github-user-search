const searchBtn = document.querySelector(".search-btn");
const form = document.querySelector(".search-bar");
const bioText = document.querySelector(".bio");
const img = Array.from(document.querySelectorAll(".avatar"));
const handle = document.querySelector(".handle");
const followersText = document.querySelector(".followers");
const followingText = document.querySelector(".following");
const repos = document.querySelector(".repos");
const twitter = document.querySelector(".twitter");
const locationText = document.querySelector(".location");
const companyText = document.querySelector(".company");
const website = document.querySelector(".website");
const user = document.querySelector(".name");
const dateJoined = document.querySelector(".date-joined");
const results = document.querySelector("small");
const darkCtrl = document.querySelector(".dark");
const lightCtrl = document.querySelector(".light");

document.onload = queryData("octocat");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = document.querySelector(".search-query").value;
  queryData(query);
});

function queryData(query) {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    const { message } = JSON.parse(this.responseText);
    if (message) {
      results.style.display = "block";
    } else {
      results.style.display = "none";
      const {
        bio,
        avatar_url,
        public_repos,
        twitter_username,
        followers,
        following,
        created_at,
        name,
        login,
        company,
        location,
        blog,
      } = JSON.parse(this.responseText);
      let date = new Date(created_at);
      bio && (bioText.innerHTML = bio);
      handle.innerHTML = `@${login}`;
      repos.innerHTML = public_repos;
      followersText.innerHTML = followers;
      followingText.innerHTML = following;
      twitter.lastChild.nodeValue = twitter_username
        ? twitter_username
        : "Not Available";
      !twitter_username && twitter.classList.add("inactive");
      twitter_username && twitter.classList.remove("inactive");
      locationText.lastChild.nodeValue = location ? location : "Not Available";
      !location && locationText.classList.add("inactive");
      location && locationText.classList.remove("inactive");
      companyText.lastChild.nodeValue = company ? company : "Not Available";
      !company && companyText.classList.add("inactive");
      company && companyText.classList.remove("inactive");
      website.querySelector("a").innerHTML = blog;
      website.querySelector("a").href = blog;

      user.firstChild.nodeValue = name;
      dateJoined.innerHTML = `Joined ${date
        .toDateString()
        .split(" ")
        .slice(1)
        .join(" ")}`;
      for (i in img) {
        img[i].src = avatar_url;
      }
    }
  };
  xhttp.open("GET", `https://api.github.com/users/${query}`);
  xhttp.getResponseHeader("Content-type", "application/json");
  xhttp.send();
}

lightCtrl.addEventListener("click", function () {
  document.body.classList.replace("dark-mode", "light-mode");
  lightCtrl.style.display = "none";
  darkCtrl.style.display = "block";
});

darkCtrl.addEventListener("click", function () {
  document.body.classList.replace("light-mode", "dark-mode");
  darkCtrl.style.display = "none";
  lightCtrl.style.display = "block";
});
