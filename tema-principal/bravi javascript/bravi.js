document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const themeId = urlParams.get('id');
    const themeForm = document.getElementById('theme-form');
    const themeNameInput = document.getElementById('theme-name');
    const primaryColorInput = document.getElementById('primary-color');
    const secondaryColorInput = document.getElementById('secondary-color');
    const successColorInput = document.getElementById('success-color');
    const dangerColorInput = document.getElementById('danger-color');
    const warningColorInput = document.getElementById('warning-color');
    const whiteColorInput = document.getElementById('white-color');
    let themes = JSON.parse(localStorage.getItem('themes')) || [];
    let currentTheme = themeId ? themes.find(theme => theme.id == themeId) : null;

    if (themeId && currentTheme) {
        populateForm(currentTheme);
    }

    function populateForm(theme) {
        themeNameInput.value = theme.name;
        primaryColorInput.value = theme.colors.primary;
        secondaryColorInput.value = theme.colors.secondary;
        successColorInput.value = theme.colors.success;
        dangerColorInput.value = theme.colors.danger;
        warningColorInput.value = theme.colors.warning;
        whiteColorInput.value = theme.colors.white;
    }

    themeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const updatedTheme = {
            id: themeId ? currentTheme.id : themes.length + 1,
            name: themeNameInput.value,
            colors: {
                primary: primaryColorInput.value,
                secondary: secondaryColorInput.value,
                success: successColorInput.value,
                danger: dangerColorInput.value,
                warning: warningColorInput.value,
                white: whiteColorInput.value,
            }
        };
        if (themeId) {
            themes = themes.map(theme => theme.id == themeId ? updatedTheme : theme);
        } else {
            themes.push(updatedTheme);
        }
        saveThemes(themes);
        window.location.href = 'bravi.html';
    });

    function saveThemes(themes) {
        localStorage.setItem('themes', JSON.stringify(themes));
    }
});
