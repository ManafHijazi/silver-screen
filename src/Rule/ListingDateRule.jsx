import moment from 'moment';

export const ListingDateRule = async (item, setData, itemList, id, v, values) => {
  if (id !== 'listing_expiry-period') return;
  const dateIndex = itemList.findIndex((el) => el.field.id === item.data.hasEffectedFrom);
  const newValue = new Date(values[dateIndex]);
  const expiryDate = moment(new Date(newValue.setDate(newValue.getDate() + +v.lookupItemCode)));
  const newItemIndex = itemList.findIndex((el) => el.field.id === item.data.hasEffectOn);
  if (newItemIndex !== -1) setData(newItemIndex, expiryDate);
};
