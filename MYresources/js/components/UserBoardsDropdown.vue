<template>
  <div>
    <button class="header-btn" @click="showBoards = !showBoards" >Boards</button>
    <DropdownMenu :show="showBoards" @closed="showBoards = false">
      <div class="text-gray-600 text-xs font-semibold mb-2 ml-1">Boards</div>
      <router-link 
        :to="{name: 'board', params: {id: board.id}}"
        v-for="board in userBoards"
        :key="board.id"
        :class="[`bg-${board.color}-100`]"
        class="bg-teal-100 rounded-sm opacity-100 hover:opacity-75 text-gray-700 font-bold cursor-pointer flex mb-1"
        @click.native="showBoards = false"
      ><!--.native modifier necessary since router-link does not require @click listener for its functionality -->
        <div class="w-10 rounded-sm rounded-r-none" :class="[`bg-${board.color}-200`]"></div>
        <div class="p-2">{{ board.title }}</div>
      </router-link> 
      
      <div 
        @click="showModal=true"
        class="rounded-sm hover:bg-gray-200 p-2 underline cursor-pointer mt-4">
        Create New Board...
      </div>
      <BoardAddModal :show="showModal" @closed="showModal = false"></BoardAddModal>
    </DropdownMenu>
  </div>
</template>

<script>
  import DropdownMenu from './DropdownMenu';
  import Modal from './Modal';
  import BoardAddModal from './BoardAddModal';
  import { mapState } from 'vuex';
  import UserBoards from '../graphql/UserBoards.gql';
  import { colorMap100, colorMap200 } from '../utils';

export default {
  components: { DropdownMenu, BoardAddModal },
  apollo: {
    userBoards: {
      query: UserBoards,
      variables() {
        return {
          userId: this.userId
        }
      },
      skip() {  // run query only when condition met; return true if not executing query
        return !this.userId;  // skip query if there is no userId (not logged in)
      }
    }
  },
  data() {
    return {
      showBoards: false,
      showModal: false
    }
  },
  computed: {
    ...mapState({
      userId: state => state.user.id
    }),
    colorMap100: () => colorMap100,
    colorMap200: () => colorMap200
  }
}
</script>