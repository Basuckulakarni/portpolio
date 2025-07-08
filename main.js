// EmailJS integration for contact form
// Make sure EmailJS SDK is loaded via CDN in your HTML before this script:
// <script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>
document.addEventListener('DOMContentLoaded', function () {
    if (typeof emailjs !== 'undefined') {
        emailjs.init('h2uo0veNdKltVlXwP'); // Your EmailJS public key
    }
    document.getElementById('contact-form').onsubmit = function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        if (typeof emailjs === 'undefined') {
            document.getElementById('form-message').textContent = '❌ EmailJS not loaded. Please check your internet connection.';
            return;
        }
        emailjs.send('service_lzc4uqb', 'template_jgall8c', {
            name: name,
            email: email,
            message: message
        })
        .then(function () {
            document.getElementById('form-message').textContent = '✅ Thank you! Your message has been sent.';
            document.getElementById('contact-form').reset();
        }, function (error) {
            document.getElementById('form-message').textContent = '❌ Failed to send message. Please try again later.';
            console.error('EmailJS Error:', error);
        });
    };
});

// Mars effect background animation
(function () {
    const canvas = document.getElementById('bg-graphics');
    const ctx = canvas.getContext('2d');
    let w, h, marbles;
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
    function createMarbles() {
        const count = Math.max(12, Math.floor(w / 90));
        marbles = Array.from({ length: count }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            r: 30 + Math.random() * 40,
            dx: (Math.random() - 0.5) * 0.5,
            dy: (Math.random() - 0.5) * 0.5,
            color: randomColor(),
            shadow: Math.random() > 0.5
        }));
    }
    function drawMarble(m) {
        // Draw main marble
        ctx.save();
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, 2 * Math.PI);
        ctx.fillStyle = m.color;
        ctx.shadowColor = m.shadow ? '#232946' : m.color;
        ctx.shadowBlur = m.shadow ? 30 : 10;
        ctx.globalAlpha = 0.22;
        ctx.fill();
        ctx.restore();
        // Draw highlight
        ctx.save();
        ctx.beginPath();
        ctx.arc(m.x - m.r / 3, m.y - m.r / 3, m.r / 4, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.globalAlpha = 0.08;
        ctx.fill();
        ctx.restore();
    }
    function animate() {
        ctx.clearRect(0, 0, w, h);
        for (const m of marbles) {
            drawMarble(m);
            m.x += m.dx;
            m.y += m.dy;
            if (m.x < -m.r) m.x = w + m.r;
            if (m.x > w + m.r) m.x = -m.r;
            if (m.y < -m.r) m.y = h + m.r;
            if (m.y > h + m.r) m.y = -m.r;
        }
        requestAnimationFrame(animate);
    }
    window.addEventListener('resize', () => {
        resize();
        createMarbles();
    });
    resize();
    createMarbles();
    animate();
})();

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
