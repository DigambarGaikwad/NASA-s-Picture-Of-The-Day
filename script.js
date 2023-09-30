const apiKey = "lrxHIiYXfbcPPqGO8IICvC4eieD9ryNr6Tn5bYZ9";
document.addEventListener("DOMContentLoaded", () => {
    // Function to fetch and display the current image of the day
    function getCurrentImageOfTheDay() {
        const currentDate = new Date().toISOString().split("T")[0];
        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                displayImage(data);
            })
            .catch((error) => {
                console.error("Error fetching current image:", error);
            });
    }

    // Function to fetch and display an image for a selected date
    function getImageOfTheDay(date) {
        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                displayImage(data);
                saveSearch(date);
            })
            .catch((error) => {
                console.error("Error fetching image:", error);
            });
    }

    // Function to display an image in the current-image-container
    function displayImage(data) {
        const container = document.getElementById("current-image-container");
        container.innerHTML = `
            <h3>Image on the ${data.date}</h3>
            <h2>${data.title}</h2>
            <img src="${data.url}" alt="${data.title}" />
            <p>${data.explanation}</p>
        `;
    }

    // Function to save a search date to local storage
    function saveSearch(date) {
        let searches = JSON.parse(localStorage.getItem("searches")) || [];
        searches.push(date);
        localStorage.setItem("searches", JSON.stringify(searches));
        addSearchToHistory();
    }

    // Function to add search dates to the search history
    function addSearchToHistory() {
        const searchHistory = document.getElementById("search-history");
        searchHistory.innerHTML = "";
        const searches = JSON.parse(localStorage.getItem("searches")) || [];

        for (const searchDate of searches) {
            const listItem = document.createElement("li");
            listItem.textContent = searchDate;
            listItem.addEventListener("click", () => {
                getImageOfTheDay(searchDate);
            });
            searchHistory.appendChild(listItem);
        }
    }

    // Event listener for the search form submission
    const searchForm = document.getElementById("search-form");
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const dateInput = document.getElementById("search-input");
        const selectedDate = dateInput.value;
        getImageOfTheDay(selectedDate);
    });


    
    function clearSearchHistory() {
        localStorage.removeItem("searches");
        addSearchToHistory(); // Refresh the search history display
    }

    // Event listener for the "Delete Search History" button
    const clearHistoryButton = document.getElementById("clear-history-button");
    clearHistoryButton.addEventListener("click", clearSearchHistory);





    // Display the current image of the day when the page loads
    getCurrentImageOfTheDay();

    // Display the search history
    addSearchToHistory();
});
