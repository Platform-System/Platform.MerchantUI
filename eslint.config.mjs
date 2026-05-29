import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["**/*.{ts,tsx,js,jsx,mjs,cjs}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@platform-system/design-ui",
              message:
                "Use public subpaths like @platform-system/design-ui/components/*, /lib/cn, /theme-provider, or /branding.",
            },
            {
              name: "@platform-system/design-ui/ThemeProvider",
              message: "Use @platform-system/design-ui/theme-provider instead.",
            },
            {
              name: "@platform-system/design-ui/useTheme",
              message: "Use @platform-system/design-ui/use-theme instead.",
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
