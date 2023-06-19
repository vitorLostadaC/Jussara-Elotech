export const maskCPF = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1")
}

export const maskPhone = (phone: string) => {
  let value = phone
  value = value.replace(/\D/g, "")
  value = value.replace(/^(\d{2})(\d+)(\d{4})/g, "($1) $2-$3")
  return value
}
