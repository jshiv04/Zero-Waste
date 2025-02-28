
const { Client, Databases } = Appwrite;
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6627d17a708b0b4549c9');

const databases = new Databases(client);

// Define an object to map each selected item to its corresponding image URL and dimensions
var imagesData = {
    "Plastics": {url: "plastic_img.jpeg", width: "200", height: "200"},
    "Paper": {url: "paper_img.jpeg", width: "200", height: "200"},
    "Fabrics": {url: "fabric_img.jpeg", width: "200", height: "200"}, // Default dimensions for other items
    //"Others": {url: "other.jpg", width: "", height: ""} 
  };
  
  // Get the modal
  var modal = document.getElementById("myModal");
  
  // Get the button that opens the modal
  var btn = document.getElementById("submitButton");
  
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  
  // When the user clicks the button, open the modal
  btn.onclick = function() {
    // Check if any checkbox is checked
    var plasticsChecked = document.getElementById("plastics").checked;
    var paperChecked = document.getElementById("paper").checked;
    var fabricsChecked = document.getElementById("fabrics").checked;
    var othersChecked = document.getElementById("others").checked;
    
    if (!plasticsChecked && !paperChecked && !fabricsChecked && !othersChecked) {
      document.getElementById("demo").innerHTML="Please select at least one option.";
    } else {
      // Clear the previous images
      document.getElementById("imageContainer").innerHTML = "";
  
      // Iterate over the checked checkboxes and display the corresponding images
      if (plasticsChecked) {
        displayImage("Plastics");
      }
      if (paperChecked) {
        displayImage("Paper");
      }
      if (fabricsChecked) {
        displayImage("Fabrics");
      }
      if (othersChecked) {
        displayImage("Others");
      }
  
      modal.style.display = "block";
    }
  }
  
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  
  // Proceed to recycle button
  document.getElementById("reuse").onclick = function() {
    // Add your logic here to proceed with recycling
    window.location.href = "reuse.html";
  }
  
  // Skip button
  document.getElementById("recycle").onclick = function() {
    // Add your logic here for skipping
    window.location.href = "recycle.html";
  }

    function generateUUID() {
      let uuid = '';
      for (let i = 0; i < 32; i++) {
        let random = (Math.random() * 16) | 0;
        if (i === 8 || i === 12 || i === 16 || i === 20) {
          uuid += '-';
        }
        uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
      }
      return uuid;
    }
  
  // Function to display image for the selected item
  function displayImage(item) {
    var imageData = imagesData[item];
    var img = document.createElement("img");
    img.src = imageData.url;
    img.width = imageData.width; // Set the width
    img.height = imageData.height; // Set the height
    document.getElementById("imageContainer").appendChild(img);
  }

  function display1() {
    var plasticQuantity = parseInt(document.getElementById("plasticQuantity").value);
    var paperQuantity = parseInt(document.getElementById("paperQuantity").value);
    var fabricQuantity = parseInt(document.getElementById("fabricQuantity").value);

    var amount = plasticQuantity*35 + paperQuantity*15 + fabricQuantity*120;

    document.getElementById("totalQuantity").innerHTML = "Total amount: " + amount;
}
function validateUPI() {
    var upiIdInput = document.getElementById("upiIdInput");
    var upiIdErrorMessage = document.getElementById("upiIdErrorMessage");
    var upiIdPattern = /(^.*@oksbi.*$)|(^.*@okhdfc.*$)|(^.*@okicici.*$)/;

    if (upiIdPattern.test(upiIdInput.value)) {
      upiIdErrorMessage.textContent = ""; // Clear error message if UPI ID is valid
    } else {
      upiIdErrorMessage.textContent = "Invalid UPI ID format. UPI ID must contain '@ok--bankName--";
    }
  }
  function toggleMenu() {
    var menu = document.querySelector('.menu');
    menu.classList.toggle('show');
  }
  document.addEventListener('click', function(event) {
    var menu = document.querySelector('.menu');
    var menuIcon = document.querySelector('.menu-icon');
    var isClickInsideMenu = menu.contains(event.target) || menuIcon.contains(event.target);
  
    if (menu.classList.contains('show') && !isClickInsideMenu) {
      menu.classList.remove('show');
    }
  });
  function submitForm() {
    // Code to submit the form data to the server goes here

  // Get the values from the input fields
  var plasticQuantity = document.getElementById("plasticQuantity").value;
  var paperQuantity = document.getElementById("paperQuantity").value;
  var fabricQuantity = document.getElementById("fabricQuantity").value;
  var upiId = document.getElementById("upiIdInput").value;

  // Create a formatted message with the input values
  var submittedContent = `
    <h2>Your Recycling Details</h2>
    <p><strong>Plastic Quantity:</strong> ${plasticQuantity} grams</p>
    <p><strong>Paper Quantity:</strong> ${paperQuantity} kilograms</p>
    <p><strong>Fabric Quantity:</strong> ${fabricQuantity} grams</p>
    <p><strong>UPI ID:</strong> ${upiId}</p>
  `;

    const databases = new Databases(client);
    const uuid = generateUUID();
    console.log(uuid); //

     // Create a new Date object to get the current date and time
    const currentDate = new Date();
    
    // Format the date and time as a string
    const formattedDate = currentDate.toISOString();
    
    var docJson = {
        plasticQuantity: plasticQuantity,
        paperQuantity: paperQuantity,
        fabricQuantity: fabricQuantity,
        upiId: upiId,
        CreateDateTime: formattedDate
    };

    console.log(docJson); //
      
    const promise = databases.createDocument('6627d48b11903bca0210', '6627d4a497ca264a5c78', uuid, docJson);
    
    promise.then(function (response) {
        console.log(response); // Success
    }, function (error) {
        console.log(error); // Failure
    });      

  // Set the modal content
  document.querySelector(".submitted-data").innerHTML = submittedContent;      
  
    // Display the modal
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  
    // Close the modal when the user clicks the close button
    var closeBtn = document.getElementsByClassName("close")[0];
    closeBtn.onclick = function() {
      modal.style.display = "none";
    }
  
    // Close the modal when the user clicks anywhere outside of it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }
  


  
