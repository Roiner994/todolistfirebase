import React from 'react';
import { NOT_IMAGE } from "../constants";
import { urlServer } from './../api/urls'

export const tableImage = (pathPublic) => (
    {
        dataField: 'dfImage',
        isDummyField: true,
        text: 'Producto',
        formatter: (cellContent, row) => {
            const pathImage = row.image ? 
                        `${urlServer}${pathPublic.path}${row.image}` : 
                        `${urlServer}${NOT_IMAGE}`
            return (<div>
                        <img src={pathImage} alt="Productos" width="80px" className="rounded"/>
                    </div>)
        }
    }
);