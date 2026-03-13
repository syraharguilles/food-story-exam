export const pageContent = {
    seo: {
        title: 'Basic Page',
        description: 'Responsive food story and color cards layout with accessible image modal interactions.'
    },
    story: {
        title: 'What Does Cooking Mean?',
        description:
            'Is it simply applying heat to a food product? A way of making certain food safe to eat? Or a way to create flavour and make food more appealing? This is just part of what Hervé This, the father of molecular gastronomy, has dedicated his life to finding out. We spoke to him to find out what his experiments have told him. And in the process even discovered the secret to cooking the perfect egg...',
        subtitle: 'The Perfect Egg',
        highlight: 'Keep water between 67 and 68°C for a flavourful, tender yolk',
        images: [
            {
                src: './assets/images/wood-fire-boiling-pot.webp',
                srcset:
                    './assets/images/wood-fire-boiling-pot.webp 1x, ./assets/images/wood-fire-boiling-pot@2x.webp 2x, ./assets/images/wood-fire-boiling-pot@3x.webp 3x',
                alt: 'Wood Fire Boiling Pot'
            },
            {
                src: './assets/images/chef-sorting-ingredients.webp',
                srcset:
                    './assets/images/chef-sorting-ingredients.webp 1x, ./assets/images/chef-sorting-ingredients@2x.webp 2x, ./assets/images/chef-sorting-ingredients@3x.webp 3x',
                alt: 'Chef Sorting Ingredients'
            },
            {
                src: './assets/images/egg-doneness-tray.webp',
                srcset:
                    './assets/images/egg-doneness-tray.webp 1x, ./assets/images/egg-doneness-tray@2x.webp 2x, ./assets/images/egg-doneness-tray@3x.webp 3x',
                alt: 'Egg Doneness Tray'
            }
        ]
    },
    cards: {
        title: 'Taste the Colours',
        items: [
            {
                title: 'Red',
                text: 'Red foods remind us of berries and soft fruits, so we anticipate a sweet taste.',
                image: {
                    src: './assets/images/red-glass-spoon.webp',
                    srcset:
                        './assets/images/red-glass-spoon.webp 1x, ./assets/images/red-glass-spoon@2x.webp 2x, ./assets/images/red-glass-spoon@3x.webp 3x',
                    alt: 'Red Glass Spoon'
                },
                link: {
                    href: 'https://en.wikipedia.org/wiki/Red',
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    label: 'Red'
                }
            },
            {
                title: 'Green',
                text: 'Fresh, zingy green colours are reminiscent of unripe fruit, promising sour or acid flavours',
                image: {
                    src: './assets/images/green-glass-spoon.webp',
                    srcset:
                        './assets/images/green-glass-spoon.webp 1x, ./assets/images/green-glass-spoon@2x.webp 2x, ./assets/images/green-glass-spoon@3x.webp 3x',
                    alt: 'Green Glass Spoon'
                },
                link: {
                    href: 'https://en.wikipedia.org/wiki/Green',
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    label: 'Green'
                }
            },
            {
                title: 'White',
                text: 'White foods evoke memories of salt and salty flavours, driving the expectation of a savoury treat.',
                image: {
                    src: './assets/images/white-glass-spoon.webp',
                    srcset:
                        './assets/images/white-glass-spoon.webp 1x, ./assets/images/white-glass-spoon@2x.webp 2x, ./assets/images/white-glass-spoon@3x.webp 3x',
                    alt: 'White Glass Spoon'
                },
                link: {
                    href: 'https://en.wikipedia.org/wiki/White',
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    label: 'White'
                }
            }
        ]
    }
};
