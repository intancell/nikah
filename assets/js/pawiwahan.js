// Get that hamburger menu cookin' //
var modal = document.getElementById("modalWeddingGift");
var welcomeModal = document.getElementById("welcomeModal");
var containerGallery = document.getElementById("containerGallery");
var containerClosing = document.getElementById("containerClosing");
var ythLabel = document.getElementById("yth");
var toLabel = document.getElementById("to");
var inviteLabel = document.getElementById("invite");
var myAudio = document.getElementById("my_audio");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if (urlParams.get("to") != null) {
  toLabel.innerHTML = urlParams.get("to");
} else {
  ythLabel.innerHTML = "";
  inviteLabel.innerHTML = "";
}

document.addEventListener("DOMContentLoaded", function () {
  //open welcome modal
  welcomeModal.style.display = "block";
  // if (urlParams.get('to') != null) {
  // }

  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll(".navbar-burger"), 0);
  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener("click", function () {
        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);
        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});
function closeWelcomeModal() {
  welcomeModal.style.display = "none";
  myAudio.play()
}

// play music in background
function toggleAudio(value) {
  return !value.checked ? myAudio.play() : myAudio.pause();
}

// scroll totop
var btn = $('#button');

$(window).scroll(function() {
  if ($(window).scrollTop() > 500) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '500');
});
function copyToClipboard(element) {
  var value = element.innerText;
  var popup1 = document.getElementById("popupCopy1");
  var popup2 = document.getElementById("popupCopy2");
  element.id == "yeak" ? popup1.classList.toggle("show") : popup2.classList.toggle("show");

  navigator.clipboard
    .writeText(value)
    .then(() => {
      console.log("Text copied to clipboard...");
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
}
// copy to clipboard
const textElement = document.getElementById("text");
const copyButton = document.getElementById("copy");

const copyText = (e) => {
  window.getSelection().selectAllChildren(textElement);
  document.execCommand("copy");
  e.target.setAttribute("tooltip", "Copied! ✅");
};

const resetTooltip = (e) => {
  e.target.setAttribute("tooltip", "Copy to clipboard");
};

copyButton.addEventListener("click", (e) => copyText(e));
copyButton.addEventListener("mouseover", (e) => resetTooltip(e));

// Cpy
const copyButtons = document.querySelectorAll(".contact__copyBtn");

const successfullyCopy = (button) => {
  button.textContent = "Copied";
  button.disabled = true;
  
  setTimeout(() => {
    button.textContent = "Copy";
    button.disabled = false;
  }, 1500);
}

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const parentEl = button.parentElement;
    const text = parentEl.querySelector("input.contact__text");
    
    try {
      await navigator.clipboard.writeText(text.value);
      
      successfullyCopy(button);
    } catch {
      text.select();
      document.execCommand("copy");
      
      text.setSelectionRange(0, 0);
      text.blur();
      
      successfullyCopy(button);
    }
  });
});
//

const c = document.querySelector('#c');
const ctx = c.getContext('2d');

c.style.width = (c.width = window.innerWidth);
c.style.height = (c.height = window.innerHeight);

const mouse = { x: c.width / 2, y: c.height / 2 };

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

const step = 10;
const camera = {
  x: 0,
  y: 0,
}

const maxVelocity = 20

let brances = 15;

const getPathObject = (index, value) => {
  const path = []
  path[index] = value
  
  return ({
    path,
    velocity: {
      x: 0,
      y: 0,
    },
    state: {
      isAlive: true,
      branches: 5,
    }
  })
}

const paths = [
  getPathObject(0, c.height / 2)
]

const targets = [
  mouse
]

const palette = [
  // '#001219',
  '#005f73',
  '#0a9396',
  '#94d2bd',
  '#e9d8a6',
  '#ee9b00',
  '#ca6702',
  '#bb3e03',
  '#ae2012',
  '#9b2226',
]

const animate = (time) => {
  requestAnimationFrame(animate);
  
  const getXY = (x, y, i, l, p) => {
    return [
      x + Math.sin(l) * brances,
      y + (
            (Math.sin((camera.x + x) / 100) * 100) 
          + (Math.sin((x + l + time) / 1000) * 50) 
          + (Math.cos(i + l + x / (100 * Math.sin(i))) * 1)
          )
    ]
  }
  
  const drawLeave = (x, y, size, angle) => {
      const half = size / 2
      ctx.beginPath();
        
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(angle - Math.PI / 8) * half, y + Math.sin(angle - Math.PI / 8) * half);
      ctx.lineTo(x + Math.cos(angle) * size, y + Math.sin(angle) * size);
      ctx.lineTo(x + Math.cos(angle + Math.PI / 8) * half, y + Math.sin(angle + Math.PI / 8) * half);
      ctx.lineTo(x, y);

      ctx.stroke()
    }
  
  const gradient = ctx.createLinearGradient(0, 0, c.width, c.height)
  
  // exit
  
  for (let p = 0; p < palette.length; p++) {
    const index = Math.floor(p + time / 1000) % palette.length
    const stop = ((p / palette.length) + (time / 3000)) % 1
    gradient.addColorStop(1 - stop, palette[index])
  }
  
  ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
  ctx.fillRect(0, 0, c.width, c.height);
  
  ctx.fillStyle = 'rgba(0, 0, 0, 1)'
  ctx.fillText(paths.length, 100, 100)
  
  for (let p = 0; p < paths.length; p++) {
    const { path, velocity, state } = paths[p];
    const target = targets[p];
    
    const startIndex = Math.floor(camera.x / step);
    const endIndex = startIndex + Math.floor(Math.min(target.x, c.width * 0.8) / step);
    
    ctx.lineWidth = 2;
    ctx.strokeStyle = gradient;
    ctx.fillStyle = gradient;
    
    for (let l = 0; l < state.branches; l++) {
      ctx.beginPath();
      ctx.moveTo(0, path[startIndex]);

      for (let i = startIndex + 1; i < path.length; i++) {
        const y = path[i] + l;
        const x = (i * step) - camera.x;
        ctx.lineTo(...getXY(x, y, i, l, p));
      }

      ctx.stroke();
    }
    
    if (endIndex > path.length && state.isAlive) {
      const lastY = path.at(-1)
      
      if (Math.abs(Math.abs(target.y) - Math.abs(lastY)) > maxVelocity * 2) {
        if (target.y > lastY) {
          velocity.y = Math.min(maxVelocity, velocity.y + 0.5)
        } else {
          velocity.y = Math.max(-maxVelocity, velocity.y - 0.5)
        }
      } else {
        if (target.y > lastY) {
          velocity.y = (target.y - lastY) / 2
        } else {
          velocity.y = -(lastY - target.y) / 2
        }
      }
      
      path.push(
        Math.min(lastY + maxVelocity, Math.max(lastY - maxVelocity, lastY + velocity.y))
      );
    } else {
      if (p !== 0) {
        state.isAlive = false
      }
    }
    
    
    if (!state.isAlive) {
      if (path.length < Math.floor(camera.x / step)) {
        paths.splice(p, 1);
        targets.splice(p, 1);
      } else {
        const left = (path.length * step) - camera.x;
        const top = path.at(-1);
        
        const [x, y] = getXY(left, top, path.length - 1, 0, p)
        const anlgeStep = (Math.PI / 4)
        const startAngle = (Math.PI * 2) + Math.sin(left / 100)
        
        for (let l = -state.branches / 2; l < state.branches / 2; l++) {
          
          drawLeave(x, y, 40, startAngle + (anlgeStep * l))
        }
      }
    }
  }
  
  if (Math.floor(camera.x / 100) > paths.length && paths.length < 10) {
    
    const start = Math.floor((camera.x + (mouse.x / 2)) / step)
    const index = 0
    const newPath = getPathObject(start, paths[index].path.at(start))
    
    newPath.state.branches = 1 + 3 * Math.random()
    
    paths.push(newPath)
    targets.push({
      x: (c.width * Math.random() * 1.5),
      y: c.height * Math.random()
    })
  }
  
  // fish

  const fishCount = 20;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.fillStyle = "rgba(255, 255, 255, 0.01)";

  for (let i = 0; i < fishCount; i++) {
    const bx = c.width * ((i % 10) / 2);
    const by = Math.floor(i / 2) / 10;
    const sx =
      0.1 * Math.sin(by * 100) +
      0.05 * Math.sin(by * 100) + time / 5000;
    const sy =
      0.1 * Math.sin(bx * 100) * Math.sin(time / 10000) / Math.abs(Math.sin(bx * 200));

    const x = (((bx + sx) * c.width)) % c.width;
    const y = ((by + sy) * c.height) % c.height;
    // ctx.fillRect(c.width - x, c.height - y, 20, 20);
    
    const tailAngle = Math.sin(x / 100) * 0.2
    
    drawLeave(c.width - x, c.height - y, 30, tailAngle - Math.PI / 6)
    drawLeave(c.width - x, c.height - y, 30, tailAngle + Math.PI / 6)
    
    drawLeave(c.width - x, c.height - y, 100, Math.PI - Math.sin(x / 100) * 0.2)
    
    ctx.fill()
  }
  
  // snow

  const snowCount = 100;
  ctx.fillStyle = 'white';

  for (let i = 0; i < snowCount; i++) {
    const bx = (i % 10) / 10;
    const by = Math.floor(i / 10) / 10;
    const sx =
      0.1 * Math.sin(by * 100) +
      0.05 * Math.sin(by * 100) + time / 10000;
    const sy =
      0.1 * Math.sin(bx * 100) * Math.sin(time / 10000) / Math.abs(Math.sin(bx * 200));

    const x = (((bx + sx) * c.width)) % c.width;
    const y = ((by + sy) * c.height) % c.height;
    ctx.fillRect(c.width - x, y, 2, 2);
  }
  
  camera.x = time / 5;
}

animate(0);

//Nav

const body = document.body;
const scrollUp = "scroll-up";
const scrollDown = "scroll-down";
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll <= 0) {
    body.classList.remove(scrollUp);
    return;
  }

  if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
    // down
    body.classList.remove(scrollUp);
    body.classList.add(scrollDown);
  } else if (
    currentScroll < lastScroll &&
    body.classList.contains(scrollDown)
  ) {
    // up
    body.classList.remove(scrollDown);
    body.classList.add(scrollUp);
  }
  lastScroll = currentScroll;
});

// Background
  // Create geometric shapes
  function createShapes() {
    const background = document.getElementById('geometric-background');
    const shapeTypes = ['square', 'circle', 'triangle', 'rectangle'];
    
    for (let i = 0; i < 40; i++) {
        const shape = document.createElement('div');
        const shapeClass = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        shape.className = `shape ${shapeClass}`;
        
        // Random positions
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random animation properties
        const delay = Math.random() * 10;
        const duration = Math.random() * 10 + 10;
        
        // Apply styles
        shape.style.left = `${posX}%`;
        shape.style.top = `${posY}%`;
        shape.style.animationDelay = `${delay}s`;
        shape.style.animationDuration = `${duration}s`;
        
        background.appendChild(shape);
    }
}

// Create particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    
    for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positions
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random animation properties
        const delay = Math.random() * 8;
        const duration = Math.random() * 4 + 4;
        
        // Apply styles
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Mouse movement interaction
function addMouseInteraction() {
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach(shape => {
            const speed = 0.05;
            const shapeX = parseFloat(shape.style.left);
            const shapeY = parseFloat(shape.style.top);
            
            shape.style.left = `${shapeX + (x - 0.5) * speed}%`;
            shape.style.top = `${shapeY + (y - 0.5) * speed}%`;
        });
    });
}

// Initialize animation
document.addEventListener('DOMContentLoaded', () => {
    createShapes();
    createParticles();
    addMouseInteraction();
});
