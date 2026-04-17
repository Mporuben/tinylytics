<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const uuid = ref('')
const pageLoadTime = Date.now()
const trackingPixel = ref(null)  // Reference to the tracking pixel image
const PROJECT_ID = 'tlfab'       // Hardcoded project identifier

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

// Core tracking function - sends data to backend by changing image src
const track = (event, extra = {}) => {
  if (!uuid.value) return
  const params = new URLSearchParams({
    pid: PROJECT_ID,                    // project identifier
    e: event,                           // "page_view", "click", "contact_click", "form_submit", "leave"
    p: window.location.pathname,        // current page path e.g. "/about", "/contact"
    u: uuid.value,                      // unique visitor ID (persistent in localStorage)
    t: Date.now().toString(),           // when the event happened (milliseconds)
    d: getDeviceType(),                 // "mobile" or "desktop"
    r: getReferrer(),                   // where the visitor came from (previous URL)
    ...extra                            // additional params: ct (contact_type), f (form_id), dur (duration)
  })
  // Set image src to trigger the tracking request
  if (trackingPixel.value) {
    trackingPixel.value.src = `http://brrrrm.i-shipped.it/tlfab/logo.jpg?${params.toString()}`
  }
}

const handleClick = (domEvent) => {
  const target = domEvent.target.closest('a')

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

  // Skip generic click if clicking form elements (form_submit will handle it)
  if (domEvent.target.closest('form')) {
    return
  }

  console.log('handleClick')
  track('click')
}

const handleFormSubmit = (domEvent) => {
  const form = domEvent.target
  const formId = form.id || form.name || 'unknown'
  console.log('handleFormSubmit', formId)
  track('form_submit', { f: formId })
}

const handlePageView = () => {
  console.log('handlePageView')
  track('page_view')
}

const handlePageLeave = () => {
  const duration = Math.round((Date.now() - pageLoadTime) / 1000)
  console.log('handlePageLeave', duration + 's')

  const params = new URLSearchParams({
    pid: PROJECT_ID,                      // project identifier
    e: 'leave',                           // event type
    p: window.location.pathname,          // current page path
    u: uuid.value,                        // unique visitor ID
    t: Date.now().toString(),             // timestamp
    dur: duration.toString()              // time spent on page (seconds)
  })
  // sendBeacon is designed for page unload - guaranteed to complete even after page closes
  navigator.sendBeacon(`http://brrrrm.i-shipped.it/tlfab/logo.jpg?${params.toString()}`)
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
  <!-- Hidden tracking pixel - src is changed to send tracking data -->
  <img ref="trackingPixel" style="display: none" width="1" height="1" alt="" />
</template>
