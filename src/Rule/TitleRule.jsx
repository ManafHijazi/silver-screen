export function TitleRule(id, setData, item, itemList, value) {
  if (id === 'title') {
    const i = itemList.indexOf(
      itemList.find((f) => f.field.id.toLowerCase() === item.data.hasEffectOn.toLowerCase())
    );
    if (value.parentLookupItemId) {
      setData(
        i,
        itemList[i].data.enum.find((f) => f.lookupItemId === value.parentLookupItemId)
      );
      itemList[i].data.isReadonly = true;
    } else itemList[i].data.isReadonly = false;
  }
}
