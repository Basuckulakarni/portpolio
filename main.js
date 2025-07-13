document.addEventListener('DOMContentLoaded', function () {
    if (typeof emailjs !== 'undefined') {
        emailjs.init('h2uo0veNdKltVlXwP'); // Your EmailJS public key
    }

    document.getElementById('contact-form').onsubmit = function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        const statusMessage = document.getElementById('form-message');

        if (!name || !email || !message) {
            statusMessage.textContent = '⚠️ Please fill out all fields.';
            return;
        }

        if (typeof emailjs === 'undefined') {
            statusMessage.textContent = '❌ EmailJS not loaded. Please check your internet connection.';
            return;
        }

        // 1️⃣ Send to yourself
        emailjs.send('service_lzc4uqb', 'template_jgall8c', {
            name: name,
            email: email,
            message: message,
            reply_to: email
        }).then(function () {
            statusMessage.textContent = '✅ Thank you! Your message has been sent.';
            document.getElementById('contact-form').reset();

            // 2️⃣ Auto-reply to user
            emailjs.send('service_lzc4uqb', 'template_93ilvgg', {
                to_name: name,
                to_email: email
            });
        }, function (error) {
            statusMessage.textContent = '❌ Failed to send message. Please try again later.';
            console.error('EmailJS Error:', error);
        });
    };
});


// ...existing code...

// Animated background graphics (colorful floating circles)
(function () {
    const canvas = document.getElementById('bg-graphics');
    const ctx = canvas.getContext('2d');
    let w, h, circles;
    function resize() {
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;
    }
    function randomColor() {
        const colors = ['#eebbc3', '#f92545', '#232946', '#e0e7ff', '#b8c1ec'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    function createCircles() {
        const count = Math.max(18, Math.floor(w / 60));
        circles = Array.from({ length: count }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            r: 18 + Math.random() * 32,
            dx: (Math.random() - 0.5) * 0.7,
            dy: (Math.random() - 0.5) * 0.7,
            color: randomColor(),
            alpha: 0.18 + Math.random() * 0.18
        }));
    }
    function animate() {
        ctx.clearRect(0, 0, w, h);
        for (const c of circles) {
            ctx.globalAlpha = c.alpha;
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
            ctx.fillStyle = c.color;
            ctx.fill();
            c.x += c.dx;
            c.y += c.dy;
            if (c.x < -c.r) c.x = w + c.r;
            if (c.x > w + c.r) c.x = -c.r;
            if (c.y < -c.r) c.y = h + c.r;
            if (c.y > h + c.r) c.y = -c.r;
        }
        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
    }
    window.addEventListener('resize', () => {
        resize();
        createCircles();
    });
    resize();
    createCircles();
    animate();
})();

//project popup
function showPopup(event) {
    event.preventDefault(); // Stop the link from opening
    alert("Code is currently not available.");
}


// Suggestions logic for contact form
document.addEventListener('DOMContentLoaded', function () {
    const textarea = document.getElementById("message");
    const suggestions = document.getElementById("suggestions");
    if (!textarea || !suggestions) return;

    textarea.addEventListener("click", (e) => {
        suggestions.style.display = "block";
        e.stopPropagation();
    });

    suggestions.querySelectorAll(".suggestion-item").forEach(item => {
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
