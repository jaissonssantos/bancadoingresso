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
    PaymentByPix: 'CartTabHome.PaymentByPix',
    PaymentByDebitCard: 'CartTabHome.PaymentByDebitCard',
    PaymentChoiceByInstallment: 'CartTabHome.PaymentChoiceByInstallment',
    PaymentByCreditCard: 'CartTabHome.PaymentByCreditCard',
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
  },
} as const;
