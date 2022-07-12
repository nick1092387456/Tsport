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
  name: 'board-User',
  data() {
    return {
      content: '',
    }
  },
  async mounted() {
    const res = await UserService.getUserBoard()
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
