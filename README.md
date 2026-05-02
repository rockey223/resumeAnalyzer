#  🚀 Next.js Starter Template

  

A modern **Next.js 15 starter template** with everything you need pre-configured.

Includes **Redux Toolkit, Redux Persist, Axios, Tailwind CSS, Theme Toggle (Dark/Light), Zod validation, Cookie management, and ClientJS** — ready to start building immediately.

  

---

  

##  ✨ Features

  

- ⚡ **Next.js 15 (App Router)** – server-first React framework

- 🗂 **Redux Toolkit** – scalable state management

- 💾 **Redux Persist** – persist Redux state in `localStorage`

- 🎨 **Dark / Light Theme Toggle** – Tailwind-powered with smooth transitions

- 🌐 **Axios Setup** – centralized HTTP client with interceptors

- 🔑 **Cookie Management** – via `js-cookie`

- 🕵️ **Client Fingerprinting** – with `clientjs`

- ✅ **Schema Validation** – via `zod`

- 🛠 **Developer Ready** – minimal setup, maximum productivity

  


    ---
  ## 📂 Folder Structure


    src/
    
    ├── app/
    │ ├── favicon.ico 
    | ├── layout.js # Root layout
    | ├── gobal.css # Root css
    | ├── page.js # Example homepage (Hero section + Theme toggle)
    ├── components/
    │ ├── ThemeToggleButton.jsx # Floating theme toggle button
    ├── lib/
    | ├──actions/
    | |	├── themeSlice.js #action to change theme
    │ ├── store.js # Redux + Persist configuration
    | ├── createWebStorage.js # creates localstorage
    ├── utils/
    | ├── axios.js # Axios setup
    | ├── GlobalProvider.jsx #provider for all the client side components
  



##  📦 Installed Dependencies

  

```json

{

"@reduxjs/toolkit":  "^2.8.2",

"axios":  "^1.11.0",

"clientjs":  "^0.2.1",

"js-cookie":  "^3.0.5",

"lucide-react":  "^0.542.0",

"next":  "15.5.2",

"react":  "19.1.0",

"react-dom":  "19.1.0",

"react-redux":  "^9.2.0",

"redux-persist":  "^6.0.0",

"zod":  "^4.1.5",

"tailwindcss":  "^3.4.0"

}

  ```
  ##  <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="30"/> Clone Template

  
    git clone https://github.com/rockey223/nextJsStarterTemplate.git
    cd nextJsStarterTemplate

## Install Dependencies

   ```
       npm install
```
#or
```
    yarn install
```
#or 

        pnp install

   
---
## Run Development Server
```
    npm run dev
```
#or
```
    yarn run dev
```
#or 
```
    pnp run dev
```


    


