<template>
  <CardEditor v-model="title" @closeEditor="closed" @saved="addCard" label="Add Card"></CardEditor>
</template>

<script>
import CardAdd from '../graphql/CardAdd.gql';
import BoardQuery from '../graphql/BoardWithListsAndCards.gql';
import { EVENT_CARD_ADDED } from '../constants';
import CardEditor from '../CardEditor'; 
import { mapState } from 'vuex';

export default {
  components: { CardEditor },
  props: {
    list: Object,
  },
  data() {
    return {
      title: null
    }
  },
  computed: mapState({
    userId: state => state.user.id
  }),
  methods: {
    async addCard() {
      const self = this;  // since update() is called internally and not by me, 'this' will not have a reference to my 'this'
      try {
        await this.$apollo.mutate({
          mutation: CardAdd,
          variables: {
            title: this.title,
            listId: this.list.id,
            order: this.list.cards.length + 1,
            ownerId: this.userId
          },
          update(store, { data: { cardAdd } }) {
            self.$emit('added', { 
              store, 
              data: cardAdd, 
              type: EVENT_CARD_ADDED });
            self.closed();
          }
        });
      } catch(error) {}
    },
    closed() {
      this.$emit("closeEditor");
    }
  }
}
</script>