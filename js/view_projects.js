
document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('projectList');
    const noDataMsg = document.getElementById('noDataMsg');

    const projects = JSON.parse(localStorage.getItem('projects')) || [];

    if (projects.length === 0) {
        noDataMsg.textContent = "No projects have been posted yet.";
        noDataMsg.style.color = "gray";
        return;
    }

    projects.forEach(project => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <h3>${project.title}</h3>
            <p><strong>Description:</strong> ${project.description}</p>
            <p><strong>Required Skills:</strong> ${project.skills}</p>
            <p><strong>Budget:</strong> ₹${project.budget}</p>
            <p><strong>Deadline:</strong> ${project.deadline || "Not specified"}</p>
        `;

        container.appendChild(card);
    });
});
