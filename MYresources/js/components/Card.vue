<template>
  <div>    
    <div 
    v-if="!editing"
    class="shadow-card bg-white rounded-sm p-2 cursor-pointer text-sm hover:bg-gray-100 mb-2 flex justify-between">
      <div>{{ card.title }}</div>
      <div 
        v-if="card.owner.id == userId"
        class="flex font-bold opacity-100 group-hover:opacity-100 transition-opacity ease-out duration-500"
      >
        <div class="text-gray-400 pr-2 hover:text-yellow-700" @click="editing=true">E</div>
        <div class="text-gray-400 hover:text-red-700" @click="cardDelete">D</div>
      </div>
    </div>
    <CardEditor 
      v-else 
      v-model="title" 
      class="mb-2" 
      label="Save Card" 
      @closeEditor="editing=false" 
      @saved="cardUpdate">
    </CardEditor>
  </div>
</template>

<script>
import CardDelete from '../graphql/CardDelete.gql';
import { EVENT_CARD_DELETED, EVENT_CARD_UPDATED } from '../constants';
import CardEditor from '../CardEditor';
import cardUpdate from '../graphql/CardUpdate.gql';
import { mapState } from 'vuex';  // use as computed to get current user


export default {
  components: { CardEditor },
  props: {
    card: Object
  },
  data() {
    return {
      editing: false, // set as default
      title: this.card.title
    }
  },
  computed: mapState({
    userId: state => state.user.id  // when not logged in returns null
  }),
  methods: {
    async cardDelete() {
      const self=this; // required for use in update() because it is called by Apollo
      try {
        await this.$apollo.mutate({
          mutation: CardDelete,
          variables: {
            id: this.card.id
          },
          update(store, { data: { cardDelete } }) {
            self.$emit('deleted', { 
              store, data: 
              cardDelete, 
              type: EVENT_CARD_DELETED
            });
          }
        });
      } catch (error) {}
    },
    async cardUpdate() {
      const self = this; // required for use in update() because it is called by Apollo
      try {
        await this.$apollo.mutate({
          mutation: cardUpdate,
          variables: {
            id: this.card.id,
            title: this.title          
          },
          update(store, { data: cardUpdate }) {
            self.$emit('updated', {
              store, 
              data: cardUpdate, 
              type: EVENT_CARD_UPDATED
            });
            self.editing = false;
          }
        });
      } catch(error) {}
    }    
  }
}
</script>
