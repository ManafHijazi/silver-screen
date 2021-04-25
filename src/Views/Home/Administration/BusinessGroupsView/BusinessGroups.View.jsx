import React, { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Spinner, NoDataFoundComponent } from '../../../../Components'; // , Inputs useRef
import AddDialog from './BusinessGroupsUtilities/BusinessGroupsDialogs/AddDialog';
import { useTitle } from '../../../../Hooks';
import TreeViewGroups from './BusinessGroupsUtilities/BusinessGroupsTreeView/BusinessGroupsTreeView';
import BusinessGroups from '../../../../StaticJOSN/businessGroups.json';

const ViewGroups = () => {
  const { t } = useTranslation(['BusinessGroupsView', 'Shared']);
  const [loading, setLoading] = React.useState(false);
  const [editGroup, setEditGroup] = React.useState(false);
  const [groupName, setGroupName] = React.useState('');
  const [groupId, setGroupId] = React.useState('');
  const [groupParent, setGroupParent] = React.useState('');
  const [groupParentId, setGroupParentId] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [response, setResponse] = React.useState({});
  const [searchNode] = React.useState([]);
  const [searchedItem] = React.useState('');
  const [treeGroup, setTreeGroup] = React.useState(false); // , setSearchedItem] , setSearchNode
  // const [
  //   treeSearch, // setTreeSearch
  // ] = React.useState(true);
  const [openAddDialog, setopenAddDialog] = React.useState(false);
  // const searchTimer = useRef(null);
  useTitle(t('Shared:SideMenuView.Administration.BusinessGroups'));

  const GetMyGroups = useCallback(async (pageIndex, PageSize) => {
    setLoading(true);
    // const res = await GetBusinessGroups(pageIndex, PageSize, '');
    setResponse(BusinessGroups);
    setLoading(false);
    if (BusinessGroups && BusinessGroups.totalCount === 0) setLoading(false);
  }, []);

  useEffect(() => {
    GetMyGroups(1, 150);
  }, [GetMyGroups]);

  const handleSentData = (name, parent, id, edit, parentId) => {
    setGroupName(name);
    setGroupParent(parent);
    setGroupId(id);
    setEditGroup(edit);
    setGroupParentId(parentId);
  };
  // const handleGroupsSearch = (e) => {
  //   // eslint-disable-next-line no-unused-expressions
  //   response &&
  //     response.result &&
  //     searchNode &&
  //     setSearchNode(
  //       response.result.filter((el) =>
  //         el.businessGroupsName.toUpperCase().includes(e.target.value.toUpperCase()))
  //     );
  //   setSearchedItem(e.target.value);
  //   if (e.target.value === '') setSearchNode([]);
  // };
  // const handleAddGroup = () => {
  //   setopenAddDialog(true);
  //   setTreeGroup(!treeGroup);
  //   setGroupParent('');
  //   setGroupId('');
  //   setGroupName('');
  //   setGroupParentId('');
  // };

  // const searchHandler = () => {
  //   if (searchTimer.current) clearTimeout(searchTimer.current);
  //   searchTimer.current = setTimeout(() => {
  //     if (!treeSearch) {
  //       setResponse();
  //       GetMyGroups(page + 1, rowsPerPage, searchedItem);
  //     }
  //   }, 700);
  // };

  return (
    <div>
      <div className='view-wrapper'>
        <Spinner isActive={loading} />
        <div className='header-section'>
          <div className='filter-section px-2'>
            <div className='section'>
              {/* <Button className='btns theme-solid bg-primary' onClick={handleAddGroup}>
                <span className='mdi mdi-plus' />
                {t('AddGroup')}
              </Button> */}
            </div>
            {/* <div className='section px-2'>
              <Inputs
                idRef='usersSearchRef'
                variant='outlined'
                value={searchedItem}
                onInputChanged={handleGroupsSearch}
                fieldClasses='inputs theme-solid'
                label={t('SearchGroup')}
                beforeIconClasses='mdi mdi-magnify mdi-24px c-gray-primary'
                onKeyUp={searchHandler}
              />
            </div> */}
          </div>
        </div>
        <NoDataFoundComponent />
        <div className='bussines-groups-wrapper'>
          <TreeViewGroups
            searchNode={searchNode}
            page={page}
            setPage={(x) => setPage(x)}
            rowsPerPage={rowsPerPage}
            searchedItem={searchedItem}
            setRowsPerPage={(x) => setRowsPerPage(x)}
            handleSentData={handleSentData}
            setopenAddDialog={() => setopenAddDialog(true)}
            response={response}
            setTreeGroup={(x) => setTreeGroup(x)}
            reloadData={() => GetMyGroups(1, 50, searchedItem)}
          />
        </div>
        <AddDialog
          setGroupId={(x) => setGroupId(x)}
          setGroupParentId={(x) => setGroupParentId(x)}
          groupParentId={groupParentId}
          groupId={groupId}
          response={response}
          setGroupName={(x) => setGroupName(x)}
          setGroupParent={(x) => setGroupParent(x)}
          groupName={groupName}
          groupParent={groupParent}
          isEdit={editGroup}
          setIsEdit={(x) => setEditGroup(x)}
          isTree={treeGroup}
          setTreeGroup={(x) => setTreeGroup(x)}
          open={openAddDialog}
          close={() => setopenAddDialog(false)}
          treeReload={() => GetMyGroups(1, 50, searchedItem)}
          reloadData={() => GetMyGroups(page + 1, rowsPerPage, searchedItem)}
        />
      </div>
      <div> </div>
    </div>
  );
};

export default ViewGroups;
