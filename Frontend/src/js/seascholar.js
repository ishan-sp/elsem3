// Menu toggle functionality
document.getElementById('menu-toggle').addEventListener('click', function(event) {
    var menu = document.getElementById('dropdown-menu');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
    event.stopPropagation();
});

// Close dropdown-menu when clicking outside
window.addEventListener('click', function(event) {
    var menu = document.getElementById('dropdown-menu');
    if (menu.style.display === 'block' && !event.target.matches('#menu-toggle')) {
        menu.style.display = 'none';
    }
});

// Username dropdown functionality
document.getElementById('username-toggle').addEventListener('click', function(event) {
    event.preventDefault();
    var dropdown = document.querySelector('.username-dropdown');
    dropdown.classList.toggle('active');
});

// Close username dropdown when clicking outside
window.onclick = function(event) {
    if (!event.target.matches('#username-toggle')) {
        var dropdowns = document.getElementsByClassName("username-dropdown");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('active')) {
                openDropdown.classList.remove('active');
            }
        }
    }
};

// Categories dropdown functionality
document.addEventListener("DOMContentLoaded", function() {
    const categoryMenu = document.getElementById("categoryMenu");
    
    categoriesAndCourses.forEach(categoryData => {
        const categoryLi = document.createElement("li");
        categoryLi.classList.add("has-submenu");
    
        const categoryLink = document.createElement("a");
        categoryLink.href = "#";
        categoryLink.innerHTML = `${categoryData.category} <span class="arrow">></span>`;
    
        const submenuUl = document.createElement("ul");
        submenuUl.classList.add("submenu");
    
        categoryData.courses.forEach(course => {
            const courseLi = document.createElement("li");
            const courseLink = document.createElement("a");
            courseLink.href = "#";
            courseLink.textContent = course;
            courseLi.appendChild(courseLink);
            submenuUl.appendChild(courseLi);
        });
    
        categoryLi.appendChild(categoryLink);
        categoryLi.appendChild(submenuUl);
        categoryMenu.appendChild(categoryLi);
    });
});

// Chatbot functionality
function openChatbot() {
    document.getElementById('chatbot-window').style.display = 'flex';
    document.body.classList.add('no-scroll');
}

function closeChatbot() {
    document.getElementById('chatbot-window').style.display = 'none';
    document.body.classList.remove('no-scroll');
}

function handleInput(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function selectPrompt(promptText) {
    const chatInput = document.getElementById("chatbox");
    const sendButton = document.getElementById("send-btn");
    chatInput.value = promptText;
    sendButton.disabled = false;
}

function checkInput() {
    const chatInput = document.getElementById("chatbox");
    const sendButton = document.getElementById("send-btn");
    
    if (chatInput.value.trim() === "") {
        sendButton.disabled = true;
        sendButton.style.cursor = "not-allowed";
    } else {
        sendButton.disabled = false;
        sendButton.style.cursor = "pointer";
    }
}

function sendMessage() {
    const chatInput = document.getElementById("chatbox");
    const message = chatInput.value.trim();
    if (message !== "") {
        fetch("/message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ usermsg: message })
        })
        .then(response => response.json())
        .then(data => {
            const chatContent = document.querySelector('.chat-messages');
            const userMessage = document.createElement('div');
            userMessage.classList.add('user-message');
            userMessage.textContent = message;
            chatContent.appendChild(userMessage);
            chatContent.scrollTop = chatContent.scrollHeight;
            chatInput.value = "";
            document.getElementById("send-btn").disabled = true;
            document.querySelector('.suggested-prompts').style.display = 'none';
            
            const botMessage = document.createElement('div');
            botMessage.classList.add('bot-message');
            botMessage.textContent = data.response;
            chatContent.appendChild(botMessage);
            chatContent.scrollTop = chatContent.scrollHeight;
            document.getElementById("send-btn").disabled = false;
        });
    }
}

// Slideshow functionality
let slideIndex = 0;
let slides = document.getElementsByClassName("slide");
let totalSlides = slides.length;

slides[slideIndex].classList.add("active");

function showSlides() {
    let currentSlide = slides[slideIndex];
    let nextSlide = slides[(slideIndex + 1) % totalSlides];

    currentSlide.style.transform = "translateX(-100%)";
    currentSlide.style.transition = "transform 1s ease-in-out";
    
    nextSlide.style.display = "flex";
    nextSlide.style.transform = "translateX(100%)";
    nextSlide.style.transition = "none";
    
    setTimeout(function() {
        nextSlide.style.transition = "transform 1s ease-in-out";
        nextSlide.style.transform = "translateX(0)";
    }, 50);

    slideIndex = (slideIndex + 1) % totalSlides;

    setTimeout(function() {
        currentSlide.style.display = "none";
        currentSlide.style.transform = "translateX(100%)";
    }, 1000);
}

setInterval(showSlides, 9000);

// Course loading functionality
async function fetchAndDisplayCourses() {
    try {
        const response = await fetch('sea-scholar/api/courses');
        if (!response.ok) {
            throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        generateCourses(data.courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        const courseContainer = document.getElementById('courseContainer');
        courseContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <h3>Failed to load courses</h3>
                <p>Please try again later</p>
                <button onclick="window.location.reload()">Retry</button>
            </div>
        `;
    }
}

function generateCourses(courseData) {
    const courseContainer = document.getElementById('courseContainer');
    courseContainer.innerHTML = '';

    courseData.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');
        
        const courseImage = document.createElement('img');
        courseImage.src = course.img || '../../images/course-placeholder.jpg';
        courseImage.alt = course.courseName;
        courseImage.classList.add('course-img');
        courseImage.onerror = function() {
            this.src = '../../images/course-placeholder.jpg';
        };
        courseCard.appendChild(courseImage);
        
        const courseName = document.createElement('div');
        courseName.classList.add('course-name');
        courseName.textContent = course.courseName;
        courseCard.appendChild(courseName);

        const courseDetails = document.createElement('div');
        courseDetails.classList.add('course-details');
        
        const detailsHTML = `
            <h3>${course.courseName}</h3>
            <ul>
                <li><b>${course.level}</b></li>
                ${course.rating ? `<li><i class="fas fa-star"></i> ${course.rating}</li>` : ''}
                <li><i class="fas fa-book"></i> ${course.articles.length} articles</li>
            </ul>
            <p>${course.description}</p>
            <div class="start-now">Start now</div>
        `;
        courseDetails.innerHTML = detailsHTML;
        courseCard.appendChild(courseDetails);
        courseContainer.appendChild(courseCard);
    });
}

// Categories and courses data
const categoriesAndCourses = [
    {
        category: "Marine Ecosystems",
        courses: [
            "Intro to Marine Ecosystems",
            "Marine Foodwebs and Biodiversity",
            "Coral Reefs: Guardians of the Ocean",
            "Human Impact on Marine Ecosystems"
        ]
    },
    {
        category: "Fishing Techniques",
        courses: [
            "Sustainable Fishing Practices",
            "Commercial Fishing Methods",
            "Artisanal Small-scale Fishing",
            "Bycatch Reduction and Fisheries Management"
        ]
    },
    {
        category: "Risk Management",
        courses: [
            "Ocean Risk Assessment and Management",
            "Disaster Preparedness in Coastal Regions",
            "Maritime Law and Risk Mitigation",
            "Oil Spills: Prevention and Response"
        ]
    },
    {
        category: "Weather Patterns",
        courses: [
            "Oceanic and Atmospheric Interactions",
            "Marine Meteorology: Understanding Ocean Weather",
            "Cyclones and Storm Surges: Coastal Impacts",
            "Climate Change and Oceanic Weather Patterns"
        ]
    },
    {
        category: "Navigation",
        courses: [
            "Fundamentals of Marine Navigation",
            "Celestial Navigation for Mariners",
            "Electronic Navigation Systems",
            "Route Planning and Weather Routing"
        ]
    },
    {
        category: "Survival and Safety",
        courses: [
            "Marine Survival Techniques",
            "First Aid and Medical Care at Sea",
            "Firefighting and Emergency Response on Ships",
            "Surviving in Extreme Ocean Conditions"
        ]
    }
];

// Initialize course loading when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    fetchAndDisplayCourses();
});