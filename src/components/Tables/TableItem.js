import React from 'react';
import TableItemAction from './TableItemAction';
import PropTypes from 'prop-types';
import TableChildrens from './TableChildrens';

const renderChildrens = (childrens,object) =>{
    let jsx = [];
    Object.keys(childrens).forEach(key => {
        jsx = [...jsx, 
                <TableChildrens 
                    key={`key_children_${object.id}`} 
                    childrens_attributtes={childrens[key]} 
                    object={object} 
                    index={key}/>
            ];
    })
    return jsx;
}

const TableItem = ({object, attributes, urlPath, isActions, showModal, childrens}) => {
    return (
        <tr>
            {attributes.map(attribute => 
                <td key={`${attribute}_${object.id}`}>
                    {object[attribute]}
                </td>)}
            { childrens && renderChildrens(childrens,object) }
            { isActions && <TableItemAction urlPath={urlPath} id={object.id} showModal={showModal}/> }
        </tr>
    );
};

TableItem.propTypes = {
    object:PropTypes.object.isRequired,
    attributes:PropTypes.array.isRequired,
    urlPath:PropTypes.string.isRequired,
};

export default TableItem;

