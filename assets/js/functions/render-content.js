// Reviewer note:
// This renderer maps CMS-like data into DOM containers.
// It supports runtime updates and graceful fallbacks if expected data/containers are missing.
import { pageContent } from '../data/content';

const LOG_PREFIX = '[renderContent]';

const escapeHtml = (value = '') =>
    String(value).replace(/[&<>"']/g, (character) => {
        const entities = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };

        return entities[character];
    });

const createStoryFigureMarkup = (imageData, index) => {
    const figureClass =
        index === 0 ? 'gallery-block__figure gallery-block__figure--row-span-2' : 'gallery-block__figure';

    return `
        <figure class="${figureClass}">
            <img
                class="gallery-block__image js-image-modal"
                src="${escapeHtml(imageData?.src || '')}"
                srcset="${escapeHtml(imageData?.srcset || '')}"
                alt="${escapeHtml(imageData?.alt || '')}"
            >
            <figcaption class="gallery-block__caption">Click me</figcaption>
        </figure>
    `;
};

const renderStoryMedia = (images) => {
    const mediaGrid = document.querySelector('.js-gallery-media-grid');

    if (!mediaGrid) {
        console.error(`${LOG_PREFIX} Missing .js-gallery-media-grid container.`);
        return;
    }

    if (!Array.isArray(images) || !images.length) {
        console.warn(`${LOG_PREFIX} Story images are missing or empty.`);
        if (!mediaGrid.innerHTML.trim()) {
            mediaGrid.innerHTML = '<p class="gallery-block__text">Story images are currently unavailable.</p>';
        }
        return;
    }

    mediaGrid.innerHTML = images.map((imageData, index) => createStoryFigureMarkup(imageData, index)).join('');
};

const renderStoryCopy = (story) => {
    const storyContent = document.querySelector('.js-gallery-content');

    if (!storyContent) {
        console.error(`${LOG_PREFIX} Missing .js-gallery-content container.`);
        return;
    }

    const safeStory = story && typeof story === 'object' ? story : {};
    const safeTitle = safeStory.title || 'Untitled story';
    const safeDescription = safeStory.description || 'Story description is currently unavailable.';
    const safeSubtitle = safeStory.subtitle || '';
    const safeHighlight = safeStory.highlight || '';

    if (!safeStory.title || !safeStory.description) {
        console.warn(`${LOG_PREFIX} Story title/description is missing. Using fallback copy.`);
    }

    storyContent.innerHTML = `
        <div class="gallery-block__title-wrap">
            <h1 class="gallery-block__title">${escapeHtml(safeTitle)}</h1>
        </div>
        <p class="gallery-block__text">${escapeHtml(safeDescription)}</p>
        <span class="gallery-block__subtitle">${escapeHtml(safeSubtitle)}</span>
        <p class="gallery-block__text gallery-block__text--padding-0 gallery-block__text--bold">
            <strong>${escapeHtml(safeHighlight)}</strong>
        </p>
    `;
};

const createCardItemMarkup = (item) => {
    const href = item.link?.href || '#';
    const target = item.link?.target || '_self';
    const relAttribute = target === '_blank' ? ` rel="${escapeHtml(item.link?.rel || 'noopener noreferrer')}"` : '';

    return `
        <div class="cards-block__item">
            <a
                class="cards-block__item-link cards-block__item-link--card js-cards-link"
                href="${escapeHtml(href)}"
                target="${escapeHtml(target)}"${relAttribute}
            >
                <figure class="cards-block__figure">
                    <img
                        class="cards-block__image"
                        src="${escapeHtml(item.image?.src || '')}"
                        srcset="${escapeHtml(item.image?.srcset || '')}"
                        alt="${escapeHtml(item.image?.alt || '')}"
                    >
                    <figcaption class="cards-block__caption">Click me</figcaption>
                </figure>
                <h3 class="cards-block__item-title">${escapeHtml(item.link?.label || item.title || '')}</h3>
            </a>
            <p class="cards-block__item-text">${escapeHtml(item.text || '')}</p>
        </div>
    `;
};

const renderStoryContent = (story = {}) => {
    renderStoryMedia(story.images);
    renderStoryCopy(story);
};

const renderCardsContent = (cards) => {
    const safeCards = cards && typeof cards === 'object' ? cards : {};

    const cardsTitle = document.querySelector('.js-cards-title');

    if (!cardsTitle) {
        console.error(`${LOG_PREFIX} Missing .js-cards-title container.`);
    } else {
        cardsTitle.textContent = safeCards.title || 'Cards';
    }

    const cardsList = document.querySelector('.js-cards-list');

    if (!cardsList) {
        console.error(`${LOG_PREFIX} Missing .js-cards-list container.`);
        return;
    }

    if (!Array.isArray(safeCards.items) || !safeCards.items.length) {
        console.warn(`${LOG_PREFIX} Cards data is missing or empty.`);
        cardsList.innerHTML = '<p class="cards-block__item-text">Card content is currently unavailable.</p>';
        return;
    }

    cardsList.innerHTML = safeCards.items.map((item) => createCardItemMarkup(item)).join('');
};

export const renderContent = (content = pageContent) => {
    if (!content || typeof content !== 'object') {
        console.error(`${LOG_PREFIX} Missing or invalid content object.`);
        return;
    }

    if (!content.story) {
        console.warn(`${LOG_PREFIX} Missing story payload.`);
    }

    if (!content.cards) {
        console.warn(`${LOG_PREFIX} Missing cards payload.`);
    }

    renderStoryContent(content.story);
    renderCardsContent(content.cards);
};
