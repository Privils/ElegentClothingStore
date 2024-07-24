const myImage = document.querySelector('.loco');

fetch('shop.json')
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log the entire response to understand its structure

        // Check if 'items' property exists and is an array
        if (data.items && Array.isArray(data.items)) {
            data.items.forEach(image => {
                const imgElement = document.createElement('img');
                imgElement.src = image.url; // Assuming 'url' is the property in each image object
                myImage.appendChild(imgElement);
            });
        } else {
            console.error('Expected an array of objects under "items", but received:', data);
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
