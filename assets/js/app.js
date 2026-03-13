import { cardsLinkLogger } from './functions/cards-links';
import { imageModal } from './functions/image-modal';
import { renderContent } from './functions/render-content';
import { sectionReveal } from './functions/section-reveal';

const bootstrap = () => {
	// Content rendering is currently disabled.
	// Uncomment the line below to enable dynamic rendering from the content.js data object.
	// This allows for runtime updates and is also used in development. In production, prerendering populates the HTML.
	// renderContent();
	imageModal();
	cardsLinkLogger();
	sectionReveal();
	document.body.classList.add('js-ready');
};

window.addEventListener('DOMContentLoaded', bootstrap);