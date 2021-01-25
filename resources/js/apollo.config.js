import ApolloClient from 'apollo-boost';
import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { AuthError, gqlErrors } from './utils';
import store from "./vuex.config";

Vue.use(VueApollo); // initialize plugin

// configure apolloClient
const apolloClient = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  headers: {
    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
  },
  credentials: 'include',
  onError: (err) => {
    try {
      gqlErrors(err);
    } catch (err) {
      if (err instanceof AuthError) { // catching case of Unauthenticated or 419 'page expired'
        store.dispatch("logout");
      }
    }
  }
});

export default new VueApollo({  // make this instance available outside 
  defaultClient: apolloClient
});