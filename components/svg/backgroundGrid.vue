<template>
  <svg
    ref="svgRef"
    :width="size.width"
    :height="size.height"
    :viewBox="`0 0 ${size.width} ${size.height}`"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient :id="gradientId" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="white" stop-opacity="1" />
        <stop offset="80%" stop-color="white" stop-opacity="0" />
      </radialGradient>
      <mask :id="maskId">
        <rect :width="size.width" :height="size.height" :fill="`url(#${gradientId})`" />
      </mask>
    </defs>

    <g :stroke="lineColor" :stroke-width="lineWidth" :mask="`url(#${maskId})`">
      <path
        v-for="x in verticalLines"
        :key="`v-${x}`"
        :d="getVerticalPath(x)"
        fill="none"
      />
      <path
        v-for="y in horizontalLines"
        :key="`h-${y}`"
        :d="getHorizontalPath(y)"
        fill="none"
      />
    </g>
  </svg>
</template>

<script setup tang="ts">
// === Константы ===
const SPACING = 25
const STEP = 10
const DISTORTION_RADIUS = 150
const DISTORTION_STRENGTH = 5

const props = defineProps({
  gradientId: { type: String, default: 'radialGain' },
  maskId: { type: String, default: 'gainMask' },
  lineColor: { type: String, default: 'var(--text-color-1)' },
  lineWidth: { type: Number, default: 0.5 }
})

const svgRef = ref() 
const parent = ref(null)
const size = reactive({ width: 0, height: 0 })
const cursor = reactive({ x: size.width / 2, y: size.height / 2 })

// === ResizeObserver для адаптивности ===
let observer = null
onMounted(() => {
  parent.value = svgRef.value.parentElement
  console.log(svgRef.value.parent)
  observer = new ResizeObserver(([entry]) => {
    size.width = entry.contentRect.width
    size.height = entry.contentRect.height
  })
  if (parent.value) observer.observe(parent.value)
  window.addEventListener('mousemove', updateCursor)

  const rect = parent.value.getBoundingClientRect()
  size.width = rect.width
  size.height = rect.height
})

onUnmounted(() => {
  observer?.disconnect()
  window.removeEventListener('mousemove', updateCursor)
})

// === Генерация линий ===
const verticalLines = computed(() => {
  const lines = []
  for (let x = 0; x <= size.width; x += SPACING) lines.push(x)
  return lines
})

const horizontalLines = computed(() => {
  const lines = []
  for (let y = 0; y <= size.height; y += SPACING) lines.push(y)
  return lines
})

// === Искажение ===
function getDistortion(x, y) {
  const dx = x - cursor.x
  const dy = y - cursor.y
  const dist = Math.sqrt(dx * dx + dy * dy)
  if (dist > DISTORTION_RADIUS || dist === 0) return { dx: 0, dy: 0 }

  // Нормализованная синусоида: максимум на R/2
  const angle = (Math.PI * dist) / DISTORTION_RADIUS
  const force = DISTORTION_STRENGTH * Math.sin(angle)

  return {
    dx: dx / dist * force,
    dy: dy / dist * force
  }
}

function getVerticalPath(x) {
  let d = ''
  for (let y = 0; y <= size.height; y += STEP) {
    const { dx } = getDistortion(x, y)
    d += y === 0 ? `M ${x + dx},${y}` : ` L ${x + dx},${y}`
  }
  return d
}

function getHorizontalPath(y) {
  let d = ''
  for (let x = 0; x <= size.width; x += STEP) {
    const { dy } = getDistortion(x, y)
    d += x === 0 ? `M ${x},${y + dy}` : ` L ${x},${y + dy}`
  }
  return d
}

function updateCursor(e) {
  const rect = svgRef.value.getBoundingClientRect()
  cursor.x = e.clientX - rect.left
  cursor.y = e.clientY - rect.top
}
</script>
