import React from 'react';
import {Spinner} from 'reactstrap';
import TableList from './TableList';
import PropTypes from 'prop-types';

const renderTable = (listObject, urlPath, attributes,tableHeader, isActions, showModal, childrens) => (
    listObject.length > 0 ?    
    <div>
        <TableList 
            listObject={listObject} 
            urlPath={urlPath} 
            attributes={attributes} 
            tableHeader={tableHeader}
            isActions={isActions}
            showModal={showModal}
            childrens={childrens}
            >
        </TableList>
    </div>
    : <Spinner animation="border" color="primary" />
);

const TableComponent = ({listObject, urlPath, attributes, tableHeader , isActions, showModal, childrens }) => {
    return (
        <div>
            {renderTable(listObject,urlPath,attributes,tableHeader,isActions, showModal, childrens)}
        </div>
    );
};

TableComponent.propTypes = {
    listObject:PropTypes.array.isRequired,
    attributes:PropTypes.array.isRequired,
    tableHeader:PropTypes.array.isRequired,
    urlPath:PropTypes.string.isRequired,
};

export default TableComponent;