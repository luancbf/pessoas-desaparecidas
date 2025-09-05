// Formata data ISO para DD/MM/AAAA
export function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("pt-BR");
}

// Formata telefone para (99) 99999-9999
export function formatPhone(phone?: string) {
  if (!phone) return "";
  return phone.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
}