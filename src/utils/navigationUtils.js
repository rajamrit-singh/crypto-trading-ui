export const changeCurrentTabAndNavigateTo = (routeName) => {
    const currentUrl = window.location.pathname;
    const newUrl = currentUrl.replace(/\/[^/]*$/, routeName);
    return newUrl;
}

export const getCoinIdFromUrl = () => {
    const url = window.location.href;
    return url.slice(url.lastIndexOf('/') + 1);
}

export const getUserIdFromUrl = () => {
    const path = window.location.pathname;
    const pathParts = path.split('/');
    const id = pathParts[1];
    return id;
}