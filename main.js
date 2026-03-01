/* ===== PROJECT DATABASE ===== */

const projects = {

  livestock: {
    title: "🐄 Livestock Tracker",
    tech: "React.js, MongoDB, IoT",
    image: "/images/livestock.png",
    description: "Tracks animal weight using IoT and MongoDB.",
    features: [
      "Detect weight loss early",
      "Monitor health via live data",
      "Streamlined via IoT sensors"
    ],
    github: "https://github.com/Basuckulakarni/Livestock-Management-System"
  },

  parking: {
    title: "🚗 Smart Parking System",
    tech: "IoT, ThingSpeak, Embedded Systems",
    image: "images/smartparking.png",
    description: "Real-time parking data with IoT.",
    features: [
      "Live slot availability",
      "ThingSpeak dashboard",
      "Mobile & Web compatible"
    ],
    github: "#"
  },

  rental: {
    title: "🏍️ Rental Vehicle Booking System",
    tech: "Flask, SQL, Bootstrap",
    image: "images/rentalvehicle.PNG",
    description: "Book vehicles online with real-time availability.",
    features: [
      "Vehicle card display",
      "Secure booking form",
      "Admin panel"
    ],
    github: "https://github.com/Basuckulakarni/Rental_Vehicle"
  },

  gym: {
    title: "💪 Gym Management App",
    tech: "Python, Flask, Pandas",
    image: "images/gym1.PNG",
    description: "Manage gym members and payments.",
    features: [
      "Member registration",
      "Attendance tracking",
      "Excel reports"
    ],
    github: "https://github.com/Basuckulakarni/Gym_app"
  }
};


/* ===== PAGE EVENTS ===== */

document.addEventListener("DOMContentLoaded", () => {

  /* ===== EMAIL JS ===== */

  if (typeof emailjs !== "undefined") {
    emailjs.init("h2uo0veNdKltVlXwP");
  }

  const form = document.getElementById("contact-form");
  const msg = document.getElementById("form-message");

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();

      const data = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value
      };

      emailjs.send("service_lzc4uqb", "template_jgall8c", data)
        .then(() => {
          msg.textContent = "✅ Message Sent Successfully";
          form.reset();
        })
        .catch(() => {
          msg.textContent = "❌ Failed to send";
        });
    });
  }


  /* ========= MESSAGE SUGGESTIONS ========= */

  const textarea = document.getElementById("message");
  const suggestions = document.getElementById("suggestions");

  if (textarea && suggestions) {

    // show when textarea clicked
    textarea.addEventListener("focus", () => {
      suggestions.style.display = "block";
    });

    // click suggestion → fill message
    document.querySelectorAll(".suggestion-item").forEach(item => {
      item.addEventListener("click", () => {
        textarea.value = item.textContent;
        suggestions.style.display = "none";
      });
    });

    // hide when clicking outside
    document.addEventListener("click", (e) => {
      if (!textarea.contains(e.target) &&
        !suggestions.contains(e.target)) {
        suggestions.style.display = "none";
      }
    });
  }

});


/* ===== PROJECT MODAL ===== */

function openProject(id) {

  const project = projects[id];
  const modal = document.getElementById("projectModal");
  const container = document.getElementById("projectDetails");

  if (!project) return;

  container.innerHTML = `
        <h1>${project.title}</h1>

        <p><strong>Tech Stack:</strong> ${project.tech}</p>

        <img src="${project.image}" class="project-image">

        <p>${project.description}</p>

        <ul>
            ${project.features.map(f => `<li>${f}</li>`).join("")}
        </ul>

        <a href="${project.github}" target="_blank" class="resume-btn">
            🔗 View Code
        </a>
    `;

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeProject() {
  document.getElementById("projectModal").style.display = "none";
  document.body.style.overflow = "auto";
}

window.addEventListener("click", (e) => {
  const modal = document.getElementById("projectModal");
  if (e.target === modal) {
    closeProject();
  }
});
