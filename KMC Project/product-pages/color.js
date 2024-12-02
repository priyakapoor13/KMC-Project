// document.getElementById('size-select').addEventListener('change', function() {
//     const selectedSize = this.value;
//     console.log('You have selected size: ' + selectedSize);
// });


// //Change main product image on thumbnail click
// const mainImage = document.getElementById('mainImage');
// const thumbnails = document.querySelectorAll('.thumbnail');

// thumbnails.forEach(thumbnail => {
//     thumbnail.addEventListener('click', () => {
//         mainImage.src = thumbnail.src;
//     });
// });

// // Function to handle color selection
// function selectColor(color) {
//     alert('Color selected: ' + color);
//     }

   // Check if the size select element exists before adding the event listener
const sizeSelect = document.getElementById('size-select');
if (sizeSelect) {
    sizeSelect.addEventListener('change', function() {
        const selectedSize = this.value;
        console.log('You have selected size: ' + selectedSize);
    });
}

// Check if the main image element and thumbnails exist before adding event listeners
const mainImage = document.getElementById('mainImage');
const thumbnails = document.querySelectorAll('.thumbnail');

if (mainImage && thumbnails.length > 0) {
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            mainImage.src = thumbnail.src;
            console.log('Main image changed to: ' + thumbnail.src);
        });
    });
}

// Function to handle color selection
function selectColor(color) {
    console.log('Color selected: ' + color);
    alert('Color selected: ' + color);
}

// Example of how to use the selectColor function
// This part should be replaced with the actual event triggering the color selection
document.querySelectorAll('.color-option').forEach(colorOption => {
    colorOption.addEventListener('click', function() {
        selectColor(this.dataset.color);
    });
});
