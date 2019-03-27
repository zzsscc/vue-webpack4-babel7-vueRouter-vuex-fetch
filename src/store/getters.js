export default {
  fullName: state => surname => `${surname}${state.name}`,
  dataNum: state => state.data.c.filter(d => isNumber(d))
}