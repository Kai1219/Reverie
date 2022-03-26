<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: pages.current_page === 1 }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="emitPage(pages.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="(page, i) in pages.total_pages"
        :key="i"
        :class="{ active: page === pages.current_page }"
      >
        <span v-if="page === pages.current_page" class="page-link">{{page}}</span>
        <a v-else class="page-link" href="#" @click.prevent="emitPage(page)">{{
          page
        }}</a>
      </li>
      <li
        class="page-item"
        :class="{ disabled: pages.current_page === pages.total_pages }"
      >
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="emitPage(pages.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pages'],
  data () {
    return {}
  },
  methods: {
    emitPage (page) {
      this.$emit('emit-pages', page)
    }
  }
}
</script>
