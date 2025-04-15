document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('attachment');
    const fileNameDisplay = document.getElementById('fileName');
    const successMessage = document.getElementById('successMessage');

    // File input handling
    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            const fileName = this.files[0].name;
            fileNameDisplay.textContent = `Selected file: ${fileName}`;
            fileNameDisplay.style.display = 'block';
        } else {
            fileNameDisplay.style.display = 'none';
        }
    });

    // Handle form submission
    document.getElementById('emailForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission
        const form = event.target;
        const formData = new FormData(form);

        // Validate file size and type
        const file = fileInput.files[0];
        if (file) {
            const maxSize = 10 * 1024 * 1024; // 10MB
            const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'audio/mpeg', 'audio/wav'];

            if (file.size > maxSize) {
                alert('The file size exceeds the 10MB limit. Please upload a smaller file.');
                return;
            }

            if (!allowedTypes.includes(file.type)) {
                alert('Unsupported file type. Please upload an image, audio, or PDF file.');
                return;
            }
        }

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                successMessage.style.display = 'block'; // Show success message
                form.reset(); // Reset the form
                fileNameDisplay.style.display = 'none'; // Hide file name display
            } else {
                const errorData = await response.json();
                console.error('Error response:', errorData); // Log error details
                alert('There was an error sending your message. Please try again.');
            }
        } catch (error) {
            console.error('Unexpected error:', error); // Log unexpected errors
            alert('An unexpected error occurred. Please try again.');
        }
    });

    // Input animation
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
});