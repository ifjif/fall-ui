export function useMenuUtils(openIndices) {

  const openIndicesUnique = () => {
    openIndices.value = [...new Set(openIndices.value)]
  }

  return {
    openIndicesUnique
  }
}
