<div align="center">
  <img src="./public/ataraui-logo-final.jpg" alt="AtaraUI" height="80" />
  <p>A calm, composable component library — built for developers who move fast without losing clarity.</p>

[![npm version](https://img.shields.io/npm/v/@ataraui/ataraui-react?color=C2440A&label=@ataraui/ataraui-react)](https://www.npmjs.com/package/@ataraui/ataraui-react)
[![license](https://img.shields.io/npm/l/@ataraui/ataraui-react?color=C2440A)](./LICENSE)
</div>

---

## Installation

```bash
npm install @ataraui/ataraui-react
# or
pnpm add @ataraui/ataraui-react
# or
yarn add @ataraui/ataraui-react
# or
bun add @ataraui/ataraui-react
```

> **Peer dependencies:** `react >= 17`, `tailwindcss >= 4`

## Setup

Add the source and theme tokens to your `globals.css`:

```css
@import "tailwindcss";
@source "../../node_modules/@ataraui/ataraui-react/dist/**/*.js";

@theme {
  --color-primary-50:  #FFF4EE;
  --color-primary-100: #FFE0CC;
  --color-primary-200: #FFBF99;
  --color-primary-300: #F08050;
  --color-primary-400: #D4602A;
  --color-primary-500: #C2440A;
  --color-primary-600: #A03808;
  --color-primary-700: #8F2F06;
  --color-primary-800: #5C1C03;
  --color-primary-900: #2E0D01;
}
```

## Usage

```tsx
import { Button, Input, Badge } from '@ataraui/ataraui-react'

export default function Page() {
  return (
    <div>
      <Badge variant="default">New</Badge>
      <Input
        label="Email"
        placeholder="you@example.com"
        hint="We will never spam you."
      />
      <Button variant="primary" size="md">
        Ship it
      </Button>
      <Button variant="outline" isLoading>
        Loading...
      </Button>
    </div>
  )
}
```

## Components

| Component | Variants | Status |
|-----------|----------|--------|
| `Button`  | `primary` `secondary` `outline` `ghost` `destructive` | ✅ Ready |
| `Input`   | `default` `error` | ✅ Ready |
| `Badge`   | `default` `secondary` `outline` `success` `warning` `destructive` | ✅ Ready |

## Button Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `primary` \| `secondary` \| `outline` \| `ghost` \| `destructive` | `primary` | Visual style |
| `size` | `sm` \| `md` \| `lg` \| `icon` | `md` | Button size |
| `isLoading` | `boolean` | `false` | Show loading spinner |

## Input Props

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Label displayed above the input |
| `error` | `string` | Error message (also triggers error state) |
| `hint` | `string` | Helper text displayed below the input |
| `inputSize` | `sm` \| `md` \| `lg` | Input height size |

## Development

```bash
# Clone the repo
git clone https://github.com/ataraui/ataraui-react.git
cd ataraui-react

# Install dependencies
npm install

# Build the library
npm run build

# Watch mode
npm run dev
```

## Publishing

```bash
# Bump version in package.json, then:
npm run build
npm publish
```

## Roadmap

| Version | Components | Category |
|---------|-----------|----------|
| **v0.1.0** ✅ | `Button` `Input` `Badge` | Core + Tailwind v4 |
| **v0.2.0** | `Card` `Avatar` `Separator` `Spinner` | Layout primitives |
| **v0.3.0** | `Select` `Checkbox` `Radio` `Switch` | Form components |
| **v0.4.0** | `Modal/Dialog` `Drawer` `Tooltip` `Popover` | Overlay components |
| **v0.5.0** | `Toast/Alert` `Progress` `Skeleton` | Feedback components |
| **v0.6.0** | `Table` `Tabs` `Accordion` | Data display |
| **v0.7.0** | Dark mode `Storybook` docs | DX improvements |
| **v0.8.0** | `Navbar` `Sidebar` `Breadcrumb` | Navigation |
| **v0.9.0** | `DatePicker` `Combobox` `FileUpload` | Advanced inputs |
| **v1.0.0** 🎯 | API stable · Full docs · A11y tested · ataraui.com live | Stable release |

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

MIT © [Ryo Kurniawan](https://github.com/ryo-kurniawan)