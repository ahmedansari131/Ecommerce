export function sendingProductId(url) {
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      console.log("Status " + response.status);
      return response.json();
    })
    .then(function (data) {
      console.log("I am in data");
      console.log(data.message);
    })
    .catch(function (error) {
      console.log(error);
    });
}