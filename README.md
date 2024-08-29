# dinero
Dinero is a personal finance management tool.

# To Do
- Check network status
- Cach data to reduce firestore reads
- PWA - Completely offline app 
- RSA encryption
- serverTimestamp()

# Resources
- [Wireframe Tool](https://www.tldraw.com/)
- [Wireframe](https://www.tldraw.com/r/zFw4AI91pF3ai9qmW_UQc?v=-1285,-886,6678,3914&p=page)
- [UI Components](https://ui.shadcn.com/docs/components/accordion)
- [CSS Styles](https://tailwindcss.com/docs/container)
- [React](https://react.dev/learn)
- [React Router](https://reactrouter.com/en/main/start/overview)
- [Icons](https://lucide.dev/icons/)
- [Shadcn Admin](https://github.com/satnaing/shadcn-admin)
- [daisyUI](https://daisyui.com/)
- [awesome-shadcn-ui](https://github.com/birobirobiro/awesome-shadcn-ui)
- [Flowbite](https://flowbite.com/docs/getting-started/react/)
- [Stepperize](https://stepperize.vercel.app/)

# Local Setup

1) Install the Firebase CLI via npm by running the following command:
    ```
    npm install -g firebase-tools
    ```
2) Install npm dependencies by running the following command:
    ```
    npm install --force
    ```
3) Check if Java is installed or intall JDK 11 or higher
    ```
    java -version
    ```
4) Start emulator using the following command
    ```
    npm run emulators:start
    ```
5) Start application using the following command
    ```
    npm run dev
    ```

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# Types of components,
- UI Component
- Feature Component
- Page Component
- Compound Component
- Higher Order Component (HOC)
- Wrapper Component
- Container/Presentational Component

# cURL Commands,

## Approve New User
```
curl --request GET \
  --url 'http://127.0.0.1:5001/dinero-62808/us-central1/user/approve?uid=Rl2EhgWopS2K9cHjdJ3SJP1PxBtK' \
  --header 'Authorization: Bearer eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJuYW1lIjoiQ2hpY2tlbiBHcmFzcyIsInBpY3R1cmUiOiIiLCJhcHByb3ZlZCI6dHJ1ZSwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJjaGlja2VuLmdyYXNzLjMyN0BleGFtcGxlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdXRoX3RpbWUiOjE3MjMzODUxMjIsInVzZXJfaWQiOiJSbDJFaGdXb3BTMks5Y0hqZEozU0pQMVB4QnRLIiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJjaGlja2VuLmdyYXNzLjMyN0BleGFtcGxlLmNvbSJdLCJnb29nbGUuY29tIjpbIjI4NzE3NDMyMjA2NzI0NTkwOTY1MjEwNjIzNzE4NDc0ODM0MDY5NTciXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn0sImlhdCI6MTcyMzM4NTEyNywiZXhwIjoxNzIzMzg4NzI3LCJhdWQiOiJkaW5lcm8tNjI4MDgiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZGluZXJvLTYyODA4Iiwic3ViIjoiUmwyRWhnV29wUzJLOWNIamRKM1NKUDFQeEJ0SyJ9.'
```

## List Users
```
curl --request GET \
  --url http://127.0.0.1:5001/dinero-62808/us-central1/user \
  --header 'Authorization: Bearer eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJuYW1lIjoiQ2hpY2tlbiBHcmFzcyIsInBpY3R1cmUiOiIiLCJhcHByb3ZlZCI6dHJ1ZSwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJjaGlja2VuLmdyYXNzLjMyN0BleGFtcGxlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdXRoX3RpbWUiOjE3MjMzODUxMjIsInVzZXJfaWQiOiJSbDJFaGdXb3BTMks5Y0hqZEozU0pQMVB4QnRLIiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJjaGlja2VuLmdyYXNzLjMyN0BleGFtcGxlLmNvbSJdLCJnb29nbGUuY29tIjpbIjI4NzE3NDMyMjA2NzI0NTkwOTY1MjEwNjIzNzE4NDc0ODM0MDY5NTciXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn0sImlhdCI6MTcyMzM4NTEyNywiZXhwIjoxNzIzMzg4NzI3LCJhdWQiOiJkaW5lcm8tNjI4MDgiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZGluZXJvLTYyODA4Iiwic3ViIjoiUmwyRWhnV29wUzJLOWNIamRKM1NKUDFQeEJ0SyJ9.'
```