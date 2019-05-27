import { setHeaders } from './../helpers/setHeaders';
import firebase from '../initializer/firebase';


export const apiGet = (url) => () =>
    fetch(`${url}`, {
        method: 'GET',
        headers: new Headers(setHeaders({ 'Content-type': 'application/json' }))
    }).then(v => v.json())
        .then(r => {
            if (!r.success) {
                const errors = r.data ? r.data : r;
                return Promise.reject(errors);
            }
            return r;
        });

export const apiPut = (url, id, obj) => () =>
    fetch(`${url}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(obj),
        headers: new Headers(setHeaders({ 'Content-type': 'application/json' }))
    }).then(v => v.json())
        .then(r => {
            if (!r.success) {
                const errors = r.data ? r.data : r;
                return Promise.reject(errors);
            }
            return r;
        });

export const apiPost = (url, obj) => () =>
    fetch(`${url}`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: new Headers(setHeaders({ 'Content-type': 'application/json' }))
    }).then(v => v.json())
        .then(r => {
            if (!r.success) {
                const errors = r.data ? r.data : r;
                return Promise.reject(errors);
            }
            return r;
        });

export const apiDelete = (url, id) => () =>
    fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: new Headers(setHeaders({ 'Content-type': 'application/json' }))
    }).then(v => v.json())
        .then(r => {
            if (!r.success) {
                const errors = r.data ? r.data : r;
                return Promise.reject(errors);
            }
            return r;
        });


export const apiPostFormData = (url, obj) => () =>
    fetch(`${url}`, {
        method: 'POST',
        body: obj,
        headers: new Headers(setHeaders({}))
    }).then(v => v.json())
        .then(r => {
            if (!r.success) {
                const errors = r.data ? r.data : r;
                return Promise.reject(errors);
            }
            return r;
        });

export const apiPutFormData = (url, id, obj) => () =>
    fetch(`${url}/${id}`, {
        method: 'POST',
        body: obj,
        headers: new Headers(setHeaders({}))
    }).then(v => v.json())
        .then(r => {
            if (!r.success) {
                const errors = r.data ? r.data : r;
                return Promise.reject(errors);
            }
            return r;
        });

export const authFirebase = (provider) => () =>
    firebase.auth().signInWithPopup(provider)
        .then(r => {
            const result = {
                success: true, data: {
                    auth_token: r.credential.accessToken,
                    email: r.user.email,
                    name: r.user.displayName
                }
            };
            return JSON.stringify(result);
        });

export const getFirebase = (collection) => () =>
    firebase.firestore().collection(collection).get()
        .then((result) => {
            let todos = [];
            result.forEach((doc) => {
                let post = {
                    "id": doc.id,
                    ...doc.data()
                }
                todos.push(post);
            });
            return todos;
        }).catch(err => {
            return Promise.reject(err);
        });

export const postFirebase = (collection, obj) => () =>
    firebase.firestore().collection(collection).add(obj)
        .then((result) => {
            return [];
        }).catch(err => {
            return Promise.reject(err);
        });


export const updateFirebase = (collection, id, obj) => () =>
    firebase.firestore().collection(collection).doc(id).update(obj)
        .then((result) => {
            return {}
        }).catch(err => {
            return Promise.reject(err);
        });

export const deleteFirebase = (collection, id) => () =>
    firebase.firestore().collection(collection).doc(id).delete()
        .then((result) => {
            return id;
        }).catch(err => {
            return Promise.reject(err);
        });
