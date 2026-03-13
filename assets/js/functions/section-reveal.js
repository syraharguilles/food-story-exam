const revealSection = (section) => {
    section.classList.add('is-visible');
};

export const sectionReveal = () => {
    const revealSections = document.querySelectorAll('.js-section-reveal');

    if (!revealSections.length) {
        return;
    }

    // Fallback for browsers without IntersectionObserver: show all sections immediately.
    if (!('IntersectionObserver' in window)) {
        revealSections.forEach(revealSection);
        return;
    }

    const observer = new IntersectionObserver(
        (entries, activeObserver) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                revealSection(entry.target);
                // Stop observing once revealed to avoid repeated animation work.
                activeObserver.unobserve(entry.target);
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -10% 0px'
        }
    );

    revealSections.forEach((section) => {
        observer.observe(section);
    });
};