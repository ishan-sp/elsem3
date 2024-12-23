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

function enableEdit(inputId) {
    const inputField = document.getElementById(inputId);
    const icon = inputField.nextElementSibling;

    if (inputField.hasAttribute('readonly')) {
        // If the field is in read-only mode, enable editing
        inputField.removeAttribute('readonly');
        inputField.focus();
        icon.classList.remove('fa-pencil-alt');
        icon.classList.add('fa-save'); // Change icon to save
    } else {
        // Save the input and disable editing
        inputField.setAttribute('readonly', true);
        icon.classList.remove('fa-save');
        icon.classList.add('fa-pencil-alt'); // Change icon back to edit
    }
}

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

// Function to adjust the margin of the stats-section based on the navbar height
function adjustStatsMargin() {
    var navbar = document.querySelector('.navbar'); // Adjust the selector to match your navbar's class
    var statsSection = document.querySelector('.stats-section');
    
    if (navbar && statsSection) {
        var navbarHeight = navbar.offsetHeight;
        statsSection.style.marginTop = navbarHeight + 'px';
    }
}

// Run the function on window resize and on load
window.addEventListener('load', adjustStatsMargin);
window.addEventListener('resize', adjustStatsMargin);

window.addEventListener('resize', adjustVerticalMenuPosition);
window.addEventListener('load', adjustVerticalMenuPosition);

window.addEventListener('resize', adjustVerticalMenuPosition);
window.addEventListener('load', adjustVerticalMenuPosition);

window.addEventListener('resize', adjustVerticalMenuPosition);
window.addEventListener('load', adjustVerticalMenuPosition);

function adjustVerticalMenuPosition() {
    // Check if the screen width is small (e.g., below 768px)
    if (window.innerWidth <= 768) {
        const navbar = document.querySelector('.navbar');
        const verticalMenu = document.querySelector('.vertical-menu');
        
        // Get the height of the navbar
        const navbarHeight = navbar.offsetHeight;

        // Adjust the margin-top by subtracting a few pixels (adjust this value)
        const adjustedMarginTop = navbarHeight - 10; // Subtract 10px to remove extra space

        // Apply the adjusted margin-top to the vertical menu
        verticalMenu.style.marginTop = `${adjustedMarginTop}px`;
    } else {
        // Reset the margin for larger screens
        const verticalMenu = document.querySelector('.vertical-menu');
        verticalMenu.style.marginTop = '0'; // Reset to default margin
    }
}
const UserData = [
    {
      "present": false,
      "userLoggedIn": "670ff6d0b537e129fe4a4351",
    },
    {
      "_id": "67133983d6d02cca56e02b5e",
      "username": "ishansp27",
      "email": "hello12@example.com",
      "displayName": "Ishan",
      "role": "hello",
      "password": "medha123",
      "points": 0,
      "streak": 0,
      "level": 7,
      "__v": 0,
    },
    {
      "_id": "6740210c788f88b4a02cace8",
      "username": "sfefwojo",
      "email": "sefes@f.com",
      "displayName": "IshanShekharPrasad",
      "role": "fisherman",
      "password": "hello123",
      "points": 0,
      "streak": 0,
      "level": 6,
      "__v": 0,
    },
    {
      "_id": "67455e68a24811b95af9d8d1",
      "username": "ishansp05",
      "email": "hello23@example.com",
      "displayName": "Ishan",
      "role": "fisherman",
      "password": "hello1234",
      "points": 0,
      "streak": 0,
      "level": 6,
      "__v": 0
    },
    {
      "_id": "6740210c788f88b4a02cace7",
      "username": "mhgvsfefebwojo",
      "email": "sefes@f.com",
      "displayName": "Ishaaaaan",
      "role": "fisherman",
      "password": "hello123",
      "points": 0,
      "streak": 0,
      "level": 5,
      "__v": 0
    },
    {
      "_id": "67455e68a24811b95af9d8d5",
      "username": "ishansp0527",
      "email": "hello23@example.com",
      "displayName": "Iiiiishannnnn",
      "role": "fisherman",
      "password": "hello1234",
      "points": 0,
      "streak": 0,
      "level": 4,
      "__v": 0
    },
    {
      "_id": "670ff6d0b537e129fe4a4350",
      "username": "ishan1255",
      "email": "hello@example.com",
      "displayName": "randomuser",
      "role": "gamer",
      "password": "hi123",
      "points": 0,
      "streak": 0,
      "level": 3,
      "__v": 0
    },
    {
      "_id": "67133983d6d92cca56e02b5e",
      "username": "ishusp27",
      "email": "hello12@example.com",
      "displayName": "Ishan",
      "role": "tourist",
      "password": "medha123",
      "points": 0,
      "streak": 0,
      "level": 3,
      "__v": 0
    },
    {
      "_id": "6540210c788f88b4a02cacf8",
      "username": "sfefbgwojo",
      "email": "sefes@f.com",
      "displayName": "noone",
      "role": "tourist",
      "password": "hello123",
      "points": 0,
      "streak": 0,
      "level": 2,
      "__v": 0
    },
    {
      "_id": "67455e68a24811b93af9d8d1",
      "username": "2705ishan",
      "email": "hello23@example.com",
      "displayName": "IshanSP",
      "role": "fisherman",
      "password": "hello1234",
      "points": 0,
      "streak": 0,
      "level": 2,
      "__v": 0
    },
    {
        "_id": "67444e68a24811b93af9d8d1",
        "username": "newuser",
        "email": "hello23@example.com",
        "displayName": "newuser",
        "role": "tourist",
        "password": "hello1234",
        "points": 0,
        "streak": 0,
        "level": 2,
        "__v": 0
    },
    {
        "_id": "670ff6d0b537e129fe4a4351",
        "username": "ishan12thebest",
        "email": "hello@example.com",
        "displayName": "IshanisBest",
        "role": "fisherman",
        "password": "hi123",
        "points": 100,
        "streak": 0,
        "level": 2,
        "__v": 0,
      }
  ];
  function populatePointsContent(UserData) {
    console.log(UserData);

    const userLoggedInID = UserData[0].userLoggedIn;

    console.log(userLoggedInID);
    const currentUserData = UserData.find(user => user._id === userLoggedInID);

    if (currentUserData) {
        document.querySelector(".dynamic-username").textContent = currentUserData.displayName || "[User]";
        document.querySelector(".dynamic-streak").textContent = currentUserData.streak || 0;
        document.querySelector(".dynamic-available-points").textContent = currentUserData.points || 0;
        document.querySelector(".dynamic-level").textContent = currentUserData.level || 1;
        document.querySelector(".dynamic-todays-points").textContent = currentUserData.points || 0; // Update this if you track today's points separately
    } else {
        console.error("No user data found for the logged-in user.");
    }
}
document.addEventListener("DOMContentLoaded", () => {
    populatePointsContent(UserData);
});

// Function to populate the leaderboard
function populateLeaderboard(UserData) {
    const leaderboardRows = document.getElementById("leaderboard-rows");
    leaderboardRows.innerHTML = ""; // Clear any existing rows

    const userLoggedInId = UserData[0].userLoggedIn;
    const presentInTop = UserData[0].present;
    const allUsers = UserData.slice(1); // Exclude the first entry
    const userCount = allUsers.length;

    // If less than 10 users, display all rows
    if (userCount <= 10) {
        allUsers.forEach((user, index) => {
            leaderboardRows.appendChild(createLeaderboardRow(index + 1, user.displayName, user.level, user.points));
        });
    } else {
        // For more than 10 users
        if (presentInTop) {
            // If the logged-in user is in the top 10
            allUsers.slice(0, 10).forEach((user, index) => {
                leaderboardRows.appendChild(createLeaderboardRow(index + 1, user.displayName, user.level, user.points));
            });
        } else {
            // If the logged-in user is not in the top 10
            allUsers.slice(0, 10).forEach((user, index) => {
                leaderboardRows.appendChild(createLeaderboardRow(index + 1, user.displayName, user.level, user.points));
            });

            // Add dots for extra rows
            const dotsRow = document.createElement("div");
            dotsRow.className = "leaderboard-dots";
            dotsRow.innerHTML = `
                <span>.</span>
                <span>.</span>
                <span>.</span>
                `;
            // Append dots row after the 10th leaderboard row
            if (allUsers.length > 10) {
            const top10Rows = Array.from(leaderboardRows.children).slice(0, 10);
            leaderboardRows.insertBefore(dotsRow, top10Rows[top10Rows.length - 1].nextSibling);
            }
            

            // Find the logged-in user and display their row
            const loggedInUser = allUsers.find(user => user._id === userLoggedInId);
            if (loggedInUser) {
                leaderboardRows.appendChild(createLeaderboardRow(11, loggedInUser.displayName, loggedInUser.level, loggedInUser.points));
            }
        }
    }
}

// Helper function to create a leaderboard row
function createLeaderboardRow(rank, displayName, level, points) {
    const row = document.createElement("div");
    row.className = "leaderboard-row";
    row.innerHTML = `
        <span>${rank}</span>
        <span>${displayName}</span>
        <span>${level}</span>
        <span>${points}</span>
    `;
    return row;
}
let isExpanded = false; // Track the current state of the leaderboard (expanded/collapsed)

// Function to toggle leaderboard view
function toggleLeaderboard() {
    const leaderboardRows = document.querySelectorAll(".leaderboard-row");
    const expandBtn = document.querySelector(".expand-btn");

    if (isExpanded) {
        // Collapse the leaderboard to show only the top 3 rows
        leaderboardRows.forEach((row, index) => {
            row.style.display = index < 3 ? "flex" : "none";
        });
        expandBtn.textContent = "Show More";
        isExpanded = false;
    } else {
        // Expand the leaderboard to show all rows
        leaderboardRows.forEach(row => {
            row.style.display = "flex";
        });
        expandBtn.textContent = "Show Less";
        isExpanded = true;
    }
}

// Initial setup to display only top 3 rows
function setupLeaderboard() {
    const leaderboardRows = document.querySelectorAll(".leaderboard-row");
    leaderboardRows.forEach((row, index) => {
        row.style.display = index < 3 ? "flex" : "none"; // Show only the top 3 rows initially
    });
}

// Populate the leaderboard on page load
populateLeaderboard(UserData);
setupLeaderboard();

function updateProgressBar(userId) {
    // Find the current user from the JSON object
    const currentUser = UserData.find(user => user._id === userId);

    if (currentUser) {
        // Get the user's points
        const points = currentUser.points;
        const totalPoints = 1000; // Total points required for redemption

        // Calculate progress as a percentage
        const progressPercentage = (points / totalPoints) * 100;

        // Update the progress bar and points text dynamically
        const progressBar = document.querySelector(".progress-bar");
        const pointsText = document.querySelector(".progress .number");

        progressBar.style.width = `${progressPercentage}%`; // Set progress bar width
        pointsText.textContent = `${points}/${totalPoints}`; // Update points text
    } else {
        console.error("User not found!");
    }
}

// Call the function with the logged-in user's ID
const userLoggedInId = UserData[0].userLoggedIn; // Assuming this stores the logged-in user's ID
updateProgressBar(userLoggedInId);

function updateProgressBars(userId) {
    // Find the logged-in user
    const currentUser = UserData.find(user => user._id === userId);

    if (currentUser) {
        const userPoints = currentUser.points; // Current user's total points

        // Select all progress bars
        const progressBars = document.querySelectorAll(".p-bar");
        const progressTexts = document.querySelectorAll(".p-text");

        progressBars.forEach((bar, index) => {
            const totalPoints = parseInt(bar.getAttribute("data-total"), 10); // Get total points for the offer
            const progressPercentage = (userPoints / totalPoints) * 100; // Calculate progress

            // Update progress bar width and text
            bar.style.width = `${progressPercentage}%`;
            progressTexts[index].textContent = `${userPoints} of ${totalPoints}`;
        });
    } else {
        console.error("User not found!");
    }
}
// Call the function for the logged-in user
updateProgressBars(userLoggedInId);
