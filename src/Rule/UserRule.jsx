import { OrganizationUserSearch } from '../Services';

let oldvalue = '';
let timer = null;
export const UserRule = async (item, value, setRerender) => {
  if (!item.data.searchKey) return;
  if (item.data.searchKey !== 'User') return;
  if (item.value === '') return;
  if (value === '') return;
  if (timer !== null) clearTimeout(timer);
  if (oldvalue === value) return;
  oldvalue = value;

  const filter = {
    pageSize: 25,
    pageIndex: 1,
    name: value,
    userName: null,
    phoneNumber: null,
    email: null,
  };
  timer = setTimeout(async () => {
    const rs = await OrganizationUserSearch({ ...filter });

    item.data.enum = [];
    if (!rs || !rs.result) return;
    rs.result.map((element) => {
      item.data.enum.push({
        id: element.id,
        name: element.fullName,
        phone: element.phoneNumber,
        email: element.email,
        userName: element.userName,
      });
    });
    if (
      item.data.valueToEdit &&
      item.data.valueToEdit.id &&
      item.data.enum.findIndex(
        (element) => element.id === item.data.valueToEdit && item.data.valueToEdit.id
      ) === -1
    )
      item.data.enum.push(item.data.valueToEdit && item.data.valueToEdit);

    setRerender(Math.random());
  }, 500);
};
export const UserDefaultRule = async (item, setRerender) => {
  if (item.data.searchKey !== 'User') return;
  if (item.data.enum) return;

  const filter = {
    pageSize: 25,
    pageIndex: 0,
    name: null,
    userName: null,
    phoneNumber: null,
    email: null,
  };

  const rs = await OrganizationUserSearch({ ...filter });

  item.data.enum = [];
  if (!rs || !rs.result) return;
  rs.result.map((value) => {
    item.data.enum.push({
      id: value.id,
      name: value.fullName,
      phone: value.phoneNumber,
      email: value.email,
      userName: value.userName,
    });
  });

  setRerender(Math.random());
};
