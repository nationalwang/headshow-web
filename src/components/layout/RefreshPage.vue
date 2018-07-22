<template>
  <div></div>
</template>
<script>
export default {
  activated () {
    this.go()
  },
  methods: {
    go () {
      let params = this.$route.params
      if (params.path) {
        params.refresh = 'refresh'
        this.$router.push({path: params.path, query: params})
      } else {
        this.$router.push({name: params.routeName, params: {refresh: 'refresh'}})
      }
    }
  }
}
</script>
