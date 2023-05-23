const form = document.getElementById("loginForm");
const url = "/auth";
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));
  console.log(obj);

  fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(obj),
  })
    .then((response) => response.json())
    .then((data) => {
      const cookie = document.cookie;
      console.log(data), console.log(cookie);
    })
    .catch((error) => console.log(error));
});
