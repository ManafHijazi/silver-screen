export function duplicateEmailRole(item, itemList, itemsValue) {
  if (item.data.specialKey !== 'Email') return true;
  if (!item.data.duplicateValidation) return true;

  const currentIndex = itemList.indexOf(itemList.find((f) => f.field.id === item.field.id));

  const mobiles = itemList.filter((f) => f.data.specialKey === 'Email' && f.data.duplicateValidation);

  let state = true;
  mobiles.map((value) => {
    const eIndex = itemList.indexOf(itemList.find((f) => f.field.id === value.field.id));
    if (currentIndex === eIndex) {
    } else if (!state) {
    } else if (
      itemsValue[currentIndex] &&
      itemsValue[currentIndex].email &&
      itemsValue[eIndex] &&
      itemsValue[eIndex].email &&
      [currentIndex] === itemsValue[eIndex]
    )
      state = false;

    return state;
  });

  return state;
}
