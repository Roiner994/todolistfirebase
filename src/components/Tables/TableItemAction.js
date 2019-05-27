import React from 'react';
import PropTypes from 'prop-types';
import {ButtonToolbar, Button} from 'reactstrap';

const TableItemAction = ({urlPath, id, showModal}) => {
    return (
        <td>
            <ButtonToolbar>
            <Button href={`${urlPath}${id}/edit`} color="warning">Editar</Button>
            &nbsp;
            <Button color="danger" onClick={(e) => showModal(e,id)}>Eliminar</Button>
            </ButtonToolbar>
        </td>
    );
};

TableItemAction.propTypes = {
    id: PropTypes.number.isRequired,
    urlPath:PropTypes.string.isRequired,
};

export default TableItemAction;