import { createPlausibleTracker } from '@barbapapazes/plausible-tracker'
import { defaultFileTypes, useAutoFileDownloadsTracking, useAutoOutboundTracking, useAutoPageviews } from '@barbapapazes/plausible-tracker/extensions'

const plausible = createPlausibleTracker()

const { install: installAutoPageviews, cleanup: cleanupAutoPageViews } = useAutoPageviews(plausible)
const { install: installAutoOutboundTracking, cleanup: cleanupAutoOutboundTracking } = useAutoOutboundTracking(plausible)
const { install: installAutoFileDownloadsTracking, cleanup: cleanupAutoFileDownloadsTracking } = useAutoFileDownloadsTracking(plausible, { fileTypes: ['svg', ...defaultFileTypes] })

installAutoPageviews()
installAutoOutboundTracking()
installAutoFileDownloadsTracking()

document.getElementById('btn')?.addEventListener('click', () => {
  plausible.trackEvent('click', { props: { btn: 'btn' } })
})

document.getElementById('ecommerce')?.addEventListener('click', () => {
  plausible.trackEvent('Purchase', { revenue: { currency: 'USD', amount: '10.29' } })
})

// Use this to test the auto pageview tracking
document.getElementById('navigation')?.addEventListener('click', () => {
  const url = new URL(location.href)
  url.pathname = '/page2'
  window.history.pushState({}, '', url)
})

// Cleanup the event listeners
document.getElementById('cleanup')?.addEventListener('click', () => {
  cleanupAutoPageViews()
  cleanupAutoOutboundTracking()
  cleanupAutoFileDownloadsTracking()
})
