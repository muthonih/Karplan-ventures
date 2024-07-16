document.addEventListener("DOMContentLoaded", function() {
    // Fade-in effect
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('show');
    });

    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Adding new staff emails
    const form = document.getElementById("add-email-form");
    const emailInput = document.getElementById("new-email");
    const emailList = document.getElementById("staff-emails");
    const errorMessage = document.getElementById("error-message");

    // Initial static emails
    const initialEmails = [
        "mkaranie@karplanventuresLLP.com",
    ];

    // Function to save emails to localStorage
    function saveEmails(emails) {
        localStorage.setItem('staffEmails', JSON.stringify(emails));
    }

    // Function to load emails from localStorage
    function loadEmails() {
        const storedEmails = localStorage.getItem('staffEmails');
        return storedEmails ? JSON.parse(storedEmails) : [];
    }

    // Function to render emails to the list
    function renderEmails(emails) {
        emailList.innerHTML = '';
        emails.forEach((email, index) => {
            const newEmailItem = document.createElement("li");
            const newEmailLink = document.createElement("a");
            newEmailLink.href = `mailto:${email}`;
            newEmailLink.textContent = email;
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.style.backgroundColor = "red";
            deleteButton.style.color = "white";
            deleteButton.style.padding = "5px 10px";
            deleteButton.style.border = "none";
            deleteButton.style.cursor = "pointer";
            deleteButton.addEventListener("click", () => {
                emails.splice(index, 1);
                saveEmails(emails);
                renderEmails(emails);
            });
            newEmailItem.appendChild(newEmailLink);
            newEmailItem.appendChild(deleteButton);
            emailList.appendChild(newEmailItem);
        });
    }

    // Combine initial static emails with any stored emails, avoiding duplicates
    const storedEmails = loadEmails();
    const allEmails = [...new Set([...initialEmails, ...storedEmails])]; // Using Set to remove duplicates
    saveEmails(allEmails); // Save unique emails to localStorage
    renderEmails(allEmails); // Render the unique emails

    // Add new email
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const newEmail = emailInput.value.trim();

        if (newEmail && newEmail.endsWith("@karplanventuresLLP.com") && !allEmails.includes(newEmail)) {
            allEmails.push(newEmail);
            saveEmails(allEmails);
            renderEmails(allEmails);
            emailInput.value = "";
            errorMessage.style.display = "none";
        } else {
            errorMessage.style.display = "block";
        }
    });
});
