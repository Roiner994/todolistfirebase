import React from 'react';

const TableChildrens = ({childrens_attributtes, object, index}) => {
    let jsx = []
    childrens_attributtes.forEach(attribute => {
        let td = <td key={`${index}_${attribute}_${object.id}`}>{object[index][attribute]}</td>;
        jsx = [...jsx,td];
    });
    return jsx;
};

export default TableChildrens;