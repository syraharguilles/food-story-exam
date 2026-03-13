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
    const closeButton = modal.querySelector('.js-image-modal-close');
    const closeTargets = modal.querySelectorAll('.js-image-modal-close');
    const backgroundElements = Array.from(document.body.children).filter((element) => element !== modal);
    const focusableSelector =
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

    let activeTrigger = null;

    const setBackgroundInert = (isInert) => {
        backgroundElements.forEach((element) => {
            if (isInert) {
                const currentAriaHidden = element.getAttribute('aria-hidden');

                if (currentAriaHidden !== null) {
                    element.setAttribute('data-js-prev-aria-hidden', currentAriaHidden);
                } else {
                    element.removeAttribute('data-js-prev-aria-hidden');
                }

                element.setAttribute('aria-hidden', 'true');

                if ('inert' in element) {
                    element.inert = true;
                }

                return;
            }

            const previousAriaHidden = element.getAttribute('data-js-prev-aria-hidden');

            if (previousAriaHidden !== null) {
                element.setAttribute('aria-hidden', previousAriaHidden);
                element.removeAttribute('data-js-prev-aria-hidden');
            } else {
                element.removeAttribute('aria-hidden');
            }

            if ('inert' in element) {
                element.inert = false;
            }
        });
    };

    const trapFocus = (event) => {
        const focusableElements = Array.from(modal.querySelectorAll(focusableSelector)).filter(
            (element) => element.offsetParent !== null
        );

        if (!focusableElements.length) {
            event.preventDefault();
            modal.focus();
            return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const activeElement = document.activeElement;

        if (event.shiftKey && activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
            return;
        }

        if (!event.shiftKey && activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    };

    const closeModal = () => {
        if (!modal.classList.contains('is-open')) {
            return;
        }

        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('is-image-modal-open');
        modalImage.removeAttribute('src');
        setBackgroundInert(false);

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

        activeTrigger = trigger;
        modalImage.setAttribute('src', imageSource);
        modalImage.setAttribute('alt', trigger.getAttribute('alt') || 'Expanded image');

        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('is-image-modal-open');
        setBackgroundInert(true);

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
            return;
        }

        if (event.key === 'Tab') {
            trapFocus(event);
        }
    });
};