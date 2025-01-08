import { createTheme } from "@mui/material/styles";

// カスタムテーマの定義
export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#F9F6D3", // メインカラー
      light: "#ffffff",
      dark: "#c6c3a6",
    },
    secondary: {
      main: "#6B581A", // サブカラー
      light: "#9e853e",
      dark: "#483a0e",
    },
    text: {
      primary: "#000000",
      secondary: "#ffffff",
      disabled: "#bdbdbd",
    },
    common: {
      black: "#333",
      white: "#ffffff",
    },
    background: {
      default: "#F9F6D3",
      paper: "#ffffff",
    },
    accent: {
      main: "#D74B4E",
      light: "#ff7a78",
      dark: "#a01420",
      contrastText: "#ffffff",
    },
    action: {
      hover: "#d74b4e3b", // ホバー時の背景色
      selected: "#d74b4e3b", // 押下時の背景色
    },
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    accent: Palette["primary"];
  }
  interface PaletteOptions {
    accent?: PaletteOptions["primary"];
  }
}
