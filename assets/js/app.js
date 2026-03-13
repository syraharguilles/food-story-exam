import { cardsLinkLogger } from './functions/cards-links';
import { imageModal } from './functions/image-modal';
import { renderContent } from './functions/render-content';
import { sectionReveal } from './functions/section-reveal';

const bootstrap = () => {
	// Reviewer note:
	// Runtime render is kept so content can still be replaced dynamically (CMS/API) after initial load.
	renderContent();
	imageModal();
	cardsLinkLogger();
	sectionReveal();
	document.body.classList.add('js-ready');
};

window.addEventListener('DOMContentLoaded', bootstrap);