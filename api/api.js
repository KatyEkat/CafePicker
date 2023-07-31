import {instance} from './axios'

export function getCafes() {
    return instance.get(`test/site/get-index`);
}

