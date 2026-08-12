import { useEffect } from 'react'

const SITE = 'Tanzania MNCH Library'

function setTag(selector, attr, key, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function setJsonLd(obj) {
  let el = document.getElementById('ld-json')
  if (!obj) {
    if (el) el.remove()
    return
  }
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = 'ld-json'
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(obj)
}

// Per-route title + description + Open Graph/Twitter + optional JSON-LD.
export function useMeta({ title, description, jsonLd } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE}` : SITE
    document.title = fullTitle
    if (description) {
      setTag('meta[name="description"]', 'name', 'description', description)
      setTag('meta[property="og:description"]', 'property', 'og:description', description)
      setTag('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    }
    setTag('meta[property="og:title"]', 'property', 'og:title', fullTitle)
    setTag('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle)
    setTag('meta[property="og:url"]', 'property', 'og:url', window.location.href)
    setJsonLd(jsonLd)
  }, [title, description, jsonLd])
}
