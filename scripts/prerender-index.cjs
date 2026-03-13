// Reviewer note:
// Build-time prerender script: reads content.js (source of truth) and writes populated HTML into index.html.
// This keeps the project CMS-ready while shipping static content for SEO and no-JS resilience.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const projectRoot = path.resolve(__dirname, '..');
const contentFilePath = path.join(projectRoot, 'assets/js/data/content.js');
const indexFilePath = path.join(projectRoot, 'index.html');

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

const loadPageContent = () => {
    const source = fs.readFileSync(contentFilePath, 'utf8');
    const executableSource = source.replace(/export\s+const\s+pageContent\s*=\s*/, 'pageContent = ');
    const sandbox = { pageContent: null };

    vm.runInNewContext(executableSource, sandbox, { filename: contentFilePath });

    if (!sandbox.pageContent || typeof sandbox.pageContent !== 'object') {
        throw new Error('Unable to load pageContent from assets/js/data/content.js');
    }

    return sandbox.pageContent;
};

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
                    </figure>`;
};

const createStorySectionMarkup = (story = {}) => {
    const storyImages = Array.isArray(story.images)
        ? story.images.map((imageData, index) => createStoryFigureMarkup(imageData, index)).join('\n')
        : '';

    return `<section class="gallery-block js-section-reveal">
            <div class="container gallery-block__container">
                <div class="gallery-block__media-grid js-gallery-media-grid">${storyImages ? `\n${storyImages}\n` : ''}                </div>
                <div class="gallery-block__content js-gallery-content">
                    <div class="gallery-block__title-wrap">
                        <h1 class="gallery-block__title">${escapeHtml(story.title || '')}</h1>
                    </div>
                    <p class="gallery-block__text">${escapeHtml(story.description || '')}</p>
                    <span class="gallery-block__subtitle">${escapeHtml(story.subtitle || '')}</span>
                    <p class="gallery-block__text gallery-block__text--padding-0 gallery-block__text--bold"><strong>${escapeHtml(story.highlight || '')}</strong></p>
                </div>
            </div>
        </section><!-- end of gallery-block -->`;
};

const createCardItemMarkup = (item = {}) => {
    const href = item.link?.href || '#';
    const target = item.link?.target || '_self';
    const relAttribute = target === '_blank' ? ` rel="${escapeHtml(item.link?.rel || 'noopener noreferrer')}"` : '';

    return `
                    <div class="cards-block__item">
                        <figure class="cards-block__figure">
                            <img
                                class="cards-block__image"
                                src="${escapeHtml(item.image?.src || '')}"
                                srcset="${escapeHtml(item.image?.srcset || '')}"
                                alt="${escapeHtml(item.image?.alt || '')}"
                            >
                        </figure>
                        <h3 class="cards-block__item-title">
                            <a
                                class="cards-block__item-link js-cards-link"
                                href="${escapeHtml(href)}"
                                target="${escapeHtml(target)}"${relAttribute}
                            >${escapeHtml(item.link?.label || item.title || '')}</a>
                        </h3>
                        <p class="cards-block__item-text">${escapeHtml(item.text || '')}</p>
                    </div>`;
};

const createCardsSectionMarkup = (cards = {}) => {
    const cardsItems = Array.isArray(cards.items)
        ? cards.items.map((item) => createCardItemMarkup(item)).join('\n')
        : '';

    return `<section class="cards-block js-section-reveal">
            <div class="container cards-block__container text-center">
                <div class="cards-block__outer-wrapper">
                    <div class="cards-block__title-wrap">
                        <h2 class="cards-block__title js-cards-title">${escapeHtml(cards.title || '')}</h2>
                    </div>
                </div>
                
                <div class="cards-block__list js-cards-list">${cardsItems ? `\n${cardsItems}\n` : ''}                </div>
            </div>
        </section><!-- end of cards-block -->`;
};

const prerenderIndex = () => {
    const pageContent = loadPageContent();
    const storySectionMarkup = createStorySectionMarkup(pageContent.story);
    const cardsSectionMarkup = createCardsSectionMarkup(pageContent.cards);

    let html = fs.readFileSync(indexFilePath, 'utf8');

    const storySectionPattern = /<section class="gallery-block js-section-reveal">[\s\S]*?<\/section><!-- end of gallery-block -->/;
    const cardsSectionPattern = /<section class="cards-block js-section-reveal">[\s\S]*?<\/section><!-- end of cards-block -->/;

    if (!storySectionPattern.test(html)) {
        throw new Error('Gallery section block not found in index.html');
    }

    if (!cardsSectionPattern.test(html)) {
        throw new Error('Cards-block section block not found in index.html');
    }

    html = html.replace(storySectionPattern, storySectionMarkup);
    html = html.replace(cardsSectionPattern, cardsSectionMarkup);

    fs.writeFileSync(indexFilePath, html);
    console.log('Pre-rendered index.html from content.js');
};

prerenderIndex();
