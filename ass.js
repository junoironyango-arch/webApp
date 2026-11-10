/* =========================================================
   ass.js – External JavaScript for the Order page
   On "mouseover" of the order button it shows:
     a) the buyer's name in UPPERCASE
     b) the number of characters in the name
     c) the total amount to be paid
   Also validates the form before the order is accepted.
   ========================================================= */

var orderBtn  = document.getElementById("orderBtn");
var nameInput = document.getElementById("buyerName");
var addrInput = document.getElementById("address");
var resultBox = document.getElementById("result");
var orderForm = document.getElementById("orderForm");
var quantityInputs = document.querySelectorAll("input[type='number']");

/* Total = sum of (unit price x quantity) for every product */
function calculateTotal() {
  var total = 0;
  for (var i = 0; i < quantityInputs.length; i++) {
    var price = Number(quantityInputs[i].getAttribute("data-price"));
    var qty   = Math.floor(Number(quantityInputs[i].value));
    if (qty > 0) {
      total += price * qty;
    }
  }
  return total;
}

/* Returns an error message, or "" if the form is valid */
function validateOrder() {
  var name = nameInput.value.trim();

  if (name === "") {
    return "Please enter the buyer's name.";
  }
  if (!/^[A-Za-z\s.'-]+$/.test(name)) {
    return "The name should contain letters only.";
  }
  if (addrInput.value.trim().length < 5) {
    return "Please enter a delivery address.";
  }
  if (calculateTotal() === 0) {
    return "Please select a quantity of at least 1 for one product.";
  }
  return "";
}

/* Runs when the mouse moves over the button */
function showOrderSummary() {
  var name = nameInput.value.trim();

  if (name === "") {
    resultBox.innerHTML = "<strong style='color:#d62828;'>Please enter the buyer's name first.</strong>";
    return;
  }

  var upperName   = name.toUpperCase();  // a) name in upper case
  var charCount   = name.length;         // b) number of characters
  var totalAmount = calculateTotal();    // c) total amount to pay

  resultBox.innerHTML =
    "<p><strong>Buyer's Name (uppercase):</strong> " + upperName + "</p>" +
    "<p><strong>Number of characters in name:</strong> " + charCount + "</p>" +
    "<p><strong>Total amount to pay:</strong> UGX " + totalAmount.toLocaleString() + "</p>";
}

orderBtn.addEventListener("mouseover", showOrderSummary);

/* Validate when the order is submitted */
orderForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var problem = validateOrder();
  if (problem !== "") {
    resultBox.innerHTML = "<strong style='color:#d62828;'>" + problem + "</strong>";
    return;
  }

  showOrderSummary();
  alert("Thank you, " + nameInput.value.trim() + "! Your order has been received.");
});