import { LoginForm, RegisterForm } from './auth';
import { DashboardLayout, DefaultLayout } from './layouts';
import { DefaultNavbar } from './landing-page';
import { Link, MultipleLanguage, SeverityPill, SnackbarCloseButton } from './shared';
import { CircularLoading } from './loading';
import { AuthGuard } from './protected-route/auth-guard';

export {
  DashboardLayout,
  DefaultLayout,
  DefaultNavbar,
  AuthGuard,
  CircularLoading,
  Link,
  LoginForm,
  RegisterForm,
  MultipleLanguage,
  SeverityPill,
  SnackbarCloseButton
};
