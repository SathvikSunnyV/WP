
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('projectForm');
    const message = document.getElementById('message');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();
        const skills = document.getElementById('skills').value.trim();
        const budget = document.getElementById('budget').value.trim();
        const deadline = document.getElementById('deadline').value;

        const newProject = {
            id: Date.now(),
            title,
            description,
            skills,
            budget,
            deadline
        };

        let projects = JSON.parse(localStorage.getItem('projects')) || [];

        projects.push(newProject);

        localStorage.setItem('projects', JSON.stringify(projects));

        message.textContent = "Project posted successfully!";
        message.style.color = "green";

        form.reset();

        setTimeout(() => {
            message.textContent = "";
        }, 3000);
    });
});
