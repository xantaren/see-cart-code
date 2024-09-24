function getCountryCode(url) {
  const match = url.match(/https:\/\/.*?\.samsung\.com\/([^\/]+)/);
  return match ? match[1] : null;
}

function fetchCartCode(countryCode) {
  if (!countryCode || countryCode.length != 2) {
    console.log("Invalid country code:", countryCode);
    return;
  }
  const apiUrl = `https://${window.location.hostname}/tokocommercewebservices/v2/${countryCode}/users/current/carts/current?fields=DEFAULT`;
  console.log(apiUrl);
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const cartCode = data.code;
      if (cartCode) {
        displayCartCode(cartCode);
      }
    })
    .catch(
      // do nothing
      );
}

function displayCartCode(cartCode) {
  const displayElement = document.createElement("div");
  displayElement.style.cssText = `
    position: fixed;
    bottom: 5px;
    left: 5px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    z-index: 9999;
    display: flex;
    align-items: center;
  `;

  const textElement = document.createElement("span");
  textElement.textContent = `${cartCode}`;
  textElement.style.flex = "1"; // Allow the text to take up available space

  const closeButton = document.createElement("span");
  closeButton.textContent = "✖"; // This is the small "X" for closing
  closeButton.style.cssText = `
    margin-left: 10px;
    cursor: pointer;
    font-size: 16px;
  `;

  // Add click event listener to the close button to hide the displayElement
  closeButton.addEventListener("click", () => {
    displayElement.style.display = "none"; // Hide the element
  });

  // Append the text and the close button to the display element
  displayElement.appendChild(textElement);
  displayElement.appendChild(closeButton);

  document.body.appendChild(displayElement);
}

if (window.location.hostname.includes('samsung.com')) {
  const countryCode = getCountryCode(window.location.href);
  if (countryCode) {
    fetchCartCode(countryCode);
  }
}