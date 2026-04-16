import { createApp } from 'vue'
import App from './App.vue'

// Create #app div automatically if it doesn't exist
let appEl = document.getElementById('app')
if (!appEl) {
  appEl = document.createElement('div')
  appEl.id = 'app'
  document.body.appendChild(appEl)
}

createApp(App).mount('#app')
