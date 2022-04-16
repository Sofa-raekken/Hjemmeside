<template>
  <div>
    <nav
      class="navbar has-background-dark is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <HeaderBarBrand />
      <HeaderBarLinks />
    </nav>
  </div>
</template>

<script>
import HeaderBarBrand from '@/components/HeaderBarBrand'
import HeaderBarLinks from '@/components/HeaderBarLink'

export default {
  name: 'HeaderBar',
  components: { HeaderBarBrand, HeaderBarLinks }
}
</script>
