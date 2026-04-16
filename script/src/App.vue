<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const uuid = ref('')
const trackingSrc = ref('')

const setupUUID = () => {
  let _uuid = localStorage.getItem('u')
  if (!_uuid) {
    _uuid = uuidv4()
    localStorage.setItem('u', _uuid)
  }
  uuid.value = _uuid
}

const track = (event) => {
  if (!uuid.value) return
  trackingSrc.value = `https://your-api.com/tlfab/abc.jpeg?e=${event}&p=${encodeURIComponent(window.location.pathname)}&u=${uuid.value}&t=${Date.now()}`
}

const handleClick = () => {
  console.log('handleClick')
  track('click')
}

const handlePageView = () => {
  console.log('handlePageView')
  track('pageview')
}

onMounted(() => {
  setupUUID()
  handlePageView()
  document.addEventListener('click', handleClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClick)
})
</script>

<template>
  <img
    v-if="trackingSrc"
    referrerpolicy="unsafe-url"
    style="display: none"
    :src="trackingSrc"
  />
</template>
