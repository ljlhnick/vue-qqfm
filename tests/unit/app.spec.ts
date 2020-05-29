import {shallowMount} from '@vue/test-utils';
import App from "../../src/App.vue";

describe('App', () => {
    it('test', () => {
        const wrapper = shallowMount(App);
        expect(wrapper.find('.header .text-center').text()).toEqual('企鹅fm仿写');
    })
})