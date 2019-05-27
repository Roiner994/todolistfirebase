import React from 'react';
import PropTypes from 'prop-types';
import {Spinner} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { tableItemAction } from '../../helpers/tableItemAction';

const renderTable = (listObject, urlPath, columns, data, isActions, showModal) => {
    let cols = [...columns, tableItemAction(urlPath,showModal)];
    return (listObject.length > 0 ?    
    <div>
        <BootstrapTable 
            bootstrap4 
            keyField='id' 
            data={listObject} 
            columns={cols} 
            pagination={paginationFactory()} />
    </div>
    : <Spinner animation="border" color="primary" />);
};

const TableReact = ({listObject, urlPath, columns, data, isActions, showModal}) => {
    return (
        <div>
            {renderTable(listObject, urlPath, columns, data, isActions, showModal)}
        </div>
    );
};

TableReact.propTypes = {
    listObject:PropTypes.array.isRequired,
    columns:PropTypes.array.isRequired,
    urlPath:PropTypes.string.isRequired,  
};

export default TableReact;