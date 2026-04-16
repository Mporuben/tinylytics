<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const uuid = ref('')
const trackingSrc = ref('')
const pageLoadTime = Date.now()

const setupUUID = () => {
  let _uuid = localStorage.getItem('u')
  if (!_uuid) {
    _uuid = uuidv4()
    localStorage.setItem('u', _uuid)
  }
  uuid.value = _uuid
}

// Device type detection
const getDeviceType = () => {
  const ua = navigator.userAgent
  if (/Mobile|Android|iPhone|iPad|iPod/i.test(ua)) {
    return 'mobile'
  }
  return 'desktop'
}

// Get referrer
const getReferrer = () => {
  return document.referrer || ''
}

const track = (event, extra = {}) => {
  if (!uuid.value) return
  const params = new URLSearchParams({
    e: event,
    p: window.location.pathname,
    u: uuid.value,
    t: Date.now().toString(),
    d: getDeviceType(),
    r: getReferrer(),
    ...extra
  })
  trackingSrc.value = `https://your-api.com/tlfab/abc.jpeg?${params.toString()}`
}

const handleClick = (e) => {
  const target = e.target.closest('a')
  
  // Check for contact clicks (tel: or mailto:)
  if (target && target.href) {
    if (target.href.startsWith('tel:')) {
      console.log('handleContactClick - phone')
      track('contact_click', { ct: 'phone' })
      return
    }
    if (target.href.startsWith('mailto:')) {
      console.log('handleContactClick - email')
      track('contact_click', { ct: 'email' })
      return
    }
  }
  
  console.log('handleClick')
  track('click')
}

const handleFormSubmit = (e) => {
  const form = e.target
  const formId = form.id || form.name || 'unknown'
  console.log('handleFormSubmit', formId)
  track('form_submit', { fid: formId })
}

const handlePageView = () => {
  console.log('handlePageView')
  track('pageview')
}

const handlePageLeave = () => {
  const duration = Math.round((Date.now() - pageLoadTime) / 1000)
  console.log('handlePageLeave', duration + 's')
  
  // Use sendBeacon for reliable tracking on page leave
  const params = new URLSearchParams({
    e: 'leave',
    p: window.location.pathname,
    u: uuid.value,
    t: Date.now().toString(),
    dur: duration.toString()
  })
  navigator.sendBeacon(`https://your-api.com/tlfab/abc.jpeg?${params.toString()}`)
}

onMounted(() => {
  setupUUID()
  handlePageView()
  document.addEventListener('click', handleClick)
  document.addEventListener('submit', handleFormSubmit)
  window.addEventListener('beforeunload', handlePageLeave)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClick)
  document.removeEventListener('submit', handleFormSubmit)
  window.removeEventListener('beforeunload', handlePageLeave)
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
