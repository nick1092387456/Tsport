<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
  </div>
</template>

<script>
import UserService from '../services/user.service'
export default {
  name: 'board-Admin',
  data() {
    return {
      content: '',
    }
  },
  async mounted() {
    const res = await UserService.getAdminBoard()
    try {
      this.content = res.data
    } catch (error) {
      this.content =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
    }
  },
}
</script>
