export const cardsLinkLogger = () => {
    const cardsBlock = document.querySelector('.js-cards-list');

    if (!cardsBlock) {
        return;
    }

    // Event delegation keeps one listener for all links in this cards block.
    cardsBlock.addEventListener('click', (event) => {
        const clickedLink = event.target.closest('.js-cards-link');

        if (!clickedLink || !cardsBlock.contains(clickedLink)) {
            return;
        }

        const href = clickedLink.getAttribute('href');

        if (!href) {
            return;
        }

        const target = clickedLink.getAttribute('target') || '_self';

        console.log('[Cards Block] link clicked', {
            text: clickedLink.textContent?.trim() || '',
            href: clickedLink.href,
            target
        });

        // Delay navigation until after logging so the click data is captured.
        event.preventDefault();

        if (target === '_blank') {
            window.open(href, '_blank', 'noopener,noreferrer');
            return;
        }

        window.location.assign(href);
    });
};
