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

> For the indeterminate `Progress` animation, also add this to your `globals.css`:
> ```css
> @keyframes indeterminate {
>   0%   { transform: translateX(-100%); }
>   100% { transform: translateX(400%); }
> }
> ```

## Usage

```tsx
import React from 'react'
import {
  Button,
  Input,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Avatar,
  Separator,
  Spinner,
  Select,
  Checkbox,
  RadioGroup,
  Switch,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  Tooltip,
  Popover,
  ToastProvider,
  Toaster,
  useToast,
  Alert,
  AlertTitle,
  AlertDescription,
  Progress,
  Skeleton,
} from '@ataraui/ataraui-react'

export default function Page() {
  const [modalOpen, setModalOpen] = React.useState(false)
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  return (
    <ToastProvider>
      <div>
        <Badge variant="default">New</Badge>

        <Input label="Email" placeholder="you@example.com" hint="We will never spam you." />

        <Button variant="primary" size="md">Ship it</Button>
        <Button variant="outline" isLoading>Loading...</Button>

        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description here.</CardDescription>
          </CardHeader>
          <CardContent>Content goes here.</CardContent>
          <CardFooter>
            <Button variant="primary" size="sm">Confirm</Button>
            <Button variant="ghost" size="sm">Cancel</Button>
          </CardFooter>
        </Card>

        <Avatar src="https://github.com/ryo.png" alt="Ryo" size="md" />
        <Avatar fallback="Ryo Kurniawan" size="md" />

        <Separator />
        <Separator label="OR" />

        <Spinner size="md" />
        <Spinner size="md" label="Loading data..." />

        <Select
          label="Country"
          placeholder="Select a country..."
          options={[
            { value: 'id', label: 'Indonesia' },
            { value: 'sg', label: 'Singapore' },
          ]}
        />

        <Checkbox label="Accept terms" />
        <Checkbox label="Remember me" description="Stay logged in for 30 days." />

        <RadioGroup
          name="plan"
          label="Billing Plan"
          options={[
            { value: 'monthly', label: 'Monthly' },
            { value: 'yearly', label: 'Yearly' },
          ]}
        />

        <Switch label="Notifications" description="Receive email notifications." />

        <Button onClick={() => setModalOpen(true)}>Open modal</Button>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <ModalHeader onClose={() => setModalOpen(false)}>
            <ModalTitle>Confirm action</ModalTitle>
            <ModalDescription>This action can be reviewed before continuing.</ModalDescription>
          </ModalHeader>
          <ModalBody>Use modals for focused workflows.</ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setModalOpen(false)}>Continue</Button>
          </ModalFooter>
        </Modal>

        <Button variant="outline" onClick={() => setDrawerOpen(true)}>Open drawer</Button>
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} side="right">
          <DrawerHeader onClose={() => setDrawerOpen(false)}>
            <DrawerTitle>Settings</DrawerTitle>
            <DrawerDescription>Manage preferences without leaving the page.</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>Drawer content goes here.</DrawerBody>
          <DrawerFooter>
            <Button onClick={() => setDrawerOpen(false)}>Save</Button>
          </DrawerFooter>
        </Drawer>

        <Tooltip content="Helpful context" side="top">
          <Button variant="outline">Hover me</Button>
        </Tooltip>

        <Popover
          side="bottom"
          align="start"
          content={({ close }) => (
            <div className="flex w-56 flex-col gap-3">
              <p className="font-medium">Account settings</p>
              <Button size="sm" onClick={close}>Done</Button>
            </div>
          )}
        >
          <Button variant="outline">Open popover</Button>
        </Popover>

        <Alert variant="success" onClose={() => {}}>
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>Your changes have been saved.</AlertDescription>
        </Alert>

        <Progress value={75} size="md" label="Uploading..." showLabel />

        <Skeleton variant="circle" width={40} height={40} />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="rect" height={120} />
      </div>
      <Toaster position="bottom-right" />
    </ToastProvider>
  )
}
```

## Components

| Component | Variants | Status |
|-----------|----------|--------|
| `Button` | `primary` `secondary` `outline` `ghost` `destructive` | ✅ Ready |
| `Input` | `default` `error` | ✅ Ready |
| `Badge` | `default` `secondary` `outline` `success` `warning` `destructive` | ✅ Ready |
| `Card` | `elevated` `outlined` `ghost` | ✅ Ready |
| `Avatar` | — | ✅ Ready |
| `Separator` | `horizontal` `vertical` | ✅ Ready |
| `Spinner` | — | ✅ Ready |
| `Select` | `default` `error` | ✅ Ready |
| `Checkbox` | — | ✅ Ready |
| `RadioGroup` | `vertical` `horizontal` | ✅ Ready |
| `Switch` | — | ✅ Ready |
| `Modal` | `sm` `md` `lg` `xl` `full` | ✅ Ready |
| `Drawer` | `left` `right` `top` `bottom` | ✅ Ready |
| `Tooltip` | `top` `bottom` `left` `right` | ✅ Ready |
| `Popover` | `top` `bottom` `left` `right` · `start` `center` `end` | ✅ Ready |
| `Alert` | `default` `success` `warning` `destructive` | ✅ Ready |
| `Progress` | `sm` `md` `lg` | ✅ Ready |
| `Skeleton` | `text` `circle` `rect` | ✅ Ready |
| `ToastProvider` + `Toaster` | `default` `success` `warning` `destructive` | ✅ Ready |

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

## Card Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `elevated` \| `outlined` \| `ghost` | `elevated` | Visual style |
| `padding` | `none` \| `sm` \| `md` \| `lg` | `md` | Inner padding |

## Avatar Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | — | Image URL |
| `alt` | `string` | — | Image alt text |
| `fallback` | `string` | — | Name for initials fallback |
| `size` | `xs` \| `sm` \| `md` \| `lg` \| `xl` | `md` | Avatar size |

## Separator Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `horizontal` \| `vertical` | `horizontal` | Direction |
| `label` | `string` | — | Text label in the middle |

## Spinner Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `xs` \| `sm` \| `md` \| `lg` \| `xl` | `md` | Spinner size |
| `label` | `string` | — | Text label below spinner |

## Select Props

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Label displayed above the select |
| `error` | `string` | Error message (also triggers error state) |
| `hint` | `string` | Helper text displayed below the select |
| `placeholder` | `string` | Placeholder option text |
| `options` | `SelectOption[]` | Array of `{ value, label, disabled? }` |
| `selectSize` | `sm` \| `md` \| `lg` | Select height size |

## Checkbox Props

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Label displayed next to the checkbox |
| `description` | `string` | Helper text below the label |
| `error` | `string` | Error message below the checkbox |

## RadioGroup Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | Input group name (required) |
| `options` | `RadioOption[]` | — | Array of `{ value, label, description?, disabled? }` |
| `value` | `string` | — | Controlled value |
| `onChange` | `(value: string) => void` | — | Change handler |
| `label` | `string` | — | Group label |
| `orientation` | `vertical` \| `horizontal` | `vertical` | Layout direction |
| `error` | `string` | — | Error message |
| `hint` | `string` | — | Helper text |

## Switch Props

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Label displayed next to the switch |
| `description` | `string` | Helper text below the label |
| `error` | `string` | Error message below the switch |
| `checked` | `boolean` | Controlled checked state |
| `defaultChecked` | `boolean` | Default checked state (uncontrolled) |
| `onChange` | `ChangeEventHandler` | Change handler |

## Modal Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controls whether the modal is visible |
| `onClose` | `() => void` | — | Called when the modal should close |
| `children` | `ReactNode` | — | Modal content |
| `size` | `sm` \| `md` \| `lg` \| `xl` \| `full` | `md` | Modal width |
| `closeOnOverlayClick` | `boolean` | `true` | Close when the overlay is clicked |

## Drawer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controls whether the drawer is visible |
| `onClose` | `() => void` | — | Called when the drawer should close |
| `children` | `ReactNode` | — | Drawer content |
| `side` | `left` \| `right` \| `top` \| `bottom` | `right` | Drawer placement |
| `size` | `sm` \| `md` \| `lg` \| `full` | `md` | Drawer width for left/right placements |
| `closeOnOverlayClick` | `boolean` | `true` | Close when the overlay is clicked |

## Tooltip Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ReactNode` | — | Tooltip content |
| `children` | `ReactNode` | — | Tooltip trigger |
| `side` | `top` \| `bottom` \| `left` \| `right` | `top` | Tooltip placement |
| `delay` | `number` | `300` | Delay before showing the tooltip, in milliseconds |

## Popover Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ReactNode` \| `(controls) => ReactNode` | — | Popover content, optionally with `close`, `open`, and `setOpen` controls |
| `children` | `ReactNode` | — | Popover trigger |
| `side` | `top` \| `bottom` \| `left` \| `right` | `bottom` | Popover placement |
| `align` | `start` \| `center` \| `end` | `center` | Popover alignment relative to the trigger |
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Initial open state for uncontrolled usage |
| `onOpenChange` | `(open: boolean) => void` | — | Called when open state changes |
| `closeOnOutsideClick` | `boolean` | `true` | Close when clicking outside the popover |

## Alert Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `default` \| `success` \| `warning` \| `destructive` | `default` | Visual style |
| `icon` | `ReactNode` | — | Icon displayed on the left |
| `onClose` | `() => void` | — | Show dismiss button and handle close |

## Progress Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | Value between 0–100. Omit for indeterminate |
| `size` | `sm` \| `md` \| `lg` | `md` | Bar height |
| `label` | `string` | — | Text label above the bar |
| `showLabel` | `boolean` | `false` | Show percentage value on the right |

## Skeleton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `text` \| `circle` \| `rect` | `rect` | Shape of the skeleton |
| `width` | `string` \| `number` | — | Width (number → px, string → as-is) |
| `height` | `string` \| `number` | — | Height (number → px, string → as-is) |

## Toast

Wrap your app once with `ToastProvider` and place `Toaster` inside it:

```tsx
// layout.tsx or _app.tsx
import { ToastProvider, Toaster } from '@ataraui/ataraui-react'

export default function Layout({ children }) {
  return (
    <ToastProvider>
      {children}
      <Toaster position="bottom-right" />
    </ToastProvider>
  )
}
```

Then use the `useToast` hook anywhere inside the tree:

```tsx
import { useToast } from '@ataraui/ataraui-react'

const { toast, dismiss, dismissAll } = useToast()

toast({ title: 'Saved!', description: 'Your changes were saved.', variant: 'success' })
```

## Toaster Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `top-left` \| `top-center` \| `top-right` \| `bottom-left` \| `bottom-center` \| `bottom-right` | `bottom-right` | Toast position on screen |
| `defaultDuration` | `number` | `4000` | Auto-dismiss duration in ms. Pass `0` to disable |

## Toast Options (`useToast`)

| Option | Type | Description |
|--------|------|-------------|
| `title` | `string` | Main toast message |
| `description` | `string` | Supporting text below the title |
| `variant` | `default` \| `success` \| `warning` \| `destructive` | Visual style |
| `duration` | `number` | Override `defaultDuration` for this toast |
| `icon` | `ReactNode` | Icon on the left |
| `action` | `{ label: string, onClick: () => void }` | Action button inside the toast |

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
| **v0.2.0** ✅ | `Card` `Avatar` `Separator` `Spinner` | Layout primitives |
| **v0.3.0** ✅ | `Select` `Checkbox` `Radio` `Switch` | Form components |
| **v0.4.0** ✅ | `Modal/Dialog` `Drawer` `Tooltip` `Popover` | Overlay components |
| **v0.5.0** ✅ | `Toast` `Alert` `Progress` `Skeleton` | Feedback components |
| **v0.6.0** | `Table` `Tabs` `Accordion` | Data display |
| **v0.7.0** | Dark mode · Storybook docs | DX improvements |
| **v0.8.0** | `Navbar` `Sidebar` `Breadcrumb` | Navigation |
| **v0.9.0** | `DatePicker` `Combobox` `FileUpload` | Advanced inputs |
| **v1.0.0** 🎯 | API stable · Full docs · A11y tested · ataraui.com live | Stable release |

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

MIT © [AtaraUI](https://github.com/AtaraUI)