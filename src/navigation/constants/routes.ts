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
    Sector: 'CartTabHome.Sector',
  },
  ProductsTabHome: {
    itself: 'ProductsTabHome.itself',
    Sector: 'ProductsTabHome.Sector',
    SubGroup: 'ProductsTabHome.SubGroup',
    Product: 'ProductsTabHome.Product',
  },
  Services: {
    NewService: 'Services.NewService',
    NewServiceCategory: 'Services.NewServiceCategory',
  },
} as const;
