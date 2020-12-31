export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'dr-barai-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
      },
    ],
  },
  loading: {
    color: '#3b82f6',
    height: '3px',
    continuous: true,
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/nuxt-client-init.js', ssr: false },
    { src: '~/plugins/toast.js', ssr: false },
    { src: '~/plugins/vue-search-select.js', ssr: false },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/apollo',
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
  ],
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'http://localhost:1337/graphql',
        tokenName: 'jwt',
      },
    },
  },
  styleResources: {
    // your settings here
    scss: ['~assets/global.scss'],
  },
  router: {
    // middleware: ['auth'],
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: 'http://localhost:1337',
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
