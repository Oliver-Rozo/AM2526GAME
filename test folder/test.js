async function dialogueFromSceneIndex(sceneIndex) {
    const outputDiv = document.getElementById('output');

    try {
        // Step 1: Fetch the file
        const response = await fetch('../examplescenes.json');

        // Step 2: Check if the file exists
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Step 3: Parse the JSON
        const data = await response.json();

        // Step 4: Verify in Console
        console.log("Full Data Object:", data);

        // Step 5: Update the HTML page so you can see it
        outputDiv.innerHTML = `
            <p>${data.scenes[sceneIndex].text}</p>
        `;

    } catch (error) {
        console.error("The fetch failed:", error);
        outputDiv.style.color = "red";
    }
}

async function buttonsGenerate(sceneIndex) {
    const outputDiv = document.getElementById(`option-box`);

    try {
        // Step 1: Fetch the file
        const response = await fetch('../examplescenes.json');

        // Step 2: Check if the file exists
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Step 3: Parse the JSON
        const data = await response.json();

        // Step 4: Verify in Console
        console.log("Full Data Object:", data);

        // Step 5: Update the HTML page so you can see it
        scene = data.scenes[sceneIndex];
        function iterateButtonList(list) {
            for (let i = 0; i < list.length; i++) {
                outputDiv.innerHTML += `
                    <div class="option">${list[i].text}</div>
                `;
            }
        }
        iterateButtonList(scene.buttons);

    } catch (error) {
        console.error("The fetch failed:", error);
        outputDiv.style.color = "red";
    }
}

// Run the function
dialogueFromSceneIndex(1);
buttonsGenerate(1);