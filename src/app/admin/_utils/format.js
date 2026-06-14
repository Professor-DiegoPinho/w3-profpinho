/**
 * Formata um timestamp (Firestore Timestamp, ISO String, Date, ou milissegundos) em data e hora amigável
 */
export function formatDate(timestamp) {
  if (!timestamp) return "—";
  
  let date;
  if (typeof timestamp === "string") {
    date = new Date(timestamp);
  } else if (typeof timestamp?.toDate === "function") {
    date = timestamp.toDate();
  } else if (typeof timestamp === "number") {
    date = new Date(timestamp);
  } else if (timestamp instanceof Date) {
    date = timestamp;
  } else {
    return "—";
  }

  if (isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Retorna o número ordinal em português (ex: 1 -> 1ª)
 */
export function formatOrdinal(num) {
  return `${num}ª`;
}

/**
 * Converte um timestamp do Firestore para uma String ISO de data
 */
export function convertTimestamp(value) {
  if (!value) return null;

  if (typeof value?.toDate === "function") {
    return value.toDate().toISOString();
  }

  const date = value instanceof Date ? value : new Date(value);
  return isNaN(date.getTime()) ? null : date.toISOString();
}
