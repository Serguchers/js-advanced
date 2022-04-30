Vue.component('filter-el', {
    data(){
      return {
          userSearch: ''
      }
    },
    template: `<div class="form-bg-img">
                    <form action="#" class="search-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                        <input type="text" class="search-field" v-model="userSearch" placeholder="  Search">
                        <button type="submit" class="btn-search">
                            <i class="fas fa-search"></i>
                        </button>
                    </form>
                </div>
    `
})