let messageDiv;
let tooltipTriggerList;
let tooltipList;

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('[data-toggle="collapse"]');

    tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    messageDiv = document.getElementById('message');
    messageDiv.style.display = 'none';

    const hideMessage = () => {
        messageDiv.style.display = 'none';
    }

    if(messageDiv.textContent.trim().length > 0) {
    
        setTimeout(() => {
            messageDiv.style.display = 'block';
            setTimeout(hideMessage, 10000);
        }, 0);
    }

    buttons.forEach((button) => {
        button.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                if (targetElement.classList.contains('show')) {
                    targetElement.classList.remove('show');
                } else {
                    targetElement.classList.add('show');
                }
            }
        });
    });

});