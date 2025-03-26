/* STEP 2: Bind the HEADER and the SECTION elements above to variables */
const header = document.querySelector("header");
const section = document.querySelector("section");

// STEP 3a: Create the asynchronous function populate()
async function populate() {
    // STEP 4b: Store the URL of a JSON file in a variable
    const url = "https://priyansht.github.io/25W-JavaScript-02-Week11/js/i-scream.json";

    try {
        // STEP 5: Create a new request object
        const request = new Request(url);

        // STEP 6: Make a network request with the fetch() function
        const response = await fetch(request);

        // STEP 7: Check for successful response and convert it to JSON
        if (!response.ok) {
            throw new Error(`Failed to fetch JSON: ${response.status}`);
        }

        const responseJson = await response.json();

        // STEP 8: Output the iScream JSON object to the console 
        console.log("JSON Data:", responseJson);

        // STEP 9a: Invoke the populateHeader function
        populateHeader(responseJson);

        // STEP 10a: Invoke the showTopFlavors function
        showTopFlavors(responseJson);

    } catch (error) {
        console.error("Error loading JSON data:", error);
        section.innerHTML = `<p>Error loading flavors. Please try again later.</p>`;
    }
}

// STEP 3b: Call the populate() function
populate();

/* STEP 9b: Build out the populateHeader() function */
function populateHeader(jsonBody) {
    // Clear any previous content
    header.innerHTML = "";

    // Create the H1 and P elements
    let h1 = document.createElement("h1");
    let p = document.createElement("p");

    // Use JSON data for the content
    h1.textContent = jsonBody.companyName;
    p.textContent = `Head Office: ${jsonBody.headOffice}, Established: ${jsonBody.established}, Active: ${jsonBody.active ? "Yes" : "No"}`;

    // Inject into the HEADER
    header.appendChild(h1);
    header.appendChild(p);
}

/* STEP 10b: Assemble the showTopFlavors() function */
function showTopFlavors(jsonBody) {
    // Clear the previous content or placeholder text
    section.innerHTML = "";  

    // STEP 10c: Bind the JSON topFlavors object to a variable
    const topFlavors = jsonBody.topFlavors;

    if (!topFlavors || topFlavors.length === 0) {
        section.innerHTML = `<p>No flavors available.</p>`;
        return;
    }

    // STEP 10d: Loop through the topFlavors object
    topFlavors.forEach(flavor => {
        // STEP 10e: Build HTML elements for the content: article, h2, image, p1, p2, list
        let article = document.createElement("article");
        let h2 = document.createElement("h2");
        let image = document.createElement("img");
        let p1 = document.createElement("p");
        let p2 = document.createElement("p");
        let list = document.createElement("ul");

        // STEP 10f: Set the textContent property for each of the above elements (except the UL), based on the JSON content
        h2.textContent = flavor.name;
        p1.textContent = `Calories: ${flavor.calories}`;
        p2.textContent = `Type: ${flavor.type}`;
        image.setAttribute("src", flavor.image);
        image.setAttribute("alt", `${flavor.name} image`);
        image.style.width = "200px";
        image.style.height = "200px";
        image.style.objectFit = "cover"; // Ensure images don't get distorted

        // STEP 10g: Build a loop for the ingredients array in the JSON
        flavor.ingredients.forEach(ingredient => {
            let listItem = document.createElement("li");
            listItem.textContent = ingredient;
            list.appendChild(listItem);
        });

        // STEP 10h: Append each complete ARTICLE element to the SECTION element
        article.appendChild(h2);
        article.appendChild(image);
        article.appendChild(p1);
        article.appendChild(p2);
        article.appendChild(list);

        section.appendChild(article);
    });

    // STEP 11: Add a 3rd flavor of ice cream to the local JSON file, making use of the /images/strawberry-sprinkle.svg image
    const newFlavor = {
        "name": "Strawberry Sprinkle",
        "calories": "150",
        "type": "Sorbet",
        "ingredients": ["Strawberries", "Sugar", "Lemon Juice", "Sprinkles"],
        "image": "/images/strawberry-sprinkle.svg"
    };

    topFlavors.push(newFlavor); // Adding the new flavor to the array

    // Optionally, you can re-render the updated flavors after adding a new one (to reflect changes)
    showTopFlavors(jsonBody);
}
