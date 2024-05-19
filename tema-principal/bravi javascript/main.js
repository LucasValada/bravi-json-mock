document.addEventListener('DOMContentLoaded', () => {
    const themesList = document.getElementById('themes-list');
    const themeSearch = document.getElementById('theme-search');
    const addThemeBtn = document.getElementById('add-theme-btn');
    let themes = JSON.parse(localStorage.getItem('themes')) || [];

    if (themes.length === 0) {
        fetch('mock/themes.json')
            .then(response => response.json())
            .then(data => {
                themes = data;
                saveThemes(themes);
                renderThemes(themes);
            });
    } else {
        renderThemes(themes);
    }

    function renderThemes(themes) {
        themesList.innerHTML = '';
        themes.forEach(theme => {
            const themeCard = document.createElement('div');
            themeCard.className = 'col-lg-4 col-12 mb-4';
            themeCard.innerHTML = `
                <div class="card m-2">
                    <img src="mock/assets/thumbnail.png" class="card-img-top" alt="${theme.name} thumbnail">
                    <div class="card-body principal-card__content">
                        <h5 class="card-title">${theme.name}</h5>
                        <div class="theme-colors mb-3">
                            <div class="dots" style="background-color: ${theme.colors.primary}; width: 20px; height: 20px; display: inline-block;"></div>
                            <div class="dots" style="background-color: ${theme.colors.secondary}; width: 20px; height: 20px; display: inline-block;"></div>
                            <div class="dots" style="background-color: ${theme.colors.success}; width: 20px; height: 20px; display: inline-block;"></div>
                            <div class="dots" style="background-color: ${theme.colors.danger}; width: 20px; height: 20px; display: inline-block;"></div>
                            <div class="dots" style="background-color: ${theme.colors.warning}; width: 20px; height: 20px; display: inline-block;"></div>
                            <div class="dots" style="background-color: ${theme.colors.white}; width: 20px; height: 20px; display: inline-block;"></div>
                        </div>
                        <button class="btn btn-success apply-btn">Aplicar tema</button>
                        <button class="btn btn-warning edit-btn">Editar tema</button>
                        <button class="btn btn-danger delete-btn">Deletar tema</button>
                    </div>
                </div>
            `;
            themesList.appendChild(themeCard);

            themeCard.querySelector('.apply-btn').addEventListener('click', () => applyTheme(theme));
            themeCard.querySelector('.edit-btn').addEventListener('click', () => editTheme(theme.id));
            themeCard.querySelector('.delete-btn').addEventListener('click', () => deleteTheme(theme.id));
        });
    }

    function applyTheme(theme) {
        document.documentElement.style.setProperty('--primary-color', theme.colors.primary);
        document.documentElement.style.setProperty('--secondary-color', theme.colors.secondary);
        document.documentElement.style.setProperty('--success-color', theme.colors.success);
        document.documentElement.style.setProperty('--danger-color', theme.colors.danger);
        document.documentElement.style.setProperty('--warning-color', theme.colors.warning);
        document.documentElement.style.setProperty('--white-color', theme.colors.white);

        // Aplicando as cores ao body
        document.body.style.setProperty('--primary-color', theme.colors.primary);
        document.body.style.setProperty('--secondary-color', theme.colors.secondary);
        document.body.style.setProperty('--success-color', theme.colors.success);
        document.body.style.setProperty('--danger-color', theme.colors.danger);
        document.body.style.setProperty('--warning-color', theme.colors.warning);
        document.body.style.setProperty('--white-color', theme.colors.warning);
    }

    function editTheme(themeId) {
        window.location.href = `edit.html?id=${themeId}`;
    }

    function deleteTheme(themeId) {
        themes = themes.filter(theme => theme.id !== themeId);
        saveThemes(themes);
        renderThemes(themes);
    }

    function saveThemes(themes) {
        localStorage.setItem('themes', JSON.stringify(themes));
    }

    themeSearch.addEventListener('input', () => {
        const searchTerm = themeSearch.value.toLowerCase();
        const filteredThemes = themes.filter(theme => theme.name.toLowerCase().includes(searchTerm));
        renderThemes(filteredThemes);
    });

    addThemeBtn.addEventListener('click', () => {
        window.location.href = 'edit.html';
    });
});
