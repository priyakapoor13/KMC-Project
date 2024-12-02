// Function to generate a unique session ID
const generateSessionId = () => {
    return 'xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, () => {
        return Math.floor(Math.random() * 16).toString(16);
    });
};

// Function to get a specific cookie from the browser
export const getCookie = (name) => {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim();
        if (c.startsWith(nameEQ)) {
            return decodeURIComponent(c.substring(nameEQ.length));
        }
    }
    return null;
};

// Utility function to set cookies
const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
};

// Function to check if the session ID is expired
const isSessionExpired = (expirationTime) => {
    const currentTime = Date.now(); // Current time in milliseconds
    return currentTime > expirationTime;
};

// Function to get or set the session ID cookie
export const manageSessionId = () => {
    let sessionId = getCookie("sessionId");
    let sessionExpiration = getCookie("sessionExpiration");

    if (!sessionId || !sessionExpiration || isSessionExpired(Number(sessionExpiration))) {
        // Generate a new session ID and expiration time
        sessionId = generateSessionId();
        const expirationTime = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

        // Set session ID and expiration time cookies
        setCookie("sessionId", sessionId, 7);
        setCookie("sessionExpiration", expirationTime, 7);
    }

    return sessionId;
};