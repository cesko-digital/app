import "styled-components";
import { defaultTheme } from "./default";

type DefaultThemeType = typeof defaultTheme;

// This matches the DefaultTheme type from Styled Components to the type of our custom default theme
declare module "styled-components" {
  interface DefaultTheme extends DefaultThemeType {}
  type CssWithTheme = FlattenInterpolation<ThemeProps<DefaultTheme>>;
}
