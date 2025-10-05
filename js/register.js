
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('freelancerForm');
    const message = document.getElementById('message');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const skill = document.getElementById('skill').value.trim();
        const experience = document.getElementById('experience').value.trim();
        const rate = document.getElementById('rate').value.trim();
        const bio = document.getElementById('bio').value.trim();

        const newFreelancer = {
            id: Date.now(),
            name,
            email,
            skill,
            experience,
            rate,
            bio
        };

        let freelancers = JSON.parse(localStorage.getItem('freelancers')) || [];


        freelancers.push(newFreelancer);

        localStorage.setItem('freelancers', JSON.stringify(freelancers));


        message.textContent = "Freelancer registered successfully!";
        message.style.color = "green";


        form.reset();

        setTimeout(() => {
            message.textContent = "";
        }, 3000);
    });
});
