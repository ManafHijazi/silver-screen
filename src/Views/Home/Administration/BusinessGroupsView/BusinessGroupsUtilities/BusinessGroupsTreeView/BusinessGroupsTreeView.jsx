/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import { ButtonBase } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { InnerHeaderComponent } from '../../../../../../Components';
import Genealogy from './Genealogy';

const TreeViewGroups = (props) => {
  const [activeSideButton, setActiveSideButton] = useState(1);
  const [sideList] = useState([
    {
      key: 1,
      value: 'Attendance Check In/Out',
    },
    {
      key: 2,
      value: 'My Attendance',
    },
    {
      key: 3,
      value: 'Employee Attendance',
    },
  ]);

  const activeSideButtonChange = useCallback((value) => {
    setActiveSideButton(value);
  }, []);

  return (
    <div className='businessGroupsTreeView'>
      <InnerHeaderComponent
        component={(
          <>
            {sideList.map((item) => (
              <ButtonBase
                className={`header-side-menu-button ${
                  item.key === activeSideButton ? 'is-active' : ''
                }`}
                onClick={() => activeSideButtonChange(item.key)}
              >
                {item.value}
              </ButtonBase>
            ))}
          </>
        )}
      />
      {props.response && props.response.result && (
        <div className='treePaper'>
          <div className='genealogy-tree'>
            <ul>
              {props.response &&
                props.response.result
                  .filter((item) => item.businessGroupsParentId === null)
                  .map((node, i, index) => (
                    <Genealogy
                      index={index}
                      key={`${i + 1}-tree`}
                      Parent={node}
                      isVisible
                      isTree={props.isTree}
                      response={props.response}
                      searchNode={props.searchNode}
                      handleSentData={props.handleSentData}
                      reloadData={() => props.reloadData()}
                      setTreeGroup={(x) => props.setTreeGroup(x)}
                      setopenAddDialog={() => props.setopenAddDialog()}
                    />
                  ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreeViewGroups;
