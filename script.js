// Preset birthday date and time
const presetBirthday = "2025-01-17T00:00:00"; // Replace with the target date and time
const yourBirthday = "2002-01-17T00:00:00"; // Replace with your actual birth date
const redirectUrl = "https://paramita-bday.github.io/hbdparo/";

let countdownInterval;

// Google Tag (gtag.js)
(function() {
    // Dynamically create the script tag for gtag.js
    var gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-720BWJCGW9";
    document.head.appendChild(gtagScript);
  
    // Initialize dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
  
    // Set the initial gtag configuration
    gtag('js', new Date());
    gtag('config', 'G-720BWJCGW9');
  })();
//End of Google Tag

function startCountdown() {
    const birthday = new Date(presetBirthday);
    const birthDate = new Date(yourBirthday);

    // Validate date
    if (isNaN(birthday.getTime()) || isNaN(birthDate.getTime())) {
        console.error("Invalid date format. Please check the presetBirthday and yourBirthday variables.");
        return;
    }

    updateLivedTime(birthDate);

    countdownInterval = setInterval(() => {
        const now = new Date();
        const timeRemaining = birthday - now;

        // If countdown has ended
        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            displayCountdownEnded();
            return;
        }

        // Calculate time components
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        // Update the countdown display
        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = hours;
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("seconds").textContent = seconds;

        // Change color to red if less than 5 minutes remain
        const countdownElement = document.getElementById("countdown");
        if (timeRemaining <= 5 * 60 * 1000) {
            countdownElement.classList.add("red");
        } else {
            countdownElement.classList.remove("red");
        }
    }, 1000);
}

function updateLivedTime(birthDate) {
    const now = new Date();
    const timeLived = now - birthDate;

    const daysLived = Math.floor(timeLived / (1000 * 60 * 60 * 24));
    const secondsLived = Math.floor(timeLived / 1000);

    // Ensure the elements exist before updating
    const daysLivedElement = document.getElementById("daysLived");
    const secondsLivedElement = document.getElementById("secondsLived");

    if (daysLivedElement && secondsLivedElement) {
        daysLivedElement.textContent = daysLived.toLocaleString();
        secondsLivedElement.textContent = secondsLived.toLocaleString();
    }
}

function displayCountdownEnded() {
    // Display a greeting message
    const messageContainer = document.createElement("div");
    messageContainer.id = "greetingMessage";
    messageContainer.style.position = "fixed";
    messageContainer.style.top = "50%";
    messageContainer.style.left = "50%";
    messageContainer.style.transform = "translate(-50%, -50%)";
    messageContainer.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    messageContainer.style.color = "#FFD700";
    messageContainer.style.padding = "20px";
    messageContainer.style.borderRadius = "10px";
    messageContainer.style.textAlign = "center";
    messageContainer.style.zIndex = "9999";
    messageContainer.innerHTML = `
        <span style="font-size: 2rem;">🎉 Happy Birthday 🎉</span>
        <br>
        <span style="font-size: 1.5rem;">The wait is over!</span>
    `;
    document.body.appendChild(messageContainer);

    // Redirect after 3 seconds
    setTimeout(() => {
        messageContainer.remove();
        window.location.href = redirectUrl;
    }, 3000);
}

  
// Music play button functionality
const playMusicButton = document.getElementById("playMusicButton");
const music = document.getElementById("backgroundMusic");

playMusicButton.addEventListener("click", () => {
    music.play().catch((error) => {
        console.error("Music play failed:", error); // Handle autoplay issues
    });
    playMusicButton.style.display = "none"; // Hide the button after the music starts
});

// Ensure video plays on mobile and desktop
document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("backgroundVideo");

    // Ensure the video starts correctly for both mobile and desktop
    const ensureVideoPlays = () => {
        if (video.paused || video.readyState < 3) {
            video.muted = true; // Safari requires videos to be muted for autoplay
            video.play().catch(() => {
                console.log("Autoplay blocked; user interaction required.");
            });
        }
    };

    // Attempt to play the video immediately
    ensureVideoPlays();

    // Retry play if user interacts with the page
    document.addEventListener("click", ensureVideoPlays, { once: true });
});

// Start the countdown immediately
startCountdown();

// Function to display a popup with local blur effect and auto-close
function showMusicPopupWithLocalBlur(audioElement) {
    if (audioElement) {
        // Create the popup container
        const popup = document.createElement("div");
        popup.style.position = "fixed";
        popup.style.top = "50%";
        popup.style.left = "50%";
        popup.style.transform = "translate(-50%, -50%)";
        popup.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
        popup.style.padding = "20px";
        popup.style.borderRadius = "10px";
        popup.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        popup.style.textAlign = "center";
        popup.style.zIndex = "1000";
        popup.style.backdropFilter = "blur(10px)"; // Add local blur effect

        // Add popup content
        const popupText = document.createElement("p");
        popupText.textContent = "Music started! Turning the volume up for the best experience.";
        popupText.style.fontFamily = "Arial, sans-serif";
        popupText.style.fontSize = "16px";
        popupText.style.color = "#333";
        popup.appendChild(popupText);

        // Append the popup to the body
        document.body.appendChild(popup);

        // Set volume to maximum (1.0)
        audioElement.volume = 1.0;

        // Log the current volume level (optional)
        console.log("Current volume:", audioElement.volume);

        // Auto-close the popup after 2 seconds
        setTimeout(() => {
            popup.remove();
        }, 2000);
    } else {
        console.error("Audio element not found.");
    }
}

// Add event listener to start music and trigger the popup
document.addEventListener("DOMContentLoaded", () => {
    const musicElement = document.querySelector('audio'); // Assuming there's an <audio> element on the page
    if (musicElement) {
        musicElement.addEventListener("play", () => showMusicPopupWithLocalBlur(musicElement));
    } else {
        console.error("Audio element is not available on the page.");
    }
});
