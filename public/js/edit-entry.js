async function editFormHandler(event) {
  event.preventDefault();

  // Getting the post id from the URL
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  // Getting the post text and title from the form
  const title = document.querySelector('input[name="entry-title"]').value;
  const entry_text = document.querySelector(
    'textarea[name="entry-text"]'
  ).value;

  // Updating the post
  const response = await fetch(`/api/entries/${id})`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      entry_text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Redirecting to the dashboard page, if the edit action is successful. If not, error displayed
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}
