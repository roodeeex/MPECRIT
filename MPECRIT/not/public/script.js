document.getElementById('productionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const subject = document.getElementById('subject').value;
    const level = document.getElementById('level').value;

    fetch('/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ subject, level })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('output').textContent = data.generatedText;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
