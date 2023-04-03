export function formatDate(date) {
    const year = date.slice(0, 4)
    const month = date.slice(4, 6)
    const day = date.slice(6, 8)
  
    return `${year}-${month}-${day}`
}
export const formatDateTable = (dateString) => {
    const year = dateString.slice(0, 4)
    const month = dateString.slice(4, 6)
    const day = dateString.slice(6, 8)
  
    return `${day}/${month}/${year}`
}

export function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '')
    if (cleaned.length < 3) {
        // Trata entrada vazia ou com menos de 3 caracteres
        return cleaned
    } else if (cleaned.length < 7) {
        // Formata a entrada com até 6 dígitos
        return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`
    } else if (cleaned.length < 11) {
        // Formata a entrada com até 10 dígitos
        return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`
    } else {
        // Formata a entrada completa com 11 dígitos
        return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`
    }
}
  
  

export function formatDocumentNumber(documentNumber) {
    const cleaned = documentNumber.replace(/\D/g, '')
    let formatted = ''
    for (let i = 0; i < cleaned.length && i < 11; i++) {
        if (i === 0) {
            formatted += cleaned[i]
        } else if (i === 3 || i === 6) {
            formatted += `.${cleaned[i]}`
        } else if (i === 9) {
            formatted += `-${cleaned[i]}`
        } else {
            formatted += cleaned[i]
        }
    }
    return formatted
}