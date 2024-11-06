// types/theme.d.ts
import { PaletteOptions, Palette, TypographyVariantsOptions, TypographyVariants } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeBackground {
    sidebar?: string;
    topmenu?: string;
    // Add other custom background properties if needed
  }

  interface Palette {
    background: TypeBackground;
  }

  interface PaletteOptions {
    background?: Partial<TypeBackground>;
  }

  interface TypographyVariants {
    title: React.CSSProperties;
  }

  // Allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    title?: React.CSSProperties;
  }

}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    title: true;
  }
}