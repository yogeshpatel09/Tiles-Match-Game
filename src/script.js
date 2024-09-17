document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("reset").addEventListener("click", function () {
    window.location.reload();
  });

  // Track flipped boxes and the number of flips
  let flippedBoxes = [];
  let disableClick = false;

  // Function to generate random color
  function randomColor() {
    let letters = "ABCDEF0123456789";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Function to create pairs of random colors
  function ColorPairs(numberOfPairs) {
    let colorbox = [];
    for (let i = 0; i < numberOfPairs; i++) {
      let color = randomColor();
      colorbox.push(color, color); // Add the color twice for the pair
    }
    // Shuffle the colors array
    return colorbox.sort(() => 0.5 - Math.random());
  }

  // Function to create boxes with color pairs and add flip functionality
  function createBox(numberOfBoxes) {
    const container = document.getElementById("grid-container");
    container.innerHTML = ""; // Clear previous boxes

    const numberOfPairs = numberOfBoxes / 2;
    const colorbox = ColorPairs(numberOfPairs);

    for (let i = 0; i <= numberOfBoxes; i++) {
      const box = document.createElement("div");
      box.id = `box${i}`;
      box.className =
        "grid rounded-lg w-[100px] h-[100px] text-center bg-[#bcbcbb]";

      // Save the assigned color in a data attribute
      box.setAttribute("data-color", colorbox[i]);

      // Initially hide the color (set to neutral background)
      box.style.backgroundColor = "#bcbcbb";

      // Add event listener to flip the box on click and show color
      box.addEventListener("click", function () {
        if (!disableClick && flippedBoxes.length < 2) {
          flipBox(box);
          flippedBoxes.push(box);
          if (flippedBoxes.length === 2) {
            checkMatch();
          }
        }
      });

      container.appendChild(box);
    }
  }

  // Function to flip the box (reveal color)
  function flipBox(box) {
    const hiddenColor = "rgb(188, 188, 187)"; // Neutral color when hidden
    const assignedColor = box.getAttribute("data-color");

    // Reveal the assigned color
    box.style.backgroundColor = assignedColor;
  }

  // Function to check if two flipped boxes match
  function checkMatch() {
    const [box1, box2] = flippedBoxes;

    // Disable further clicks until the comparison is done
    disableClick = true;

    // Compare colors of the two boxes
    if (box1.getAttribute("data-color") === box2.getAttribute("data-color")) {
      // Colors match, keep them open
      flippedBoxes = [];
      disableClick = false;
    } else {
      // Colors don't match, flip them back after a short delay
      setTimeout(() => {
        flipBack(box1);
        flipBack(box2);
        flippedBoxes = [];
        console.log(flippedBoxes);

        disableClick = false;
      }, 500); // 1 second delay before flipping back
    }
  }

  // Function to flip the box back (hide color)
  function flipBack(box) {
    const hiddenColor = "rgb(188, 188, 187)"; // Neutral color when hidden
    box.style.backgroundColor = hiddenColor;
  }

  // Event listeners for difficulty buttons
  document.getElementById("Easy").addEventListener("click", function () {
    createBox(11); // 6 pairs of colors
  });

  document.getElementById("Medium").addEventListener("click", function () {
    createBox(16); // 8 pairs of colors
  });

  document.getElementById("Hard").addEventListener("click", function () {
    createBox(24); // 12 pairs of colors
  });
});
