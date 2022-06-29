import {
    trigger,
    style,
    animate,
    transition,
    query,
    group,
} from '@angular/animations';

const resetRoute = [
    style({ position: 'relative' }),
    query(
        ':enter, :leave',
        [
            style({
                position: 'fixed', // using absolute makes the scroll get stuck in the previous page's scroll position on the new page
                top: '0', // take into account header height
                left: 0,
                width: '100%',
                opacity: 0,
            }),
        ],
        { optional: true }
    ),
];
export const RouteSlideAnimation = [
    trigger('routeSlideAnimation', [
        transition('flashquote => prime', [
            ...resetRoute,
            query(':enter', [style({ transform: 'translateX(100vw)', opacity: 0 })], {
                optional: true,
            }),
            group([
                query(
                    ':leave',
                    [
                        style({ opacity: 1 }),
                        animate(
                            '0.5s',
                            style({ transform: 'translateX(-100vw)', opacity: 0 })
                        ),
                    ],
                    { optional: true }
                ),
                query(
                    ':enter',
                    [
                        style({ opacity: 0 }),
                        animate('0.5s', style({ transform: 'translateX(0)', opacity: 1 })),
                    ],
                    { optional: true }
                ),
            ]),
        ]),
        transition('prime => flashquote', [
            ...resetRoute,
            query(':enter', [style({ opacity: 0 })], {
                optional: true,
            }),
            group([
                query(
                    ':leave',
                    [style({ opacity: 1 }), animate('0.5s', style({ opacity: 0 }))],
                    { optional: true }
                ),
                query(
                    ':enter',
                    [style({ opacity: 0 }), animate('0.5s', style({ opacity: 1 }))],
                    { optional: true }
                ),
            ]),
        ]),
    ]),
];