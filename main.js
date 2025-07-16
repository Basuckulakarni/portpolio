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

  const canvas = document.getElementById("bg-graphics");
  const ctx = canvas.getContext("2d");
  let w, h, shapes;

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
  }

  function randomColor() {
    const colors = ['#f92545', '#eebbc3', '#b8c1ec', '#232946', '#e0e7ff'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function createShapes() {
    const count = Math.max(20, Math.floor(w / 60));
    shapes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 20 + Math.random() * 30,
      dx: (Math.random() - 0.5) * 0.6,
      dy: (Math.random() - 0.5) * 0.6,
      color: randomColor(),
      alpha: 0.1 + Math.random() * 0.2
    }));
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    for (const s of shapes) {
      ctx.globalAlpha = s.alpha;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
      ctx.fillStyle = s.color;
      ctx.fill();
      s.x += s.dx;
      s.y += s.dy;
      if (s.x < -s.r) s.x = w + s.r;
      if (s.x > w + s.r) s.x = -s.r;
      if (s.y < -s.r) s.y = h + s.r;
      if (s.y > h + s.r) s.y = -s.r;
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", () => {
    resize();
    createShapes();
  });
  resize();
  createShapes();
  animate();

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
