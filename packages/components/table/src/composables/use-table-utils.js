export function useTableUtils(props) {

  const getColByProp = (prop) => props.columns.find(c => c.prop === prop)

  return {
    getColByProp
  }
}
