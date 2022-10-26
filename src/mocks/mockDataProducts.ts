import type { IEvent } from 'src/features/products/model/eventDTO';

export const mockDataProducts: IEvent[] = [
  {
    id: '1',
    name: 'Vans Warped Tour - Slow Bleeding',
    image:
      'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=600x600',
    section: [
      {
        date: '2021-07-21',
        items: [
          {
            id: '6355ae852d4ed',
            name: 'Bar Pista',
            items: [
              {
                id: 'IltCWGwoxZaBSX7Us6355ae9969497',
                name: 'Bebidas',
                image:
                  'https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg?auto=compress&cs=tinysrgb&w=600',
                items: [
                  {
                    id: 'IltCWGwoxZaBSX7Us6355ae9969497',
                    name: 'Bebidas alcoolicas',
                    items: [
                      {
                        id: 'OK6355aedK6355aedoONBNhusFuNlc1bbe5',
                        name: 'Whisky Johnnie W. Blue Label',
                        image:
                          'https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg?auto=compress&cs=tinysrgb&w=600',
                        quantity: 0,
                        price: 200,
                        totalPrice: 0,
                      },
                      {
                        id: 'wkXDV6fuBCbkOO3YY6355aee0d1e4d',
                        name: 'Whisky Johnnie W. Red Label',
                        image:
                          'https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg?auto=compress&cs=tinysrgb&w=600',
                        quantity: 0,
                        price: 100,
                        totalPrice: 0,
                      },
                    ],
                  },
                  {
                    id: 'wQLdPEZ3ytx8PEeTM6355aea23e26e',
                    name: 'Bebidas energéticas',
                    items: [
                      {
                        id: 'OK6355aedK6355aedoONBNhusFuNlc1bbe5',
                        name: 'Whisky Johnnie W. Blue Label',
                        quantity: 0,
                        price: 200,
                        totalPrice: 0,
                      },
                      {
                        id: 'wkXDV6fuBCbkOO3YY6355aee0d1e4d',
                        name: 'Whisky Johnnie W. Red Label',
                        quantity: 0,
                        price: 100,
                        totalPrice: 0,
                      },
                    ],
                  },
                ],
              },
              {
                id: 'wQLdPEZ3ytx8PEeTM6355aea23e26e',
                name: 'Chapelaria',
                image:
                  'https://images.pexels.com/photos/33265/wine-bottle-wine-glasses-wine-ambience.jpg?auto=compress&cs=tinysrgb&w=600',
                items: [],
              },
              {
                id: 'PEZ3ytx8PEeTM638PEeTM63a9b0b1c',
                name: 'Combos',
                items: [],
              },
              {
                id: '6355ae996949PEeTM63a9b0b1c',
                name: 'Litros',
                items: [],
              },
            ],
          },
        ],
      },
    ],
  },
];
