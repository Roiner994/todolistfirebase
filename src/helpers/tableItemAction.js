import React from 'react';
import {ButtonToolbar, Button} from 'reactstrap';

export const tableItemAction = (urlPath, showModal) => (
        {
            dataField: 'dfAction',
            isDummyField: true,
            text: '',
            formatter: (cellContent, row) => {
                return (<ButtonToolbar>
                    <Button href={`${urlPath}${row.id}/edit`} color="warning">Editar</Button>
                    &nbsp;
                    <Button color="danger" onClick={(e) => showModal(e, row.id)}>Eliminar</Button>
                    </ButtonToolbar>)
            }
        }
);