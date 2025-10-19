// js/view_freelancers.js
// Full replacement file — safe, self-contained, uses per-item deletion only.

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('freelancerList');
  const noDataMsg = document.getElementById('noDataMsg');

  // Utility to escape text for safe insertion
  function escapeHtml(unsafe) {
    if (unsafe === undefined || unsafe === null) return '';
    return String(unsafe)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Load list from localStorage
  function loadFreelancers() {
    return JSON.parse(localStorage.getItem('freelancers')) || [];
  }

  // Save list to localStorage
  function saveFreelancers(list) {
    localStorage.setItem('freelancers', JSON.stringify(list));
  }

  // Delete freelancer by id
  function deleteFreelancerById(id) {
    const list = loadFreelancers();
    const index = list.findIndex(item => String(item.id) === String(id));
    if (index === -1) return false;
    // Confirm with the user
    const confirmed = confirm(`Delete freelancer "${list[index].name}" ? This cannot be undone for that item.`);
    if (!confirmed) return false;
    list.splice(index, 1);
    saveFreelancers(list);
    renderFreelancers();
    return true;
  }

  // Render all freelancer cards
  function renderFreelancers() {
    container.innerHTML = '';
    noDataMsg.textContent = '';
    const freelancers = loadFreelancers();

    if (!Array.isArray(freelancers) || freelancers.length === 0) {
      noDataMsg.textContent = "No freelancers registered yet.";
      noDataMsg.style.color = "gray";
      return;
    }

    freelancers.forEach((freelancer) => {
      const card = document.createElement('div');
      card.className = 'card';

      // Build inner content safely
      const name = escapeHtml(freelancer.name);
      const email = escapeHtml(freelancer.email);
      const skill = escapeHtml(freelancer.skill);
      const experience = escapeHtml(freelancer.experience);
      const rate = escapeHtml(freelancer.rate);
      const bio = escapeHtml(freelancer.bio);

      card.innerHTML = `
        <h3>${name}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Skill:</strong> ${skill}</p>
        <p><strong>Experience:</strong> ${experience} years</p>
        <p><strong>Rate:</strong> ₹${rate}/hr</p>
        <p><strong>Bio:</strong> ${bio}</p>
      `;

      // Create delete button (styled using inline styles to avoid requiring CSS edits)
      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = 'Delete';
      // Inline styles for a distinct danger look (works with existing button transitions)
      deleteBtn.style.background = 'linear-gradient(90deg,#ff6b6b,#ef4444)';
      deleteBtn.style.color = '#fff';
      deleteBtn.style.border = 'none';
      deleteBtn.style.padding = '8px 12px';
      deleteBtn.style.borderRadius = '10px';
      deleteBtn.style.cursor = 'pointer';
      deleteBtn.style.marginTop = '10px';
      deleteBtn.setAttribute('aria-label', `Delete freelancer ${name}`);
      deleteBtn.addEventListener('click', () => deleteFreelancerById(freelancer.id));

      // Append delete button
      card.appendChild(deleteBtn);
      container.appendChild(card);
    });
  }

  // Initial render
  renderFreelancers();

  // Expose for debugging if needed (optional)
  window._fc_renderFreelancers = renderFreelancers;
});
