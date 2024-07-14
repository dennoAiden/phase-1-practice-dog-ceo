document.addEventListener('DOMContentLoaded', () => {
    // URLs for fetching data
    const randomImagesUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";

    // Function to fetch and display random dog images
    function fetchAndDisplayImages() {
        fetch(randomImagesUrl)
            .then(response => response.json())
            .then(data => {
                const imageContainer = document.getElementById('dog-image-container');
                // Clear any existing images
                imageContainer.innerHTML = '';
                // Append new images
                data.message.forEach(imageUrl => {
                    const imgElement = document.createElement('img');
                    imgElement.src = imageUrl;
                    imgElement.alt = 'Random Dog Image';
                    imgElement.style.width = '200px';
                    imgElement.style.margin = '10px';
                    imageContainer.appendChild(imgElement);
                });
            })
            .catch(error => {
                console.error('Error fetching the images:', error);
            });
    }

    // Function to fetch and display all dog breeds
    function fetchAndDisplayBreeds() {
        fetch(breedUrl)
            .then(response => response.json())
            .then(data => {
                const breedsList = document.getElementById('dog-breeds');
                // Clear any existing breeds
                breedsList.innerHTML = '';
                // Append new breeds
                for (const breed in data.message) {
                    const liElement = document.createElement('li');
                    liElement.textContent = breed;
                    // Add event listener to change font color on click
                    liElement.addEventListener('click', () => {
                        liElement.style.color = 'red'; // Change to your desired color
                    });
                    breedsList.appendChild(liElement);
                }
            })
            .catch(error => {
                console.error('Error fetching the breeds:', error);
            });
    }

    // Function to filter breeds based on selected letter
    function filterBreeds(letter) {
        const breedsList = document.getElementById('dog-breeds');
        const breedItems = breedsList.getElementsByTagName('li');
        
        // Hide all breeds
        Array.from(breedItems).forEach(item => {
            item.style.display = 'none';
        });

        // Show breeds that start with the selected letter
        Array.from(breedItems).forEach(item => {
            if (item.textContent.toLowerCase().startsWith(letter)) {
                item.style.display = 'block';
            }
        });
    }

    // Event listener for dropdown change
    const breedDropdown = document.getElementById('breed-dropdown');
    breedDropdown.addEventListener('change', (event) => {
        const selectedLetter = event.target.value.toLowerCase();
        filterBreeds(selectedLetter);
    });

    // Fetch and display images and breeds on page load
    fetchAndDisplayImages();
    fetchAndDisplayBreeds();
});
