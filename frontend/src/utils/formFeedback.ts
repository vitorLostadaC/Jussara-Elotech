const requiredMessage = "Campo obrigatório"
const invalidMessage = "Campo inválido"

const getRuleMinLenght = (minLenght: number) => ({
  value: minLenght,
  message: `Mínimo de ${minLenght} caracter${minLenght !== 1 && "es"}`
})
const getRuleMaxLenght = (maxLength: number) => ({
  value: maxLength,
  message: `Máximo de ${maxLength} caracteres"}`
})

export const formFeedback = {
  general: {
    required: requiredMessage,
    invalid: invalidMessage,
    maxLength: getRuleMaxLenght,
    minLength: getRuleMinLenght
  }
}
