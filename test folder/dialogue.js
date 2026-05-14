var dialogueArray = [];

async function dialogueFromScene(sceneIndex) {
    const outputDiv = document.getElementById('dialougeBox');

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

function changeScene(nextSceneIndex) {
    dialogueFromScene(nextSceneIndex);
    buttonsGenerate(nextSceneIndex);
}

async function buttonsGenerate(sceneIndex) {
    const outputDiv = document.getElementById(`optionBox`);

    try {
        const response = await fetch('../examplescenes.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Full Data Object:", data);

        outputDiv.innerHTML = "";
        const scene = data.scenes[sceneIndex];
        const list = scene.buttons;

        // Build the HTML once and assign it in a single operation
        let html = "";
        for (let i = 0; i < list.length; i++) {
            html += `<div class="option" data-index="${i}">${list[i].text}</div>`;
        }
        outputDiv.innerHTML = html;

        // Attach listeners after nodes exist
        const els = outputDiv.querySelectorAll('.option');
        els.forEach(el => {
            const idx = Number(el.dataset.index);
            el.addEventListener('click', () => {
                changeScene(list[idx].nextScene);
            });
        });

    } catch (error) {
        console.error("The fetch failed:", error);
        outputDiv.style.color = "red";
    }
}

// Run the function
dialogueFromScene(1);
buttonsGenerate(1);
