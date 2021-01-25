<template>
  <div>
    <div class="list bg-gray-300 rounded-sm p-2 mr-2 list">
      <div class="flex justify-between">
        <div class="text-gray-800 pl-2 pb-2 font-bold">
          {{ list.title }}
        </div>
      </div>
        <Card 
          v-for="card in list.cards" 
          :key="card.id" 
          :card="card" 
          @deleted="$emit('card-deleted', {...$event, listId: list.id})" 
          @updated="$emit('card-updated', {...$event, listId: list.id})">
        </Card>    

        <CardAddEditor 
          v-if="editing" 
          @closeEditor="editing=false" 
          :list="list" 
          @added="$emit('card-added', {...$event, listId: list.id})">
        </CardAddEditor>
        
        <CardAddButton v-if="!editing && canAddCard" @openEditor="editing=true"></CardAddButton>
      </div> 
  </div>
</template>
<script>
  import Card from './components/Card';
  import CardAddButton from './components/CardAddButton';
  import CardEditor from './cardEditor';
  import CardAddEditor from './components/CardAddEditor';
  import { mapState } from 'vuex';

export default {
  components: {Card, CardAddButton, CardAddEditor},
  props: {
    list: Object
  },
  data() {
    return {
      editing: false
    }
  },
  computed: mapState ({
    canAddCard(state) {
      return this.list.board.owner.id == state.user.id;
    }
  })
}
</script>
<style scoped>
  .list {
    width: 250px;
    min-width: 250px
  }
</style>