export const setLoader = (value) => {
    if (value) {
        document.documentElement.style.setProperty("--loader", "flex");
    } else {
        document.documentElement.style.setProperty("--loader", "none");
    }
}