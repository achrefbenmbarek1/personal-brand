// Navigation functionality
let isMobileMenuOpen = false;

// Smooth scrolling to sections
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
    // Close mobile menu if open
    if (isMobileMenuOpen) {
        toggleMobileMenu();
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    isMobileMenuOpen = !isMobileMenuOpen;
    
    if (isMobileMenuOpen) {
        mobileMenu.classList.add('open');
    } else {
        mobileMenu.classList.remove('open');
    }
}

// Handle navigation scroll effect
function handleNavScroll() {
    const navbar = document.getElementById('navbar');
    const scrolled = window.scrollY > 100;
    
    if (scrolled) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Form validation and submission
function validateForm() {
    const form = document.getElementById('contact-form');
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    
    // Validate name
    if (name.length < 2) {
        document.getElementById('name-error').textContent = 'Name must be at least 2 characters';
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address';
        isValid = false;
    }
    
    // Validate subject
    if (subject.length < 5) {
        document.getElementById('subject-error').textContent = 'Subject must be at least 5 characters';
        isValid = false;
    }
    
    // Validate message
    if (message.length < 10) {
        document.getElementById('message-error').textContent = 'Message must be at least 10 characters';
        isValid = false;
    }
    
    return isValid;
}

// Show toast notification
function showToast(title, description, type = 'success') {
    const toast = document.getElementById('toast');
    const toastIcon = toast.querySelector('.toast-icon i');
    const toastTitle = toast.querySelector('.toast-title');
    const toastDescription = toast.querySelector('.toast-description');
    
    // Update content
    toastTitle.textContent = title;
    toastDescription.textContent = description;
    
    // Update icon based on type
    if (type === 'error') {
        toastIcon.className = 'fas fa-exclamation-circle';
        toast.classList.add('error');
    } else {
        toastIcon.className = 'fas fa-check-circle';
        toast.classList.remove('error');
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Hide after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

// Handle form submission
async function handleFormSubmit(event) {
    event.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    const submitButton = document.querySelector('#contact-form button[type="submit"]');
    const buttonText = submitButton.querySelector('span');
    const originalText = buttonText.textContent;
    
    // Show loading state
    submitButton.disabled = true;
    buttonText.textContent = 'Sending...';
    
    try {
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        showToast(
            'Message sent successfully!',
            "Thank you for reaching out. I'll get back to you soon."
        );
        
        // Reset form
        document.getElementById('contact-form').reset();
        
    } catch (error) {
        showToast(
            'Error sending message',
            'Please try again or contact me directly via email.',
            'error'
        );
    } finally {
        // Reset button state
        submitButton.disabled = false;
        buttonText.textContent = originalText;
    }
}

// Close mobile menu when clicking outside
function handleClickOutside(event) {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (isMobileMenuOpen && 
        !mobileMenu.contains(event.target) && 
        !mobileMenuBtn.contains(event.target)) {
        toggleMobileMenu();
    }
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Scroll event for navigation
    window.addEventListener('scroll', handleNavScroll);
    
    // Form submission
    document.getElementById('contact-form').addEventListener('submit', handleFormSubmit);
    
    // Click outside to close mobile menu
    document.addEventListener('click', handleClickOutside);
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && isMobileMenuOpen) {
            toggleMobileMenu();
        }
    });
    
    // Close toast when clicked
    document.getElementById('toast').addEventListener('click', function() {
        this.classList.remove('show');
    });
});

// Handle window resize
window.addEventListener('resize', function() {
    // Close mobile menu on desktop
    if (window.innerWidth >= 768 && isMobileMenuOpen) {
        toggleMobileMenu();
    }
});
