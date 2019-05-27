import React from 'react';
import {Button} from 'reactstrap';
import PropTypes from 'prop-types';

const CardHeaderList = ({title,urlPath}) => {
    return (
        <div>
            <i className="fa fa-align-justify"></i> Lista de {title}
            <Button color="primary" href={`${urlPath}new`} className="float-right">
                <i className="fa fa-plus"></i>
            </Button>
        </div>
    );
};

CardHeaderList.propTypes = {
    title: PropTypes.string.isRequired,
    urlPath: PropTypes.string.isRequired,
};

export default CardHeaderList;