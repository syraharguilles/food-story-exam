import { pageContent } from '../data/content';

const setElementText = (selector, value) => {
    const element = document.querySelector(selector);

    if (!element || typeof value !== 'string') {
        return;
    }

    element.textContent = value;
};

const setImageSource = (imageElement, imageData) => {
    if (!imageElement || !imageData) {
        return;
    }

    if (imageData.src) {
        imageElement.setAttribute('src', imageData.src);
    }

    if (imageData.srcset) {
        imageElement.setAttribute('srcset', imageData.srcset);
    }

    if (imageData.alt) {
        imageElement.setAttribute('alt', imageData.alt);
    }
};

const setMetaByName = (name, content) => {
    const meta = document.querySelector(`meta[name="${name}"]`);

    if (!meta || !content) {
        return;
    }

    meta.setAttribute('content', content);
};

const setMetaByProperty = (property, content) => {
    const meta = document.querySelector(`meta[property="${property}"]`);

    if (!meta || !content) {
        return;
    }

    meta.setAttribute('content', content);
};

const createStoryFigure = (imageData, index) => {
    const figure = document.createElement('figure');
    figure.className = 'story-block__figure';

    if (index === 0) {
        figure.classList.add('story-block__figure--row-span-2');
    }

    const image = document.createElement('img');
    image.className = 'story-block__image js-image-modal js-story-image';
    setImageSource(image, imageData);

    figure.appendChild(image);

    return figure;
};

const renderStoryMedia = (images) => {
    const mediaGrid = document.querySelector('.js-story-media-grid');

    if (!mediaGrid || !Array.isArray(images)) {
        return;
    }

    mediaGrid.innerHTML = '';
    images.forEach((imageData, index) => {
        mediaGrid.appendChild(createStoryFigure(imageData, index));
    });
};

const renderStoryCopy = (story) => {
    const storyContent = document.querySelector('.js-story-content');

    if (!storyContent) {
        return;
    }

    storyContent.innerHTML = '';

    const titleWrap = document.createElement('div');
    titleWrap.className = 'story-block__title-wrap';

    const title = document.createElement('h1');
    title.className = 'story-block__title js-story-title';
    title.textContent = story.title || '';
    titleWrap.appendChild(title);

    const description = document.createElement('p');
    description.className = 'story-block__text js-story-description';
    description.textContent = story.description || '';

    const subtitle = document.createElement('span');
    subtitle.className = 'story-block__subtitle js-story-subtitle';
    subtitle.textContent = story.subtitle || '';

    const highlightParagraph = document.createElement('p');
    highlightParagraph.className = 'story-block__text story-block__text--padding-0 story-block__text--bold';

    const highlight = document.createElement('strong');
    highlight.className = 'js-story-highlight';
    highlight.textContent = story.highlight || '';
    highlightParagraph.appendChild(highlight);

    storyContent.append(titleWrap, description, subtitle, highlightParagraph);
};

const createCardItem = (item) => {
    const cardItem = document.createElement('div');
    cardItem.className = 'color-cards__item';

    const figure = document.createElement('figure');
    figure.className = 'color-cards__figure';

    const image = document.createElement('img');
    image.className = 'color-cards__image js-image-modal';
    setImageSource(image, item.image);
    figure.appendChild(image);

    const title = document.createElement('h3');
    title.className = 'color-cards__item-title';

    const link = document.createElement('a');
    link.className = 'color-cards__item-link';

    const href = item.link?.href || '#';
    const target = item.link?.target || '_self';

    link.setAttribute('href', href);
    link.setAttribute('target', target);

    if (target === '_blank') {
        link.setAttribute('rel', item.link?.rel || 'noopener noreferrer');
    }

    link.textContent = item.link?.label || item.title || '';
    title.appendChild(link);

    const text = document.createElement('p');
    text.className = 'color-cards__item-text';
    text.textContent = item.text || '';

    cardItem.append(figure, title, text);

    return cardItem;
};

const renderStoryContent = (story) => {
    if (!story) {
        return;
    }

    renderStoryMedia(story.images);
    renderStoryCopy(story);
};

const renderCardsContent = (cards) => {
    if (!cards) {
        return;
    }

    setElementText('.js-cards-title', cards.title);

    const cardsList = document.querySelector('.js-cards-list');

    if (!cardsList || !Array.isArray(cards.items) || !cards.items.length) {
        return;
    }

    cardsList.innerHTML = '';
    cards.items.forEach((item) => {
        cardsList.appendChild(createCardItem(item));
    });
};

const renderSeoContent = (seo) => {
    if (!seo) {
        return;
    }

    if (seo.title) {
        document.title = seo.title;
    }

    setMetaByName('description', seo.description);
    setMetaByProperty('og:title', seo.title);
    setMetaByProperty('og:description', seo.description);
};

export const renderContent = (content = pageContent) => {
    if (!content) {
        return;
    }

    renderSeoContent(content.seo);
    renderStoryContent(content.story);
    renderCardsContent(content.cards);
};
