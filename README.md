# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## Performance Review (CF-FE-019)

### What I measured
I used the React Developer Tools Profiler (dev build) and recorded three actions:
opening the app, opening the Applications page, and changing an application's status.

### What I found
- **First load:** everything renders once, which is expected.
- **Changing a status:** `ApplicationsProvider` updates its state, so `ApplicationsPage`
  and all `ApplicationCard`s re-render. The cards re-render because their parent
  renders, not because their own data changed.
- **Cost:** about 17–29 ms for 4 applications in the dev build with the Profiler on.
- **Not affected:** `Sidebar`, `Header` and `InterviewsProvider` did not re-render,
  because the state change stays inside the page that uses it.

### What I changed
- **Route-level lazy loading:** `Dashboard`, `ApplicationsPage` and
  `ApplicationDetailsPage` are loaded with `React.lazy` and `import()`. Each page's
  code is downloaded only when its route is opened. `<Suspense>` in `AppLayout`
  shows a loading message while a page loads, and the sidebar and header stay visible.

### What I did not change, and why
- **No `React.memo`, `useMemo` or `useCallback`.** The Profiler showed no measured
  performance problem at this data size. `React.memo` on `ApplicationCard` would
  also have no effect unless the handlers passed from `ApplicationsPage` were
  stabilised with `useCallback`, which adds complexity without a proven benefit.
- **Revisit if** the applications list grows large or the Profiler shows slow renders.

### Problem solved
The first-load bundle contained every page. Lazy loading reduces what is downloaded
at startup. No render problem was found, so no memoization was added.
