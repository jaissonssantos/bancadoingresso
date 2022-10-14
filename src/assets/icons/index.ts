import { IconSizes } from './sizes';
import ArrowLeftSvg from './svgs/arrow-left.svg';
import BdiLogoSvg from './svgs/bdi.svg';
import ChevronRightSvg from './svgs/chevron-right.svg';
import CloseSvg from './svgs/close.svg';
import EyeVisibilitySvg from './svgs/eye-visibility.svg';
import EyeVisibilityOffSvg from './svgs/eye-visibility-off.svg';
import ArrowDownSvg from './svgs/arrow-down.svg';
import EventsSvg from './svgs/events.svg';
import ProductSvg from './svgs/product.svg';
import CartSvg from './svgs/cart.svg';
import NoteSvg from './svgs/note.svg';
import GearSvg from './svgs/gear.svg';
import SearchSvg from './svgs/search.svg';
import { svgIconSizeHoc } from './svgs/svgIconSizeHoc';

const ArrowLeftIcon = svgIconSizeHoc(ArrowLeftSvg);
const BdiLogoIcon = svgIconSizeHoc(BdiLogoSvg);
const ChevronRightIcon = svgIconSizeHoc(ChevronRightSvg);
const CloseIcon = svgIconSizeHoc(CloseSvg);
const EyeVisibilityIcon = svgIconSizeHoc(EyeVisibilitySvg);
const EyeVisibilityOffIcon = svgIconSizeHoc(EyeVisibilityOffSvg);
const ArrowDownIcon = svgIconSizeHoc(ArrowDownSvg);
const EventsIcon = svgIconSizeHoc(EventsSvg);
const ProductIcon = svgIconSizeHoc(ProductSvg);
const CartIcon = svgIconSizeHoc(CartSvg);
const NoteIcon = svgIconSizeHoc(NoteSvg);
const GearIcon = svgIconSizeHoc(GearSvg);
const SearchIcon = svgIconSizeHoc(SearchSvg);

export {
  ArrowLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  BdiLogoIcon,
  EyeVisibilityIcon,
  EyeVisibilityOffIcon,
  ArrowDownIcon,
  EventsIcon,
  ProductIcon,
  CartIcon,
  NoteIcon,
  GearIcon,
  SearchIcon,
  svgIconSizeHoc,
  IconSizes,
};
