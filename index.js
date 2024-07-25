const displayImages = async () => {
    const url = 'shop.json';
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Fetched data:', data); // Log data to check if it is fetched correctly
        return data.items; // Access the 'items' array within the fetched data
    } catch (error) {
        console.log('Error fetching data:', error); // Corrected 'Error' to 'Error' and log the error
    }
}

const renderImages = async () => {
    const imageData = await displayImages();
    console.log('This is your image data:', imageData);
    let html = '';

    if (Array.isArray(imageData) && imageData.length > 0) {
        imageData.forEach((value) => { // Iterate over all items
            let htmlSegment = `
                <div class="card col-sm-2">
                    <img src="${value.image}" alt="" class="img-fluid loco" id="img">
                    <h6 class="card-title">${value.name}</h6>
                    <p>${value.price} ${value.currency}</p>
                    <div class="btncontainer">
                        <button class="btn button" type="button">add to cart</button>
                    </div>
                    <div class="star-rating">
                        <span class="star" data-value="5">&#9733;</span>
                        <span class="star" data-value="4">&#9733;</span>
                        <span class="star" data-value="3">&#9733;</span>
                        <span class="star" data-value="2">&#9733;</span>
                        <span class="star" data-value="1">&#9733;</span>
                    </div>
                </div>
            `;
            html += htmlSegment;
        });
    } else {
        console.log('ImageData is not an array or is empty');
    }

    let container = document.querySelector('#displayedProducts');
    if (container) {
        container.innerHTML = html;
    } else {
        console.log('Container not found');
    }
}

renderImages();

const siv = document.querySelector('#displayedProducts');
console.log(siv);
