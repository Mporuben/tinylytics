<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const uuid = ref('')
const pageLoadTime = Date.now()

const setupUUID = () => {
  let visitorUUID = localStorage.getItem('tlfab_uuid')
  if (!visitorUUID) {
    visitorUUID = uuidv4()
    localStorage.setItem('tlfab_uuid', visitorUUID)
  }
  uuid.value = visitorUUID
}

// Device type detection
const getDeviceType = () => {
  const userAgent = navigator.userAgent
  if (/Mobile|Android|iPhone|iPad|iPod/i.test(userAgent)) {
    return 'mobile'
  }
  return 'desktop'
}

// Get referrer
const getReferrer = () => {
  return document.referrer || ''
}

// Core tracking function - sends data to backend via GET request
const track = async (event, extra = {}) => {
  if (!uuid.value) return
  try {
    const params = new URLSearchParams({
      event: event,                       // "pageview", "click", "contact_click", "form_submit", "leave"
      page: window.location.pathname,     // current page path e.g. "/about", "/contact"
      uuid: uuid.value,                   // unique visitor ID (persistent in localStorage)
      timestamp: Date.now().toString(),   // when the event happened (milliseconds)
      device: getDeviceType(),            // "mobile" or "desktop"
      referrer: getReferrer(),            // where the visitor came from (previous URL)
      ...extra                            // additional params: contact_type, form_id, duration
    })
    const trackingUrl = `https://brrrrm.i-shipped.it/tlfab/logo.jpg?${params.toString()}`
    
    // mode: 'no-cors' allows cross-origin requests without CORS errors
    await fetch(trackingUrl, { mode: 'no-cors' })
  } catch (error) {
    // Fail silently - tracking should never break the site
    console.error('Tracking failed:', error)
  }
}

const handleClick = (domEvent) => {
  const target = domEvent.target.closest('a')
  
  // Check for contact clicks (tel: or mailto:)
  if (target && target.href) {
    if (target.href.startsWith('tel:')) {
      console.log('handleContactClick - phone')
      track('contact_click', { contact_type: 'phone' })
      return
    }
    if (target.href.startsWith('mailto:')) {
      console.log('handleContactClick - email')
      track('contact_click', { contact_type: 'email' })
      return
    }
  }
  
  console.log('handleClick')
  track('click')
}

const handleFormSubmit = (domEvent) => {
  const form = domEvent.target
  const formId = form.id || form.name || 'unknown'
  console.log('handleFormSubmit', formId)
  track('form_submit', { form_id: formId })
}

const handlePageView = () => {
  console.log('handlePageView')
  track('pageview')
}

const handlePageLeave = () => {
  const duration = Math.round((Date.now() - pageLoadTime) / 1000)
  console.log('handlePageLeave', duration + 's')
  
  // Use fetch with keepalive for reliable GET tracking on page leave
  const params = new URLSearchParams({
    event: 'leave',
    page: window.location.pathname,
    uuid: uuid.value,
    timestamp: Date.now().toString(),
    duration: duration.toString()
  })
  fetch(`https://brrrrm.i-shipped.it/tlfab/logo.jpg?${params.toString()}`, { 
    mode: 'no-cors',
    keepalive: true 
  })
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
  <div style="display: none"></div>
</template>
