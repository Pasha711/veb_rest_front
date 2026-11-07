const API_BASE_URL = 'http://127.0.0.1:8000/api';

function getAccessToken() {
    return localStorage.getItem('access_token');
}

function getRefreshToken() {
    return localStorage.getItem('refresh_token');
}

function setTokens(access, refresh) {
    if (access) localStorage.setItem('access_token', access);
    if (refresh) localStorage.setItem('refresh_token', refresh);
}

function clearAuth() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
}

function isAuthenticated() {
    return !!getAccessToken();
}


async function apiCall(endpoint, options = {}) {
    let accessToken = getAccessToken();

    options.headers = options.headers || {};
    if (accessToken) {
        options.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    options.contentType = 'application/json';

    try {
        return await $.ajax({
            url: `${API_BASE_URL}${endpoint}`,
            ...options
        });
    } catch (error) {
        if (error.status === 401 && getRefreshToken()) {
            const refreshed = await tryRefreshToken();
            if (refreshed) {
                options.headers['Authorization'] = `Bearer ${getAccessToken()}`;
                return await $.ajax({
                    url: `${API_BASE_URL}${endpoint}`,
                    ...options
                });
            } else {
                clearAuth();
                window.location.href = `login.html?next=${encodeURIComponent(window.location.pathname)}`;
            }
        }
        throw error;
    }
}


async function tryRefreshToken() {
    try {
        const response = await $.ajax({
            url: `${API_BASE_URL}/users/token/refresh/`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ refresh: getRefreshToken() })
        });
        setTokens(response.access);
        return true;
    } catch (e) {
        return false;
    }
}

function renderNavbar() {
    const $nav = $('#auth-nav');
    if (!$nav.length) return;

    if (isAuthenticated()) {
        const username = localStorage.getItem('username') || 'Користувач';
        $nav.html(`
            <span class="navbar-text me-3 text-light">Вітаємо, <strong>${username}</strong>!</span>
            <a href="dashboard.html" class="btn btn-outline-light me-2">Панель</a>
            <button id="logout-btn" class="btn btn-danger">Вийти</button>
        `);
        $('#logout-btn').on('click', function() {
            clearAuth();
            window.location.href = 'login.html';
        });
    } else {
        $nav.html(`
            <a href="login.html" class="btn btn-outline-light me-2">Увійти</a>
            <a href="register.html" class="btn btn-warning">Реєстрація</a>
        `);
    }
}

$(document).ready(function() {
    renderNavbar();
});
