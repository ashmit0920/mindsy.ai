async function uploadDocument() {
    const documentInput = document.getElementById('documentInput').files[0];
    if (!documentInput) {
        alert("Please select a document to upload.");
        return;
    }

    const formData = new FormData();
    formData.append("document", documentInput);

    try {
        const response = await fetch("/upload", {
            method: "POST",
            body: formData
        });
        const data = await response.json();
        alert("Document uploaded successfully!");
    } catch (error) {
        console.error("Error uploading document:", error);
        alert("Failed to upload document.");
    }
}

async function sendQuery() {
    const userQuery = document.getElementById("userQuery").value;
    if (!userQuery) {
        alert("Please enter a query.");
        return;
    }

    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML += `<div><strong>You:</strong> ${userQuery}</div>`;

    try {
        const response = await fetch("/query", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: userQuery })
        });
        const data = await response.json();
        chatBox.innerHTML += `<div><strong>LLM:</strong> ${data.response}</div>`;
    } catch (error) {
        console.error("Error sending query:", error);
        chatBox.innerHTML += `<div><strong>Error:</strong> Failed to retrieve response.</div>`;
    }

    document.getElementById("userQuery").value = "";
}
