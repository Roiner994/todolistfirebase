import Noty from 'noty';

export const notification = (type, text) =>(
    new Noty({
        type,
        text,
        theme: 'bootstrap-v4',
        timeout: 3000,
    })
);


