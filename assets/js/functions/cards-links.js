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

        const href = clickedLink.getAttribute('href') || '#';

        const target = clickedLink.getAttribute('target') || '_self';
        const linkLabel =
            clickedLink.textContent?.trim() ||
            clickedLink.getAttribute('aria-label') ||
            clickedLink.querySelector('img')?.getAttribute('alt') ||
            '';
        const linkedImage = clickedLink.querySelector('img');
        const image = linkedImage
            ? {
                  alt: linkedImage.getAttribute('alt') || '',
                  src: linkedImage.getAttribute('src') || '',
                  srcset: linkedImage.getAttribute('srcset') || ''
              }
            : null;

        console.log('[Cards Block] link clicked', {
            text: linkLabel,
            href,
            target,
            image
        });

        // Keep anchors as semantic click targets for logging only.
        event.preventDefault();
    });
};
