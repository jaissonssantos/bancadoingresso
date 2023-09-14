export const ROUTES = {
  Auth: {
    IntroLoading: 'Auth.IntroLoading',
    Login: 'Auth.Login',
  },
  MainTab: {
    Itself: 'MainTab.Itself',
    Home: 'MainTab.Home',
    Cart: 'MainTab.Cart',
    ProductsHome: 'MainTab.Products',
    ScheduleHome: 'MainTab.ScheduleHome',
    AdminHome: 'MainTab.AdminHome',
  },
  EventsTabHome: {
    itself: 'EventsTabHome.itself',
    Sector: 'EventsTabHome.Sector',
  },
  CartTabHome: {
    itself: 'CartTabHome.itself',
    PaymentCartInput: 'CartTabHome.PaymentCartInput',
    PaymentTypeChoice: 'CartTabHome.PaymentTypeChoice',
    PaymentByCash: 'CartTabHome.PaymentByCash',
  },
  ProductsTabHome: {
    itself: 'ProductsTabHome.itself',
    Sector: 'ProductsTabHome.Sector',
    SubGroup: 'ProductsTabHome.SubGroup',
    Product: 'ProductsTabHome.Product',
  },
  Payments: {
    PaymentChoiceByInstallment: 'Payments.PaymentChoiceByInstallment',
    PaymentByCreditCard: 'Payments.PaymentByCreditCard',
    PaymentByDebitCard: 'Payments.PaymentByDebitCard',
  },
  AdminTabHome: {
    Home: 'AdminTabHome.Home',
  },
} as const;
