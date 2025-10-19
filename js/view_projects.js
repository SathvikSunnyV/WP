// js/view_projects.js
// Full replacement file — safe, self-contained, uses per-item deletion only.

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('projectList');
  const noDataMsg = document.getElementById('noDataMsg');

  function escapeHtml(unsafe) {
    if (unsafe === undefined || unsafe === null) return '';
    return String(unsafe)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function loadProjects() {
    return JSON.parse(localStorage.getItem('projects')) || [];
  }

  function saveProjects(list) {
    localStorage.setItem('projects', JSON.stringify(list));
  }

  function deleteProjectById(id) {
    const list = loadProjects();
    const index = list.findIndex(item => String(item.id) === String(id));
    if (index === -1) return false;
    const confirmed = confirm(`Delete project "${list[index].title}" ? This will remove the project for all users.`);
    if (!confirmed) return false;
    list.splice(index, 1);
    saveProjects(list);
    renderProjects();
    return true;
  }

  function renderProjects() {
    container.innerHTML = '';
    noDataMsg.textContent = '';
    const projects = loadProjects();

    if (!Array.isArray(projects) || projects.length === 0) {
      noDataMsg.textContent = "No projects have been posted yet.";
      noDataMsg.style.color = "gray";
      return;
    }

    projects.forEach((project) => {
      const card = document.createElement('div');
      card.className = 'card';

      const title = escapeHtml(project.title);
      const description = escapeHtml(project.description);
      const skills = escapeHtml(project.skills);
      const budget = escapeHtml(project.budget);
      const deadline = escapeHtml(project.deadline) || 'Not specified';

      card.innerHTML = `
        <h3>${title}</h3>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Required Skills:</strong> ${skills}</p>
        <p><strong>Budget:</strong> ₹${budget}</p>
        <p><strong>Deadline:</strong> ${deadline}</p>
      `;

      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = 'Delete';
      deleteBtn.style.background = 'linear-gradient(90deg,#ff6b6b,#ef4444)';
      deleteBtn.style.color = '#fff';
      deleteBtn.style.border = 'none';
      deleteBtn.style.padding = '8px 12px';
      deleteBtn.style.borderRadius = '10px';
      deleteBtn.style.cursor = 'pointer';
      deleteBtn.style.marginTop = '10px';
      deleteBtn.setAttribute('aria-label', `Delete project ${title}`);
      deleteBtn.addEventListener('click', () => deleteProjectById(project.id));

      card.appendChild(deleteBtn);
      container.appendChild(card);
    });
  }

  // Initial render
  renderProjects();

  // Expose for debugging if needed (optional)
  window._fc_renderProjects = renderProjects;
});
