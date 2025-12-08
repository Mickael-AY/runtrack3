const footer = document.createElement("footer");
document.body.appendChild(footer);

window.addEventListener("scroll", () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (window.scrollY / total) * 100;

    footer.style.background = `linear-gradient(90deg, #072251ff ${pct}%, #4fa3d1 ${pct + 20}%, #69c2efff 100%)`;
});