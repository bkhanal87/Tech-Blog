// Form Handler for new post
async function newFormHandler(event) {
  event.preventDefault();

  // Abstract the post title and post text from the form
  const title = document.querySelector('input[name="entry-title"]').value;
  const entry_text = document.querySelector(
    'textarea[name="entry-text"]'
  ).value;

  // Route for adding a new post
  const response = await fetch(`/api/entries`, {
    method: "POST",
    body: JSON.stringify({
      title,
      entry_text,
    }),
    headers: {
      "Content-Type": "application/json",
    }
  });

  if (response.ok) {
    document.location.replace("/Dashboard");
  } else {
    console.log(err);
  }
}

document.querySelector(".new-entry-form").addEventListener("submit", newFormHandler);