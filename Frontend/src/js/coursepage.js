document.getElementById('menu-toggle').addEventListener('click', function(event) {
    var menu = document.getElementById('dropdown-menu');
    // Toggle the menu visibility
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
    
    event.stopPropagation(); // Prevent the click event from bubbling up
});

// Close the dropdown-menu if clicking outside of it
window.addEventListener('click', function(event) {
    var menu = document.getElementById('dropdown-menu');
    if (menu.style.display === 'block' && !event.target.matches('#menu-toggle')) {
        menu.style.display = 'none';
    }
});
document.getElementById('username-toggle').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    var dropdown = document.querySelector('.username-dropdown');
    dropdown.classList.toggle('active');
});

// Close the dropdown if clicking outside of it
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

document.addEventListener("DOMContentLoaded", function () {
    // Get the dropdown button and content
    var dropdownBtn = document.querySelector('.dropbtn');
    var dropdownContent = document.querySelector('.dropdown-content');
    
    // Detect if screen size is small (less than 768px width)
    function isSmallScreen() {
        return window.innerWidth < 768; // You can adjust the breakpoint as needed
    }

    // Add click functionality for small screens
    dropdownBtn.addEventListener('click', function (event) {
        if (isSmallScreen()) {
            // Toggle the dropdown content on click
            dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
            event.preventDefault(); // Prevent default link action if it's an anchor link
        }
    });

    // Optional: Close the dropdown when clicking outside of it
    document.addEventListener('click', function (event) {
        if (isSmallScreen() && !dropdownBtn.contains(event.target) && !dropdownContent.contains(event.target)) {
            dropdownContent.style.display = 'none'; // Close the dropdown if clicked outside
        }
    });
});


function openChatbot() {
    document.getElementById('chatbot-window').style.display = 'flex';
    document.body.classList.add('no-scroll'); // Disable page scroll
}

// Function to close the chatbot window
function closeChatbot() {
    document.getElementById('chatbot-window').style.display = 'none';
    document.body.classList.remove('no-scroll'); // Enable page scroll
}

// Handle the "Enter" key press for sending messages
function handleInput(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

// Function to send the message

function selectPrompt(promptText) {
    document.getElementById("chatbox").value = promptText;
}
function selectPrompt(promptText) {
    const chatInput = document.getElementById("chatbox");
    const sendButton = document.getElementById("send-btn");

    // Set the selected prompt text in the input field
    chatInput.value = promptText;

    // Enable the send button since a prompt was selected
    sendButton.disabled = false;
}


// Function to check if input box has content
function checkInput() {
    const chatInput = document.getElementById("chatbox");
    const sendButton = document.getElementById("send-btn");

    // Log current value for debugging
    console.log(`Current input value: "${chatInput.value.trim()}"`);

    if (chatInput.value.trim() === "") {
        sendButton.disabled = true;  // Disable the button if the input is empty
        sendButton.style.cursor = "not-allowed";  // Change cursor to indicate disabled state
    } else {
        sendButton.disabled = false;  // Enable the button if the input has text
        sendButton.style.cursor = "pointer";  // Change cursor to indicate it's clickable
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
            const chatContent = document.querySelector('.chat-messages'); // Ensure this selector matches your chat container
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
  document.addEventListener("DOMContentLoaded", function() {
    const categoryMenu = document.getElementById("categoryMenu");
    
    categoriesAndCourses.forEach(categoryData => {
      // Create the main category list item
      const categoryLi = document.createElement("li");
      categoryLi.classList.add("has-submenu");
  
      // Create the category link
      const categoryLink = document.createElement("a");
      categoryLink.href = "#";
      categoryLink.innerHTML = `${categoryData.category} <span class="arrow">></span>`;
  
      // Create the submenu for courses
      const submenuUl = document.createElement("ul");
      submenuUl.classList.add("submenu");
  
      // Loop through each course and create its list item
      categoryData.courses.forEach(course => {
        const courseLi = document.createElement("li");
        const courseLink = document.createElement("a");
        courseLink.href = "#";  // Replace with appropriate course link
        courseLink.textContent = course;
  
        // Append course link to the list item, and the item to the submenu
        courseLi.appendChild(courseLink);
        submenuUl.appendChild(courseLi);
      });
  
      // Append the category link and the submenu to the category list item
      categoryLi.appendChild(categoryLink);
      categoryLi.appendChild(submenuUl);
  
      // Finally, append the category list item to the dropdown menu
      categoryMenu.appendChild(categoryLi);
    });
  });
    

  document.addEventListener('DOMContentLoaded', async () => {
    // Get query parameters from the URL (if available)
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('courseid'); // Extract the courseId parameter

    // Construct the API URL based on whether courseId is provided or not
    const apiUrl = courseId ? `/sea-scholar/api/courses?courseid=${encodeURIComponent(courseId)}` : '/api/courses';

    try {
        // Fetch course data from the server
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch course data');
        }

        // Parse the JSON response
        const courseData = await response.json();

        // Populate the course details dynamically
        updateCourseDetails(courseData);
        populateLearningPoints(courseData);
        populateTopicsCovered(courseData);
        populateCourseImage(courseData);
    } catch (error) {
        console.error('Error fetching course data:', error);
    }
});
  
  // Functions for updating the page content
  function updateCourseDetails(data) {
    document.getElementById('course-title').textContent = data.courseName;
    document.getElementById('enrollment-count').textContent = data.enrolled;
    document.getElementById('modules-count').textContent = data.articles.length;
    document.getElementById('rating-value').textContent = data.rating;
    document.getElementById('course-level').textContent = data.level;
  
    // Calculate duration based on number of articles
    console.log(data.articles.length);
    const duration = (0.33 * data.articles.length).toFixed(2); // Convert to hours with 2 decimal places
    document.getElementById('course-duration').textContent = `Approx ${duration} hours`;
  }
  
  function populateLearningPoints(data) {
    const container = document.getElementById('learning-points-container');
    container.innerHTML = ''; // Clear the container before populating
  
    data.learnings.forEach(point => {
      const pointDiv = document.createElement('div');
      pointDiv.classList.add('learning-point');
  
      const checkIcon = document.createElement('span');
      checkIcon.classList.add('check-icon');
      checkIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                <path d="M9 16.2l-4.2-4.2L3 13.8l6 6 12-12-1.8-1.8L9 16.2z"></path>
                              </svg>`;
  
      const pointText = document.createElement('span');
      pointText.textContent = point;
  
      pointDiv.appendChild(checkIcon);
      pointDiv.appendChild(pointText);
      container.appendChild(pointDiv);
    });
  }
  
  function populateTopicsCovered(data) {
    const topicsList = document.getElementById('topics-covered-list');
    topicsList.innerHTML = ''; // Clear the list before populating
  
    data.articles.forEach(topic => {
      const listItem = document.createElement('li');
      listItem.textContent = topic;
      topicsList.appendChild(listItem);
    });
  }
  
  function populateCourseImage(data) {
    const courseImage = document.getElementById('course-image');
    courseImage.src = "../images/seascholar/IntroToMarineEcosystems/introtomarine.png"; // Replace with actual URL
  }
  