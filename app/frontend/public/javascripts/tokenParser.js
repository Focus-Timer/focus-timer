document.addEventListener("DOMContentLoaded", () => {
    // Function to extract tokens from URL
    function getTokensFromUrl() {
        const hash = window.location.hash.substr(1);
        const result = hash.split('&').reduce((res, item) => {
            const parts = item.split('=');
            res[parts[0]] = parts[1];
            return res;
        }, {});

        // Clear the URL hash to prevent exposing tokens
        window.history.replaceState({}, document.title, window.location.pathname);

        return result;
    }

    // Extract tokens
    const tokens = getTokensFromUrl();
    if (tokens.id_token && tokens.access_token) {
        // Store tokens securely
        sessionStorage.setItem('id_token', tokens.id_token);
        sessionStorage.setItem('access_token', tokens.access_token);

        // You can now use these tokens for API calls
        console.log('Tokens extracted and stored securely');
    } else {
        console.error('Tokens not found in URL');
    }
});