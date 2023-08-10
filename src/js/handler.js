// export function filterBy(contacts, filterCallback) {
//   return contacts.filter(filterCallback);
// }
export default function findMatch(el, text) {
  const clean = text.trim().toLowerCase();
  return el.toLowerCase().includes(clean);
}
