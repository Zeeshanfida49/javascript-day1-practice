"use strict";

// Format amounts with two decimal places.
function formatMoney(amount) {
  return `PKR ${amount.toFixed(2)}`;
}

// Add a label and value to a description list.
function addSummaryRow(list, label, value, isTotal = false) {
  const term = document.createElement("dt");
  const description = document.createElement("dd");

  term.textContent = label;
  description.textContent = value;

  if (isTotal) {
    term.classList.add("total-label");
    description.classList.add("total-value");
  }

  list.append(term, description);
}

// Task 1: Introduction and variable data types.
const introForm = document.getElementById("intro-form");

introForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("full-name").value.trim();
  const age = Number(document.getElementById("age").value);
  const city = document.getElementById("city").value.trim();
  const skill = document.getElementById("skill").value.trim();
  const isStudent = document.getElementById("student").value === "true";

  const introText = document.getElementById("intro-text");
  const typeList = document.getElementById("type-list");

  if (!name || !city || !skill) {
    introText.textContent = "Please enter a name, city, and skill.";
    typeList.replaceChildren();
    document.getElementById("intro-result").hidden = false;
    return;
  }

  const introduction =
    `My name is ${name}. I am ${age} years old and live in ${city}. ` +
    `My student status is ${isStudent}, and my skill is ${skill}.`;

  introText.textContent = introduction;
  typeList.replaceChildren();

  addSummaryRow(typeList, "Name", typeof name);
  addSummaryRow(typeList, "Age", typeof age);
  addSummaryRow(typeList, "City", typeof city);
  addSummaryRow(typeList, "Student Status", typeof isStudent);
  addSummaryRow(typeList, "Skill", typeof skill);

  document.getElementById("intro-result").hidden = false;

  console.log(introduction);
  console.log("Name type:", typeof name);
  console.log("Age type:", typeof age);
  console.log("City type:", typeof city);
  console.log("Student status type:", typeof isStudent);
  console.log("Skill type:", typeof skill);
});

// Task 2: Three-item shop bill calculator.
const billForm = document.getElementById("bill-form");

billForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const notebookPrice =
    Number(document.getElementById("notebook-price").value);

  const notebookQuantity =
    Number(document.getElementById("notebook-quantity").value);

  const penPrice =
    Number(document.getElementById("pen-price").value);

  const penQuantity =
    Number(document.getElementById("pen-quantity").value);

  const bagPrice =
    Number(document.getElementById("bag-price").value);

  const bagQuantity =
    Number(document.getElementById("bag-quantity").value);

  const notebookTotal = notebookPrice * notebookQuantity;
  const penTotal = penPrice * penQuantity;
  const bagTotal = bagPrice * bagQuantity;

  const subtotal = notebookTotal + penTotal + bagTotal;
  const discount = subtotal * 5 / 100;
  const amountAfterDiscount = subtotal - discount;

  // Apply GST to the discounted subtotal.
  const gst = amountAfterDiscount * 17 / 100;
  const finalTotal = amountAfterDiscount + gst;

  const amounts = [
    notebookTotal,
    penTotal,
    bagTotal,
    subtotal,
    discount,
    amountAfterDiscount,
    gst,
    finalTotal
  ];

  if (!amounts.every(Number.isFinite)) {
    document.getElementById("bill-result").hidden = true;
    alert("The entered amounts are too large. Please use smaller values.");
    return;
  }

  const billItems = document.getElementById("bill-items");
  const billSummary = document.getElementById("bill-summary");

  billItems.replaceChildren();
  billSummary.replaceChildren();

  function addBillItem(name, price, quantity, total) {
    const row = document.createElement("tr");

    const values = [
      name,
      formatMoney(price),
      String(quantity),
      formatMoney(total)
    ];

    values.forEach(function (value) {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.append(cell);
    });

    billItems.append(row);
  }

  addBillItem(
    "Notebook",
    notebookPrice,
    notebookQuantity,
    notebookTotal
  );

  addBillItem("Pen", penPrice, penQuantity, penTotal);
  addBillItem("Bag", bagPrice, bagQuantity, bagTotal);

  addSummaryRow(billSummary, "Subtotal", formatMoney(subtotal));
  addSummaryRow(billSummary, "Discount (5%)", `− ${formatMoney(discount)}`);

  addSummaryRow(
    billSummary,
    "Amount After Discount",
    formatMoney(amountAfterDiscount)
  );

  addSummaryRow(billSummary, "GST (17%)", formatMoney(gst));
  addSummaryRow(billSummary, "Final Total", formatMoney(finalTotal), true);

  document.getElementById("bill-result").hidden = false;

  console.log(`
===== CUSTOMER BILL =====
Notebook: ${notebookQuantity} × ${formatMoney(notebookPrice)} = ${formatMoney(notebookTotal)}
Pen: ${penQuantity} × ${formatMoney(penPrice)} = ${formatMoney(penTotal)}
Bag: ${bagQuantity} × ${formatMoney(bagPrice)} = ${formatMoney(bagTotal)}

Subtotal: ${formatMoney(subtotal)}
Discount (5%): ${formatMoney(discount)}
Amount After Discount: ${formatMoney(amountAfterDiscount)}
GST (17%): ${formatMoney(gst)}
Final Total: ${formatMoney(finalTotal)}
=========================
  `);
});

// Task 3A: Celsius to Fahrenheit converter.
const temperatureForm = document.getElementById("temperature-form");

temperatureForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const celsius = Number(document.getElementById("celsius").value);
  const fahrenheit = celsius * 9 / 5 + 32;
  const result = document.getElementById("temperature-result");

  if (!Number.isFinite(fahrenheit)) {
    result.textContent = "Please enter a smaller, finite temperature.";
    return;
  }

  result.textContent = `${celsius}°C = ${fahrenheit.toFixed(2)}°F`;
  console.log(result.textContent);
});

// Task 3B: Email string methods.
const emailForm = document.getElementById("email-form");

emailForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const originalEmail = document.getElementById("email-input").value;
  const cleanedEmail = originalEmail.trim().toLowerCase();

  const hasAtSymbol = cleanedEmail.includes("@");
  const endsWithDotCom = cleanedEmail.endsWith(".com");

  const result = document.getElementById("email-result");
  result.replaceChildren();

  const messages = [
    `Original: "${originalEmail}"`,
    `Cleaned: "${cleanedEmail}"`,
    `Contains @: ${hasAtSymbol}`,
    `Ends with .com: ${endsWithDotCom}`
  ];

  messages.forEach(function (message) {
    const paragraph = document.createElement("p");
    paragraph.textContent = message;
    result.append(paragraph);
  });

  console.log(messages.join("\n"));
});

// Bonus: Convert input to a number and calculate its square.
const squareForm = document.getElementById("square-form");

squareForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const userInput = document.getElementById("square-input").value;
  const number = Number(userInput);
  const square = number * number;
  const result = document.getElementById("square-result");

  if (userInput.trim() === "" || !Number.isFinite(square)) {
    result.textContent = "Please enter a finite number with a finite square.";
    return;
  }

  result.textContent = `${number} × ${number} = ${square}`;
  console.log(result.textContent);
});