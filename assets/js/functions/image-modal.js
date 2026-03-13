const getOrCreateModal = () => {
    const existingModal = document.querySelector('.js-image-modal-dialog');

    // Keep a single modal instance even if init runs more than once.
    if (existingModal) {
        return existingModal;
    }

    const modal = document.createElement('div');
    modal.className = 'image-modal js-image-modal-dialog';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-label', 'Expanded image preview');
    modal.setAttribute('tabindex', '-1');

    modal.innerHTML = `
        <div class="image-modal__backdrop js-image-modal-close"></div>
        <div class="image-modal__content">
            <button type="button" class="image-modal__close js-image-modal-close" aria-label="Close image preview">×</button>
            <img class="image-modal__image js-image-modal-image" src="" alt="" />
        </div>
    `;

    document.body.appendChild(modal);
    return modal;
};

export const imageModal = () => {
    const imageTriggers = document.querySelectorAll('.gallery-block .js-image-modal');

    if (!imageTriggers.length) {
        return;
    }

    const modal = getOrCreateModal();
    const modalImage = modal.querySelector('.js-image-modal-image');
    const closeButton = modal.querySelector('button.js-image-modal-close');
    const closeTargets = modal.querySelectorAll('.js-image-modal-close');
    const closeAnimationDuration =
        'matchMedia' in window && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 300;

    let activeTrigger = null;
    let closeTimeoutId = null;

    const cleanupModalMedia = () => {
        modalImage.removeAttribute('src');
        modalImage.removeAttribute('alt');
    };

    const closeModal = () => {
        if (!modal.classList.contains('is-open')) {
            return;
        }

        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('is-image-modal-open');

        if (closeTimeoutId) {
            window.clearTimeout(closeTimeoutId);
        }

        closeTimeoutId = window.setTimeout(() => {
            cleanupModalMedia();
            closeTimeoutId = null;
        }, closeAnimationDuration);

        // Return focus to the original trigger for keyboard users.
        if (activeTrigger) {
            activeTrigger.focus();
        }
    };

    const openModal = (trigger) => {
        // Use currentSrc so the modal opens the exact responsive source in use.
        const imageSource = trigger.currentSrc || trigger.getAttribute('src');

        if (!imageSource) {
            return;
        }

        if (closeTimeoutId) {
            window.clearTimeout(closeTimeoutId);
            closeTimeoutId = null;
        }

        activeTrigger = trigger;
        modalImage.setAttribute('src', imageSource);
        modalImage.setAttribute('alt', trigger.getAttribute('alt') || 'Expanded image');

        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('is-image-modal-open');

        if (closeButton) {
            closeButton.focus();
            return;
        }

        modal.focus();
    };

    imageTriggers.forEach((trigger) => {
        trigger.setAttribute('role', 'button');
        trigger.setAttribute('tabindex', '0');
        trigger.setAttribute('aria-haspopup', 'dialog');

        trigger.addEventListener('click', () => openModal(trigger));
        trigger.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openModal(trigger);
            }
        });
    });

    closeTargets.forEach((target) => {
        target.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', (event) => {
        if (!modal.classList.contains('is-open')) {
            return;
        }

        if (event.key === 'Escape') {
            closeModal();
        }
    });
};