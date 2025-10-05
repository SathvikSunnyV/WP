
document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('freelancerList');
    const noDataMsg = document.getElementById('noDataMsg');

    const freelancers = JSON.parse(localStorage.getItem('freelancers')) || [];

    if (freelancers.length === 0) {
        noDataMsg.textContent = "No freelancers registered yet.";
        noDataMsg.style.color = "gray";
        return;
    }

    freelancers.forEach(freelancer => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <h3>${freelancer.name}</h3>
            <p><strong>Email:</strong> ${freelancer.email}</p>
            <p><strong>Skill:</strong> ${freelancer.skill}</p>
            <p><strong>Experience:</strong> ${freelancer.experience} years</p>
            <p><strong>Rate:</strong> ₹${freelancer.rate}/hr</p>
            <p><strong>Bio:</strong> ${freelancer.bio}</p>
        `;

        container.appendChild(card);
    });
});
