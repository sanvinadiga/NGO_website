const adminPassword = "admin123";


// Load events from local storage or initialize with sample data
let events = JSON.parse(localStorage.getItem('events')) || [
 { title: "Charity Run", date: "2024-09-15", description: "Join us for a charity run to support local communities.", image: "" },
 { title: "Fundraising Dinner", date: "2024-10-10", description: "A special dinner event to raise funds for our cause.", image: "" }
];


document.addEventListener("DOMContentLoaded", () => {
 displayEvents();
});


function displayEvents() {
 const eventsList = document.getElementById("events-list");
 eventsList.innerHTML = "";
 const currentDate = new Date().toISOString().split("T")[0];
 events.forEach((event, index) => {
   if (event.date >= currentDate) {
     const eventElement = document.createElement("div");
     eventElement.className = "col-md-4";
     eventElement.innerHTML = `
       <div class="card">
         ${event.image ? `<img src="${event.image}" class="card-img-top" alt="${event.title} Image">` : ""}
         <div class="date-pos">${new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</div>
         <div class="card-body">
           <h5 class="card-title">${event.title}</h5>
           <p class="card-text">${event.description}</p>
         </div>
       </div>
     `;
     eventsList.appendChild(eventElement);
   }
 });
}


function toggleAdminPanel() {
 const adminPanel = document.getElementById("admin-panel");
 adminPanel.style.display = adminPanel.style.display === "none" ? "block" : "none";
}


function addEvent() {
 const password = document.getElementById("admin-password").value;
 if (password !== adminPassword) {
   alert("Incorrect Password!");
   return;
 }


 const title = document.getElementById("event-title").value;
 const date = document.getElementById("event-date").value;
 const description = document.getElementById("event-description").value;
 const imageFile = document.getElementById("event-image").files[0];


 if (title === "" || date === "" || description === "") {
   alert("Please fill in all fields!");
   return;
 }


 let image = "";
 if (imageFile) {
   const reader = new FileReader();
   reader.onload = function (e) {
     image = e.target.result;
     events.push({ title, date, description, image });
     updateLocalStorage();
     displayEvents();
   };
   reader.readAsDataURL(imageFile);
 } else {
   events.push({ title, date, description, image });
   updateLocalStorage();
   displayEvents();
 }


 // Clear inputs
 document.getElementById("admin-password").value = "";
 document.getElementById("event-title").value = "";
 document.getElementById("event-date").value = "";
 document.getElementById("event-description").value = "";
 document.getElementById("event-image").value = "";
 toggleAdminPanel();
}


function clearPastEvents() {
 const password = document.getElementById("admin-password").value;
 if (password !== adminPassword) {
   alert("Incorrect Password!");
   return;
 }


 const currentDate = new Date().toISOString().split("T")[0];
 events = events.filter(event => event.date >= currentDate);
 updateLocalStorage();
 displayEvents();
 alert("Past events have been cleared!");
}


function updateLocalStorage() {
 localStorage.setItem('events', JSON.stringify(events));
}



