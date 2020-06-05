import React from "react";
import {Provider} from 'react-redux';
import Layout from "../components/Layout";
import Posts from './Posts';
import store from "../store";

export default function () {
  return (
    <Provider store={store}>
      <Layout>
        <Posts/>
      </Layout>
    </Provider>
  )
}