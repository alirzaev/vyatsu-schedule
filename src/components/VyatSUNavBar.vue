<template>
    <b-navbar toggleable="md" variant="light" class="vsu-navbar-shadow" fixed="top">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
                <b-nav-item to="/schedule">Расписание</b-nav-item>
                <b-nav-item to="/calls">Звонки</b-nav-item>
                <b-nav-item to="/bots">Чат-боты</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
        <b-navbar-brand class="ml-auto">{{ title }}</b-navbar-brand>
    </b-navbar>
</template>

<script>
export default {
    name: 'vyatsunavbar',
    computed: {
        title: function () {
            return this.$store.state.navbarTitle;
        }
    }
};
</script>

<style scoped>
    .vsu-navbar-shadow {
        box-shadow: 0 2px 2px 0 #cccccc;
    }
</style>