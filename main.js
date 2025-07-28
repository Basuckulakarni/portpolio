document.addEventListener("DOMContentLoaded", function () {
  if (typeof emailjs !== "undefined") {
    emailjs.init("h2uo0veNdKltVlXwP");
  }

  const form = document.getElementById("contact-form");
  const statusMessage = document.getElementById("form-message");

  form.onsubmit = function (e) {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      statusMessage.textContent = "⚠️ Please fill out all fields.";
      return;
    }

    if (typeof emailjs === "undefined") {
      statusMessage.textContent = "❌ EmailJS not loaded. Check connection.";
      return;
    }

    emailjs.send("service_lzc4uqb", "template_jgall8c", { name, email, message, reply_to: email }).then(() => {
      statusMessage.textContent = "✅ Thank you! Your message has been sent.";
      form.reset();
      emailjs.send("service_lzc4uqb", "template_93ilvgg", { to_name: name, to_email: email });
    }).catch(error => {
      statusMessage.textContent = "❌ Failed to send message.";
      console.error("EmailJS Error:", error);
    });
  };

  const textarea = document.getElementById("message");
  const suggestions = document.getElementById("suggestions");

  textarea.addEventListener("click", () => {
    suggestions.style.display = "block";
  });

  document.querySelectorAll(".suggestion-item").forEach(item => {
    item.addEventListener("click", () => {
      textarea.value = item.textContent;
      suggestions.style.display = "none";
    });
  });

  document.addEventListener("click", (e) => {
    if (!textarea.contains(e.target) && !suggestions.contains(e.target)) {
      suggestions.style.display = "none";
    }
  });
});
