async function deleteFormHandler(event) {
    event.preventDefault();

    // To get the post id from the URL 
    const id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];

    // To delete the post with the async function
    const response = await fetch(`/api/entries/${id}`, {
        method: "DELETE"
    });

    // To redirect to the dashoard page, if the delete action is successful. If unsuccessful, error is displayed
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector(".delete-entry-btn").addEventListener("click", deleteFormHandler);