export function VisaRule(id, item, itemList, value) {
  if (id === 'visa_issue_date') {
    const i = itemList.indexOf(
      itemList.find((f) => f.field.id.toLowerCase() === item.data.hasEffectOn.toLowerCase())
    );
    itemList[i].data.minDate = value;
  }
}
