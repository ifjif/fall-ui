import { useStyle } from '@fall-ui/hooks';
import { computed } from 'vue'
export function useScrollBarStyle(
  props,
  thumbHeight,
  thumbTop,
  thumbWidth,
  thumbLeft,
  scrollLeft,
  scrollTop
) {
  const uStyle = useStyle()
  const width = computed(() => {
    return uStyle.width(props.width)
  })

  const height = computed(() => {
    return uStyle.height(props.height)
  })

  const thumbHeightStyle = computed(() => {
    return uStyle.height(thumbHeight.value)
  })

  const thumbTopStyle = computed(() => {
    return uStyle.top(thumbTop.value)
  })
  const thumbBottomStyle = computed(() => {
    return uStyle.bottom(-scrollTop.value)
  })

  const thumbWidthStyle = computed(() => {
    return uStyle.width(thumbWidth.value)
  })
  const thumbRightStyle = computed(() => {
    return uStyle.right(-scrollLeft.value)
  })
  const thumbLeftStyle = computed(() => {
    return uStyle.left(thumbLeft.value)
  })
  return {
    width,
    height,
    thumbHeightStyle,
    thumbTopStyle,
    thumbWidthStyle,
    thumbLeftStyle,
    thumbRightStyle,
    thumbBottomStyle
  }
}
